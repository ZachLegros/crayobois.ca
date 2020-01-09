import React, { useState } from "react";
import AuthContext from "./authContext";
import * as firebase from "firebase";
const uuidv4 = require("uuid/v4");

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
  const [cart, setCart] = useState([]);
  const [dashboardAlertOn, setDashboardAlertOn] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    action: "",
    placeholder: ""
  });
  const [priceBreakdown, setPriceBreakdown] = useState({});

  // random color generator for user profile
  function getRandomColor() {
    const availableColors = [
      "#df5872",
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
      "#a50261"
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
    setCart(userObj.shoppingCart);
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
          const userObj = {
            color: userData.color,
            dateCreated: userData.dateCreated,
            email: userData.email,
            fullName: userData.fullName,
            orders: userData.orders,
            pensPurchased: userData.pensPurchased,
            shoppingCart: userData.shoppingCart
          };
          setUser(userObj);
          setCart(userData.shoppingCart);
        });
    }
  };

  // check email verified
  const getVerification = () => {
    return auth.currentUser.emailVerified;
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

  const AddToCart = (value, type) => {
    const uid = auth.currentUser.uid;
    const target = "shoppingCart";

    db.collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        let userData = data[target];
        let newObj = {};
        newObj["id"] = uuidv4();
        newObj["pen"] = value;
        newObj["quantity"] = 1;
        newObj["type"] = type;

        // initialize the fixed original sub total
        let pricesSum = 0;
        for (var e = 0; e < value.length; e++) {
          pricesSum += value[e].obj.price;
        }
        newObj["pricesSum"] = pricesSum;

        newObj["subTotal"] = newObj.pricesSum * newObj.quantity;

        // add new object in array
        userData.push(newObj);

        //add new array to db
        db.collection("users")
          .doc(uid)
          .update({
            [target]: userData
          });
      });
  };

  function removeFromCart(id) {
    const uid = auth.currentUser.uid;

    if (id === "*") {
      const newUser = { ...user };
      newUser.shoppingCart = [];
      setUser(newUser);
      const cart = newUser.shoppingCart;
    } else {
      const newUser = { ...user };
      const idx = newUser.shoppingCart.findIndex(pen => pen.id === id);
      newUser.shoppingCart.splice(idx, 1);
      setUser(newUser);
      const cart = newUser.shoppingCart;

      db.collection("users")
        .doc(uid)
        .get()
        .then(doc => {
          const data = doc.data();
          const cart = data["shoppingCart"];
          var newCart = [];
          for (var i = 0; i < cart.length; i++) {
            if (cart[i].id !== id) {
              newCart.push(cart[i]);
            }
          }
          //add new array to db
          db.collection("users")
            .doc(uid)
            .update({
              ["shoppingCart"]: newCart
            });
        });
    }

    return cart;
  }

  const updateCart = newCart => {
    const uid = auth.currentUser.uid;

    db.collection("users")
      .doc(uid)
      .update({
        ["shoppingCart"]: newCart
      });
  };

  const alertParams = (msg, action, placeholder) => {
    setDashboardAlertOn(true);
    setAlert({
      message: msg,
      action: action,
      placeholder: placeholder
    });
  };

  const changeName = newName => {
    const uid = auth.currentUser.uid;
    auth.currentUser.updateProfile({ displayName: newName }).then(() => {
      db.collection("users")
        .doc(uid)
        .update({
          ["fullName"]: newName
        });

      var userCopy = Object.assign([], user);
      userCopy.fullName = newName;
      setUser(userCopy);
    });
  };

  const changePassword = () => {
    const email = auth.currentUser.email;

    auth.sendPasswordResetEmail(email);
  };

  const createPurchaseUnits = cart => {
    const user = auth.currentUser;

    // generating items list
    let items = [];
    for (var i = 0; i < cart.length; i++) {
      const currentItem = cart[i];
      let item = {
        name: `${currentItem.pen[0].obj.name}, ${currentItem.pen[1].obj.type}`,
        description: `Stylo personnalisé ${i + 1}`,
        sku: `${currentItem.id}`,
        tax: {
          currency_code: "CAD",
          value: `${
            i === 0
              ? (priceBreakdown.taxes / currentItem.quantity).toFixed(2)
              : 0.0
          }`
        },
        unit_amount: {
          currency_code: "CAD",
          value: `${currentItem.pricesSum.toFixed(2)}`
        },
        quantity: `${currentItem.quantity}`
      };

      items.push(item);
    }

    let purchaseUnits = [
      {
        reference_id: "PUHF",
        description: `Commande de ${user.displayName}`,
        custom_id: `${uuidv4()}`,

        // total amount of order
        amount: {
          currency_code: "CAD",
          value: `${(
            parseFloat(items[0].tax.value * items[0].quantity) +
            parseFloat(priceBreakdown.subTotal)
          ).toFixed(2)}`,
          breakdown: {
            item_total: {
              currency_code: "CAD",
              value: `${priceBreakdown.subTotal.toFixed(2)}`
            },
            tax_total: {
              currency_code: "CAD",
              value: `${(items[0].tax.value * items[0].quantity).toFixed(2)}`
            }
          }
        },

        // items list
        items: items
      }
    ];

    return purchaseUnits;
  };

  const addOrderToClient = order => {
    const uid = auth.currentUser.uid;

    // get old orders
    db.collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        const data = doc.data();
        let orders = data["orders"];
        orders.push(order);

        // update orders
        db.collection("users")
          .doc(uid)
          .update({
            ["orders"]: orders
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
        getVerification: getVerification,
        caughtErr: [caughtErr, setCaughtErr],
        errorMsg: [errorMsg, setErrorMsg],
        loading: [loading, setLoading],
        resetPassword: resetPassword,
        emailSent: [emailSent, setEmailSent],
        getUserSession: getUserSession,
        AddToCart: AddToCart,
        removeFromCart: removeFromCart,
        cart: [cart, setCart],
        updateCart: updateCart,
        alert: alert,
        alertParams: alertParams,
        changeName: changeName,
        changePassword: changePassword,
        dashboardAlertOn: [dashboardAlertOn, setDashboardAlertOn],
        createPurchaseUnits: createPurchaseUnits,
        priceBreakdown: [priceBreakdown, setPriceBreakdown],
        addOrderToClient: addOrderToClient
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
