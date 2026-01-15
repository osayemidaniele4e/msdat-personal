// eslint-disable-line func-names
/* global FB */
export function loadFbSdk(appId, version) {
  return new Promise((resolve) => {
    /* eslint func-names: ["error", "never"] */
    window.fbAsyncInit = function () {
      // eslint-disable-line func-names
      /* eslint func-names: ["error", "always"] */
      FB.init({
        appId: process.env.VUE_APP_FACEBOOK_APP_ID,
        xfbml: false,
        version,
        cookie: true,
      });
      FB.AppEvents.logPageView();
      resolve('SDK Loaded!');
    };
    // eslint-disable-next-line no-use-before-define
    /* eslint func-names: ["error", "never"] */
    (function (d, s, id) {
      // eslint-disable-line func-names
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  });
}
// eslint-disable-line func-names
export function getFbLoginStatus() {
  return new Promise((resolve) => {
    window.FB.getLoginStatus((responseStatus) => {
      resolve(responseStatus);
    });
  });
}

export function fbLogin(options) {
  return new Promise((resolve) => {
    window.FB.login((response) => resolve(response), options);
  });
}
export function fbLogout() {
  return new Promise((resolve) => {
    window.FB.logout((response) => resolve(response));
  });
}
