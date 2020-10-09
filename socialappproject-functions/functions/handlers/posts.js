const { response, request } = require("express");
const { db } = require("../util/admin");

// get all post
exports.getAllPosts = (request, response) => {
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
};

//upload one post
exports.postOnePost = (request, response) => {
  //FBAuth is the middleware
  if (request.body.body.trim() === "") {
    return response.status(400).json({ body: "Body must not be empty" });
  }

  const newPost = {
    body: request.body.body,
    userHandle: request.user.handle,
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
};

// fetch one post
exports.getPost = (request, response) => {
  let postData = {};
  db.doc(`/posts/${request.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Post not found" });
      }

      postData = doc.data();
      postData.postId = doc.id;
      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("postId", "==", request.params.postId)
        .get();
    })
    .then((data) => {
      postData.comments = [];
      data.forEach((doc) => {
        postData.comments.push(doc.data());
      });
      return response.json(postData);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });
};

// comment on a post
exports.commentOnPost = (request, response) => {
  if (request.body.body.trim() == "")
    return response.status(400).json({ error: "Must not be empty" });

  const newComment = {
    body: request.body.body,
    createdAt: new Date().toISOString(),
    postId: request.params.postId,
    userHandle: request.user.handle,
    userImage: request.user.imageUrl,
  };

  db.doc(`/posts/${request.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Post not found" });
      }

      return db
        .collection("comments")
        .add(newComment)
        .then(() => {
          response.json(newComment);
        });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: "Something went wrong" });
    });
};
