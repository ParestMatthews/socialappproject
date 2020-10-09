const functions = require("firebase-functions");

const express = require("express");

const app = express();
const FBAuth = require("./util/fbAuth");
const {
  getAllPosts,
  postOnePost,
  getPost,
  commentOnPost,
} = require("./handlers/posts");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

// posts routes
app.get("/posts", getAllPosts);
app.post("/post", FBAuth, postOnePost);
app.get("/post/:postId", getPost);
app.post("/post/:postId/comment", FBAuth, commentOnPost);
// TODO: delete post
// TODO: like post
// TODO: unlike post

//users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
