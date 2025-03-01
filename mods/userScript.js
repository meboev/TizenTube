function resolveCommand(cmd, _) {
  for (const key in window._yttv) {
    if (window._yttv[key] && window._yttv[key].instance && window._yttv[key].instance.resolveCommand) {
      return window._yttv[key].instance.resolveCommand(cmd, _);
    }
  }
}

function showToast(title, subtitle) {
  const toastCmd = {
    openPopupAction: {
      popupType: 'TOAST',
      popup: {
        overlayToastRenderer: {
          title: {
            simpleText: title,
          },
          subtitle: {
            simpleText: subtitle,
          },
        },
      },
    },
  };
  resolveCommand(toastCmd);
}

setTimeout(() => {
  showToast('Welcome to Clean Tizen Tube', 'AdBlocker! Continue watching prompt auto dismiss! Made with <3');
}, 2000);

/**
 * This is a minimal reimplementation of the following uBlock Origin rule:
 * https://github.com/uBlockOrigin/uAssets/blob/3497eebd440f4871830b9b45af0afc406c6eb593/filters/filters.txt#L116
 *
 * This in turn calls the following snippet:
 * https://github.com/gorhill/uBlock/blob/bfdc81e9e400f7b78b2abc97576c3d7bf3a11a0b/assets/resources/scriptlets.js#L365-L470
 *
 * Seems like for now dropping just the adPlacements is enough for YouTube TV
 */
const origParse = JSON.parse;
JSON.parse = function () {
  const r = origParse.apply(this, arguments);
  if (r.adPlacements) {
    r.adPlacements = [];
  }

  // Also set playerAds to false, just incase.
  if (r.playerAds) {
    r.playerAds = false;
  }

  // Also set adSlots to an empty array, emptying only the adPlacements won't work.
  if (r.adSlots) {
    r.adSlots = [];
  }

  // Drop "masthead" ad from home screen
  if (r?.contents?.tvBrowseRenderer?.content?.tvSurfaceContentRenderer?.content?.sectionListRenderer?.contents) {
    r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents =
      r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents.filter(
        (elm) => !elm.adSlotRenderer,
      );
  }

  return r;
};

/*
<ytlr-you-there-renderer
  idomkey="you-there"
  tabindex="-1"
  class="ytlr-you-there-renderer--show ytlr-you-there-renderer ytlr-you-there-renderer--focused zylon-focus ytlr-watch-default__you-there-el zylon-ve"
  hybridnavfocusable="true"
>
  <yt-formatted-string
    dir="auto"
    idomkey="prompt"
    tabindex="-1"
    class="ytFormattedStringHost ytlr-you-there-renderer__prompt"
  >
    Video paused. Continue watching?
  </yt-formatted-string>
  <ytlr-button-renderer
    hybridnavfocusable="true"
    idomkey="ytlr-you-there-renderer__button"
    tabindex="-1"
    class="ytlr-button-renderer ytlr-button-renderer--focused zylon-focus ytlr-you-there-renderer__button zylon-ve"
  >
    <ytlr-button
      hybridnavfocusable="true"
      role="button"
      aria-label=""
      disablehybridnavinsubtree="true"
      tabindex="-1"
      class="ytLrButtonDefaultShape ytLrButtonFocused ytLrButtonRoundedEntity ytLrButtonEntityWarmStyle ytLrButtonHost ytLrButtonFocused zylon-focus"
      style=""
    >
      <ytlr-avatar-lockup
        tabindex="-1"
        class="ytLrAvatarLockupReverseColor ytLrAvatarLockupHost ytLrButtonAvatarLockup"
      >
        <div
          idomkey="ytLrAvatarLockupMetadata"
          class="ytLrAvatarLockupMetadata"
        >
          <yt-formatted-string
            dir="auto"
            idomkey="ytLrAvatarLockupTitle"
            tabindex="-1"
            class="ytFormattedStringHost ytLrAvatarLockupTitle ytLrAvatarLockupTitleCertifiedSmallTitle"
            style=""
          >
            <span style="">Yes</span>
          </yt-formatted-string>
        </div>
      </ytlr-avatar-lockup>
    </ytlr-button>
  </ytlr-button-renderer>
</ytlr-you-there-renderer>
*/

let alreadyDismissed = false;

// Auto dismiss the Continue watching prompt
setInterval(() => {
  const youThereButton = document.querySelector('ytlr-you-there-renderer ytlr-button');
  if (!youThereButton || alreadyDismissed) return;

  showToast('Continue watching prompt', 'Auto dismissed <3');
  alreadyDismissed = true;

  // youThereButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));

  // document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, which: 27, keyCode: 27, key: 'Escape', code: 'Escape' }));
  // setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, which: 27, keyCode: 27, key: 'Escape', code: 'Escape' })) }, 500);

  document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, which: 13, keyCode: 13, charCode: 13, key: 'Enter', code: 'Enter' }));
  setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true, which: 13, keyCode: 13, charCode: 13, key: 'Enter', code: 'Enter' })) }, 500);

  setTimeout(() => { alreadyDismissed = false }, 5000);
}, 500);
