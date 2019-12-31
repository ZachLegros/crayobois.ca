import React, { useState } from "react";
import AuthContext from "./authContext";
import * as firebase from "firebase";

const AuthState = props => {
  const [signInOrUp, setSignInOrUp] = useState("in");
  const [initializedFirebase, setInitializedFirebase] = useState(null);
  const [user, setUser] = useState({
    color: "",
    dateCreated: "",
    email: "",
    fullName: "",
    orders: [],
    pensPurchased: [],
    shoppingCart: []
  });
  const [caughtErr, setCaughtErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // random color generator for user profile
  function getRandomColor() {
    const availableColors = [
      "#df5872",
      "#a9ebdb",
      "#62cdfe",
      "#404936",
      "#d2061f",
      "#c907f5",
      "#6bb3be",
      "#2b9f8b",
      "#f93bb7",
      "#7be311",
      "var(--orange)",
      "var(--green)",
      "#a50261",
      "var(--black)"
    ];
    const max = availableColors.length;
    const randIdx = Math.floor(Math.random() * Math.floor(max));
    return availableColors[randIdx];
  }

  // firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBccRjBkjdgTdVxFQwKvrbpUCGCMeVryAA",
    authDomain: "crayobois-fe722.firebaseapp.com",
    databaseURL: "https://crayobois-fe722.firebaseio.com",
    projectId: "crayobois-fe722",
    appId: "1:410478848299:web:b2f130cd32dba774fcbd6e",
    measurementId: "G-XHQN6JX1WG"
  };

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    setInitializedFirebase(true);
  }

  // make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();

  const isInitialized = () => {
    return new Promise(resolve => {
      auth.onAuthStateChanged(resolve);
    });
  };

  // signup a user
  const signup = (name, email, password) => {
    const actionBtn = document.querySelector("#signup-action");

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        auth.currentUser.updateProfile({ displayName: name }).then(() => {
          setCaughtErr(false);
          sendVerification();

          // add user to firestore
          addUserToFirestore(cred.user.uid, name, email);

          //ui update here
          const signupForm = document.querySelector("#signup-form");
          signupForm.reset();
          setInitializedFirebase(cred.user);
          setLoading(false);
        });
      })
      .catch(err => {
        setCaughtErr(true);
        setErrorMsg("Adresse e-mail déjà utilisée.");
        actionBtn.classList.remove("btn-loading");
      });
  };

  // add user to firestore
  const addUserToFirestore = (uid, name, email) => {
    //get date
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const userObj = {
      color: getRandomColor(),
      dateCreated: date,
      email: email,
      fullName: name,
      orders: [],
      pensPurchased: [],
      shoppingCart: []
    };

    // adding user to db
    db.collection("users")
      .doc(uid)
      .set(userObj);

    // initializes the user's session
    setUser(userObj);
  };

  // send email verification
  const sendVerification = () => {
    const user = auth.currentUser;

    user.sendEmailVerification();
  };

  // signout user
  const signout = () => {
    auth.signOut();
    setSignInOrUp("in");
    setInitializedFirebase(null);
    const root = document.documentElement;
    root.style.setProperty("--profile_color", "#fff");
  };

  // signin user
  const signin = (email, password) => {
    const actionBtn = document.querySelector("#signin-action");

    auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        setLoading(true);
        setCaughtErr(false);

        // get user from db to initialize session
        getUserSession();

        //ui update here
        const signinForm = document.querySelector("#signin-form");
        signinForm.reset();
        setInitializedFirebase(cred.user);
      })
      .catch(err => {
        setCaughtErr(true);
        setErrorMsg("Adresse e-mail ou mot de passe invalide.");
        actionBtn.classList.remove("btn-loading");
      });
  };

  // get user's session
  const getUserSession = () => {
    if (auth.currentUser !== null) {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .get()
        .then(doc => {
          const userData = doc.data();
          const color = userData.color;
          const root = document.documentElement;
          root.style.setProperty("--profile_color", color);
          setUser({
            color: userData.color,
            dateCreated: userData.dateCreated,
            email: userData.email,
            fullName: userData.fullName,
            orders: userData.orders,
            pensPurchased: userData.pensPurchased,
            shoppingCart: userData.shoppingCart
          });
        });
    }
  };

  // check username
  const getUsername = () => {
    return auth.currentUser.displayName;
  };

  // check email verified
  const getVerification = () => {
    return auth.currentUser.emailVerified;
  };

  // check user' email
  const getEmail = () => {
    return auth.currentUser.email;
  };

  // reset password of account related to email
  const resetPassword = email => {
    const actionBtn = document.querySelector("#forgot-password-action");

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setCaughtErr(false);
        setErrorMsg("");
      })
      .catch(err => {
        setCaughtErr(true);
        setErrorMsg("L'adresse e-mail fournie est invalide.");
        actionBtn.classList.remove("btn-loading");
      });
  };

  const userArrayUpdater = (target, value) => {
    const uid = auth.currentUser.uid;

    db.collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        var userData = data[target];
        var newObj = {};
        newObj["pen"] = value;
        newObj["quantity"] = 1;
        
        // add new object in array
        userData.push(newObj);

        console.log(userData);
        //add new array to db
        db.collection("users")
          .doc(uid)
          .update({
            [target]: userData
          });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        signup: signup,
        signout: signout,
        signin: signin,
        signInOrUp: [signInOrUp, setSignInOrUp],
        initializedFirebase: [initializedFirebase, setInitializedFirebase],
        isInitialized: isInitialized,
        user: [user, setUser],
        getUsername: getUsername,
        getVerification: getVerification,
        getEmail: getEmail,
        caughtErr: [caughtErr, setCaughtErr],
        errorMsg: [errorMsg, setErrorMsg],
        loading: [loading, setLoading],
        resetPassword: resetPassword,
        emailSent: [emailSent, setEmailSent],
        getUserSession: getUserSession,
        userArrayUpdater: userArrayUpdater
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
