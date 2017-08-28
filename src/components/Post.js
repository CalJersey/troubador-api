
import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      title: this.props.title,
      text: this.props.text,
      user: '',
      editMode: false,
      id: this.props.id
    };
    this.deletePost = this.deletePost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
    this.editModeSwap = this.editModeSwap.bind(this);
  }
  updatePost(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handlePostUpdate(e) {
    e.preventDefault();
    let id = this.state.id;
    //if title or text changed, set it. if not, leave null and our PUT request
    //will ignore it.
    let title = this.state.title ? this.state.title : null;
    let text = this.state.text ? this.state.text : null;
    let post = {
      _id:id,
      title:title,
      text:text
    }
    this.props.onPostUpdate(id, post);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      editMode: !this.state.editMode
    });
  }
  deletePost(e) {
    e.preventDefault();
    let id = this.state.id;
    this.props.onPostDelete(id);
    console.log("oops deleted");
    this.setState(
      {toBeUpdated: true,
        editMode: false})
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  editModeSwap(e) {
    this.setState({ editMode: !this.state.editMode });
  }
  //opens our modal
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };

  //closes our modal
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };
  renderPost(){
    if (!this.state.editMode){
      return(
        <div className="viewPost">
          <div className="postTitle">{this.state.title}</div>
          <div className="postContent">{this.state.text}</div>
          <div className='post-footer'>
            <button className='btn btn-primary del-post' onClick={this.deletePost}>Delete</button>
            <button className='btn btn-primary edit-post' onClick={this.editModeSwap}>Edit Post</button>
          </div>
        </div>
      )
    } else {
      return(
        <div className="viewPost">
          <form action="#" onSubmit={this.handlePostUpdate} method="PUT" className="post-update-form">
          <div className="postTitle">
            <input type="text" name="title" value={this.state.title} size={this.state.title.length} onChange={this.handleTitleChange} required />
          </div>
          <div className="postContent">
            <input type="text" name="text" size={this.state.text.length} value={this.state.text} onChange={this.handleTextChange} required />
          </div>
          <div className='post-footer'>
            <button className='btn btn-primary del-post' onClick={this.openModal}>Delete</button>
            <button className='btn btn-primary save-post'>Save Post</button>
          </div>
        </form>
      </div>
      )
    }
  }

  render() {
    let postContent = this.renderPost();
    return (
      <div className="post">
        {postContent}
      </div>
    );
  }
}

export default Post;
