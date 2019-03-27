// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCHJ9KnaJi7nYrFnbJTvrUFkAJg0SOlx9U',
    authDomain: 'pancake-baa53.firebaseapp.com',
    databaseURL: 'https://pancake-baa53.firebaseio.com',
    projectId: 'pancake-baa53',
    storageBucket: 'pancake-baa53.appspot.com',
    messagingSenderId: '215889356782'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
