import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Post from '../components/Post';
import Profile from '../components/Profile';
class Home extends Component {
  state = {
    posts: null,
  };

  componentDidMount() {
    axios
      .get('/posts')
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    let recentPosts = this.state.posts ? (
      this.state.posts.map((post) => (
        <Post post={post} key={post.postId}></Post>
      ))
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={5}>
        <Grid item sm={8} xs={12}>
          {recentPosts}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
