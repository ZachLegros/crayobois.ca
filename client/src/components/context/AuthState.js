import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./authContext";
import CvsContext from "./cvsContext";
import * as firebase from "firebase";

const AuthState = props => {
  const cvsContext = useContext(CvsContext);
  const [isLoggedIn, setIsLoggedIn] = cvsContext.isLoggedIn;
  const [signInOrUp, setSignInOrUp] = useState("in");
  const [initializedFirebase, setInitializedFirebase] = useState(false);

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

  /*// isLoggedIn
  auth.onAuthStateChanged(user => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });*/

  const isInitialized = () => {
    return new Promise(resolve => {
      auth.onAuthStateChanged(resolve);
    })
  }

  // sign up a user
  const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      //ui update here
      const signupForm = document.querySelector("#signup-form");
      signupForm.reset();
    });
  };

  const signout = () => {
    auth.signOut();
  };

  const signin = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password).then(cred => {
        //ui update here
        const signinForm = document.querySelector("#signin-form");
        signinForm.reset();
        setIsLoggedIn()
      });
    } catch(err) {
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup: signup,
        signout: signout,
        signin: signin,
        signInOrUp: [signInOrUp, setSignInOrUp],
        initializedFirebase: [initializedFirebase, setInitializedFirebase],
        isInitialized: isInitialized
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
