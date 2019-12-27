import React, { useState } from "react";
import AuthContext from "./authContext";
import * as firebase from "firebase";

const AuthState = props => {
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
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // make auth and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();

  // sign up a user
  const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      console.log(cred.user);

      //ui update here
      const signupForm = document.querySelector("#signup-form");
      signupForm.reset();
    });
  };

  const logout = (e) => {
    e.preventDefault();
    auth.signOut().then(() => {

    });
  }

  const signin = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
  }

  return (
    <AuthContext.Provider
      value={{
        signup: signup,
        logout: logout,
        signin: signin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
