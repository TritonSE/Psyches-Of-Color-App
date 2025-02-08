/**
 * This file contains the configuration for firebase
 * It exports a firebase auth object which will allow users
 * to access any firebase services. For this project we will use
 * firebase to for authentication.
 */
import * as firebase from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import env from "../util/validateEnv";

let serviceAccountKey: firebase.ServiceAccount;

if (!process.env.SERVICE_ACCOUNT_KEY) {
  throw new Error("Missing service account key");
} else {
  serviceAccountKey = env.SERVICE_ACCOUNT_KEY;
}

firebase.initializeApp({
  credential: firebase.cert(serviceAccountKey),
});

const firebaseAuth = getAuth();

export { firebaseAuth };
