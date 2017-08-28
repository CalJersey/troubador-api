
import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  render() {
    let postNodes = this.props.data.map(post => {
      return <Post
              text={post.text}
              title={post.title}
              id={post['_id']}
              key={post['_id']}
              onPostDelete={this.props.onPostDelete}
              onPostUpdate={this.props.onPostUpdate} />;
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
}

export default PostList;
