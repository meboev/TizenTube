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
  showToast('Welcome to Clean Tizen Tube', 'Made with <3');
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
