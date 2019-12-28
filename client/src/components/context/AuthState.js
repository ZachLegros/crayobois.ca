import React, { useState, useContext, useEffect } from "react";
import AuthContext from "./authContext";
import CvsContext from "./cvsContext";
import * as firebase from "firebase";

const AuthState = props => {
  const cvsContext = useContext(CvsContext);
  const [signInOrUp, setSignInOrUp] = useState("in");
  const [initializedFirebase, setInitializedFirebase] = useState(false);
  const [user, setUser] = useState({ displayName: "" });

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

  // sign up a user
  const signup = (name, email, password) => {
    try {
      auth.createUserWithEmailAndPassword(email, password).then(cred => {
        auth.currentUser.updateProfile({ displayName: name }).then(() => {
          setUser(cred.user);
          //ui update here
          const signupForm = document.querySelector("#signup-form");
          signupForm.reset();
          setInitializedFirebase(cred.user);
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const signout = () => {
    auth.signOut();
    setSignInOrUp("in");
  };

  const signin = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password).then(cred => {
        setUser(cred.user);
        //ui update here
        const signinForm = document.querySelector("#signin-form");
        signinForm.reset();
        setInitializedFirebase(cred.user);
      });
    } catch (err) {
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
        isInitialized: isInitialized,
        user: [user, setUser]
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
