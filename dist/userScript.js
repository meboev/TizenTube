!function(){"use strict";function e(e,t){!function(e,t){for(var n in window._yttv)if(window._yttv[n]&&window._yttv[n].instance&&window._yttv[n].instance.resolveCommand)return window._yttv[n].instance.resolveCommand(e,t)}({openPopupAction:{popupType:"TOAST",popup:{overlayToastRenderer:{title:{simpleText:e},subtitle:{simpleText:t}}}}})}setTimeout((()=>{e("Welcome to Clean Tizen Tube","AdBlock! Continue watching prompt auto dismiss! Made with <3")}),2e3);var t=JSON.parse;JSON.parse=function(){var e,n=t.apply(this,arguments);return n.adPlacements&&(n.adPlacements=[]),n.playerAds&&(n.playerAds=!1),n.adSlots&&(n.adSlots=[]),null!=n&&null!==(e=n.contents)&&void 0!==e&&null!==(e=e.tvBrowseRenderer)&&void 0!==e&&null!==(e=e.content)&&void 0!==e&&null!==(e=e.tvSurfaceContentRenderer)&&void 0!==e&&null!==(e=e.content)&&void 0!==e&&null!==(e=e.sectionListRenderer)&&void 0!==e&&e.contents&&(n.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents=n.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents.filter((e=>!e.adSlotRenderer))),n},setInterval((()=>{var t=document.querySelector("ytlr-you-there-renderer ytlr-button");t&&(t.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0,cancelable:!0})),e("Continue watching prompt","Auto dismissed <3"))}),500)}();
