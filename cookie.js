var cookieBannerSliderPos = 0;

function showCookieBanner() {
  var cookiebanner = document.getElementById("cookiebanner");
  var dialogHeight = parseInt(cookiebanner.offsetHeight);
  cookiebanner.style.bottom = (cookieBannerSliderPos - dialogHeight) + "px";
  cookieBannerSliderPos += 4;

  if (cookieBannerSliderPos < dialogHeight) {
    setTimeout(function () {
      showCookieBanner();
    }, 1);
  } else {
    cookieBannerSliderPos = 0;
    cookiebanner.style.bottom = "0px";
  }

  var cookieDetails = document.getElementById("cookie_details");
  var cookieHideDetails = document.getElementById("cookie_hide_details");
  var cookieShowDetails = document.getElementById("cookie_show_details");

  var buttonAllowAll = document.getElementById("CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");

  cookieShowDetails.onclick = function () {
    cookieDetails.classList.remove("visually-hidden");
    cookieHideDetails.classList.remove("visually-hidden");
    cookieShowDetails.classList.add("visually-hidden");
  };

  cookieHideDetails.onclick = function () {
    cookieDetails.classList.add("visually-hidden");
    cookieHideDetails.classList.add("visually-hidden");
    cookieShowDetails.classList.remove("visually-hidden");
  };

  buttonAllowAll.onclick = function () {
    var cookieCheckboxes = document.getElementsByClassName('cookie-checkbox');

    for (var i = 0; i < cookieCheckboxes.length; ++i) {
      cookieCheckboxes[i].checked = true;
    }

    Cookiebot.dialog.submitConsent();
  }
}

function hideCookieBanner() {
  var cookiebanner = document.getElementById("cookiebanner");
  cookiebanner.style.display = "none";
}
