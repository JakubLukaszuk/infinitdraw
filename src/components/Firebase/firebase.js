import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) => this
    .auth
    .createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this
    .auth
    .signInWithEmailAndPassword(email, password);

  doSignOut = () => this
    .auth
    .signOut();

  doPasswordReset = email => this
    .auth
    .sendPasswordResetEmail(email);

  doPasswordUpdate = password => this
    .auth
    .currentUser
    .updatePassword(password);

  onAuthUserListener = (next, fallback) => this
    .auth
    .onAuthStateChanged(authUser => {
      if (authUser) {
        this
          .user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              providerData: authUser.providerData,
              ...dbUser
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });


  user = uid => this
    .db
    .ref(`users/${uid}`);

  users = () => this
    .db
    .ref('users');

  nicknames = () => this
    .db
    .ref('nicknames');

  message = uid => this
    .db
    .ref(`messages/${uid}`);

  messages = () => this
    .db
    .ref('messages');

  gameBaseValues = () => this
    .db
    .ref('gameBaseValues');

}
export default Firebase;