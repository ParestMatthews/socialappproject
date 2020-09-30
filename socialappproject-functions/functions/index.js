const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

const app = express();
admin.initializeApp();
const db = admin.firestore();

const firebase = require("firebase");
const { response } = require("express");
const {
  _onRequestWithOptions,
} = require("firebase-functions/lib/providers/https");
const config = {
  apiKey: "AIzaSyCi3ZSDom1IL8wmCn5-lNS-dXfYWIGSgX8",
  authDomain: "socialappproject-7684e.firebaseapp.com",
  databaseURL: "https://socialappproject-7684e.firebaseio.com",
  projectId: "socialappproject-7684e",
  storageBucket: "socialappproject-7684e.appspot.com",
  messagingSenderId: "615277847001",
  appId: "1:615277847001:web:63af8e008f21e20b39b9c8",
  measurementId: "G-66LNT5D7EP",
};
firebase.initializeApp(config);

app.get("/posts", (request, response) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          ...doc.data(),
        });
      });
      return response.json(posts);
    })
    .catch((err) => console.error(err));
});

app.post("/posts", (request, response) => {
  const newPost = {
    body: request.body.body,
    userHandle: request.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection("posts")
    .add(newPost)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong" });
    });
});

//helpfunctions
const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

//sign up
app.post("/signup", (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    handle: request.body.handle,
  };

  //validation
  let errors = {};

  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email";
  }

  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

  if (Object.keys(errors).length > 0) return response.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exist) {
        return response
          .status(400)
          .json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId,
      };
      db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        return response.status(400).json({ error: "Email is already in use" });
      } else {
        return response.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.https.onRequest(app);
