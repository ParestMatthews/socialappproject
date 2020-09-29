const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();
const app = express();

app.get("/posts", (request, response) => {
  admin
    .firestore()
    .collection("posts")
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

  admin
    .firestore()
    .collection("posts")
    .add(newPost)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "something went wrong" });
    });
});

exports.api = functions.https.onRequest(app);
