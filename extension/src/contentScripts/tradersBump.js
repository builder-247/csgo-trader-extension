import { trackEvent } from 'utils/analytics';
import { logExtensionPresence } from 'utils/utilsModular';

const bump = () => {
  document.querySelectorAll('.btn.btn-custom.btn-xs').forEach((button) => {
    const link = button.getAttribute('href');
    const request = new Request(link);

    fetch(request).then(() => {});
  });

  trackEvent({
    type: 'event',
    action: 'TradersBump',
  });
};

logExtensionPresence();

trackEvent({
  type: 'pageview',
  action: 'TradersTradesView',
});

chrome.storage.local.get('tradersBump', (result) => {
  if (result.tradersBump) {
    // ugly way to wait for the trades to load and become "bumpable"
    setTimeout(() => {
      bump();
    }, 2000);

    const reloadInterval = Math.floor((Math.random() * 10) + 31);

    setTimeout(() => {
      window.location.reload();
    }, reloadInterval * 60 * 1000);
  }
});