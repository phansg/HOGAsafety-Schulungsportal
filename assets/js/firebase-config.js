// HOGAsafety Schulungsportal Web V0.1
// Die normalen Firebase-Webwerte können aus der bestehenden HOGAsports firebase-config.js übernommen werden.
// WICHTIG: Der HOGAsafety Identity-Platform-Tenant muss separat angelegt und unten eingetragen werden.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { getFunctions } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js';

const firebaseConfig = {
  apiKey: 'HIER_BESTEHENDEN_FIREBASE_API_KEY_EINTRAGEN',
  authDomain: 'HIER_BESTEHENDE_AUTH_DOMAIN_EINTRAGEN',
  projectId: 'HIER_BESTEHENDE_PROJECT_ID_EINTRAGEN',
  storageBucket: 'HIER_BESTEHENDEN_STORAGE_BUCKET_EINTRAGEN',
  messagingSenderId: 'HIER_BESTEHENDE_MESSAGING_SENDER_ID_EINTRAGEN',
  appId: 'HIER_BESTEHENDE_APP_ID_EINTRAGEN'
};

export const HOGASAFETY_TRAINING_TENANT_ID = 'Schulungsportal-coyb3';
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.tenantId = HOGASAFETY_TRAINING_TENANT_ID;
export const db = getFirestore(app);
export const functions = getFunctions(app, 'europe-west1');
