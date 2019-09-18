/* global chrome, XMLHttpRequest, gsStorage, gsUtils */
(function(global) {
  'use strict';

  try {
    chrome.extension.getBackgroundPage().tgs.setViewGlobals(global);
  } catch (e) {
    window.setTimeout(() => window.location.reload(), 1000);
    return;
  }

  function toggleNag(hideNag) {
    gsStorage.setOptionAndSync(gsStorage.NO_NAG, hideNag);
  }

  function loadDonateButtons(responseText) {
    // document.getElementById('donateButtons').innerHTML = responseText;

    // var bitcoinBtn = document.getElementById('bitcoinBtn');
    // var patreonBtn = document.getElementById('patreonBtn');
    // var paypalBtn = document.getElementById('paypalBtn');

    // bitcoinBtn.innerHTML = chrome.i18n.getMessage('js_donate_bitcoin');
    // patreonBtn.innerHTML = chrome.i18n.getMessage('js_donate_patreon');
    // paypalBtn.setAttribute('value', chrome.i18n.getMessage('js_donate_paypal'));

    // bitcoinBtn.onclick = function() {
    // };
    // patreonBtn.onclick = function() {
    // };
    // paypalBtn.onclick = function() {
    // };

    // document.getElementById('alreadyDonatedToggle').onclick = function() {
    //   toggleNag(true);
    //   window.location.reload();
    // };
    // document.getElementById('donateAgainToggle').onclick = function() {
    //   toggleNag(false);
    //   window.location.reload();
    // };
  }

  gsUtils.documentReadyAndLocalisedAsPromsied(document).then(function() {
    var versionEl = document.getElementById('aboutVersion');
    versionEl.innerHTML = 'v' + chrome.runtime.getManifest().version;

    // if (gsStorage.getOption(gsStorage.NO_NAG)) {
    //   document.getElementById('donateSection').style.display = 'none';
    //   document.getElementById('donatedSection').style.display = 'block';
    // }

    var request = new XMLHttpRequest();
    request.onload = () => loadDonateButtons(request.responseText);
    request.open('GET', 'support.html', true);
    request.send();

    //hide incompatible sidebar items if in incognito mode
    if (chrome.extension.inIncognitoContext) {
      Array.prototype.forEach.call(
        document.getElementsByClassName('noIncognito'),
        function(el) {
          el.style.display = 'none';
        }
      );
    }
  });
})(this);
