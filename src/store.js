import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { firebaseConfig } from "./credentials";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

// sample firebase config object with credentials

const sampleFirebaseConfig = {
  apiKey: "sample-key",
  authDomain: "sample-domain",
  databaseURL: "sampleURL",
  projectId: "projectId",
  storageBucket: "sample-storage",
  messagingSenderId: "sample-id"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for items in localStorage
if (localStorage.getItem("settings") == null) {
  const defaultSettings = {
    displayWeightUnit: "oz",
    resourceUnits: {
      energy: "kWh",
      oil: "gal",
      landfillSpace: "yd3",
      airPollutants: "lb",
      sand: "lb",
      sodaAsh: "lb",
      water: "gal"
    },
    showTrivia: true
  };

  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create initial state
const InitialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store

const store = createStoreWithFirebase(
  rootReducer,
  InitialState,
  compose(
    reactReduxFirebase(firebase),
    process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
);

export default store;
