import React, { useEffect, useState } from 'react';

import NewTabLink from 'components/NewTabLink/NewTabLink';

const LogoAndLinks = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['popupLinks'],
      ({ popupLinks }) => {
        const navLinks = popupLinks.map((link) => {
          if (link.active) {
            return (
              <div key={link.id}>
                <NewTabLink to={link.url}>{link.name}</NewTabLink>
              </div>
            );
          }
          return null;
        });
        setLinks(navLinks);
      });
  }, []);

  return (
    <>
      <NewTabLink to="https://csgotrader.app" key="home">
        <img src="/images/cstlogo48.png" alt="CSGO Trader Logo" />
        <h5>
          <span className="orange">CSGO Trader </span>
          <span>
            {chrome.runtime.getManifest().version}
          </span>
        </h5>
      </NewTabLink>
      {
        links
      }
    </>
  );
};

export default LogoAndLinks;
