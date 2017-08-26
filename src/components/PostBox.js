
import React, { Component } from "react";
import axios from "axios";
import PostList from "./PostList";
import PostForm from "./PostForm";
import $ from 'jquery-ajax';

class PostBox extends Component {
  constructor(props) {
    super();
    this.state = {
      data: []
    };
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.loadPostsFromServer = this.loadPostsFromServer.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
  }

  loadPostsFromServer() {
    axios.get(`${this.props.citiesPostUrl}${this.props.cityId}`).then(res => {
      console.log(res.data)
      this.setState({ data: res.data.posts });
    })
  }

  handlePostSubmit(e) {
    //console.log(e);
    let post = this.state.data;
    //console.log(post)
    e.userId = this.props.userId; //  user_id
    e.cityId = this.props.cityId; // city_id
    //post.concat(e);
    let newPost = e;

    //this.setState({ data: newPost });
    axios
      .post(this.props.postGetUrl,newPost)
      .then(res => {

        newPost['_id'] = res.data['_id']

        post.unshift(newPost)
      this.loadPostsFromServer()

        //handleAddPost(res);
      })
      .catch(err => {
        console.error('OOPSIES', err);
      });
  }

  handlePostDelete(id) {
    axios
      .delete(`${this.props.postGetUrl}${id}`)
      .then(res => {
        console.log('Post Deleted');
        let posts = this.state.data.filter(function(post) {
          return post._id !== res._id;
        });
          this.loadPostsFromServer()
        })
      .catch(err => {
        console.log(err);
      });
  }
  handlePostUpdate(id, post) {
    //sends the post
    $.ajax({
      method: "put",
      url: `${this.props.postGetUrl}${id}`,
      data: post
    }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
  componentDidMount() {
    this.loadPostsFromServer()
  }
  render() {
    return (
      <div className="PostBox">
        <h3>What people are saying</h3>
        <div className="row ">
          <div className="col-md-12">
            <PostForm onPostSubmit={ this.handlePostSubmit }/>
          </div>
          <div className="col-md-12 list-item">
            <PostList
              loadPostsFromServer={this.loadPostsFromServer}
              onPostDelete={this.handlePostDelete}
              onPostUpdate={this.handlePostUpdate}
              data={this.state.data}
            />
          </div>
        </div>
      </div>

    );
  }
}

export default PostBox;
