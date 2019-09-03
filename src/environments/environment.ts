// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD5m90GNORW8jW3NxZ2ACFlSy-ia3ib44M",
    authDomain: "barbogos.firebaseapp.com",
    databaseURL: "https://barbogos.firebaseio.com",
    projectId: "barbogos",
    storageBucket: "barbogos.appspot.com",
    messagingSenderId: "860689199486",
    appId: "1:860689199486:web:246fd83ba97d798e"
    },
  GOOGLE_MAPS_API_KEY: 'AIzaSyAmaC2XDjdRL1Hcc15lvWaxXKcAvkmwKYI',
  API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyAmaC2XDjdRL1Hcc15lvWaxXKcAvkmwKYI',
  API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyDye-8fFvIrjJN6eCnTsvLsHZVJisC-xDA',
  googleWebClientId: '860689199486-3jlsnks83mqt1oa55sphljl3bvcgoks4.apps.googleusercontent.com',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
