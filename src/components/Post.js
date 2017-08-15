
import React, { Component } from "react";

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      title: '',
      text: '',
      user: '',
      editMode: false
    };
    this.deletePost = this.deletePost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
  }
  updatePost(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handlePostUpdate(e) {
    e.preventDefault();
    let id = this.props.id;
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
      title: "",
      text: "",
      editMode: !this.state.editMode
    });
  }
  deletePost(e) {
    e.preventDefault();
    let id = this.props.id;
    this.props.onPostDelete(id);
    console.log("oops deleted");
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
          <hr />
          <div className="postTitle">{this.props.title}</div>
          <hr />
          <div className="postContent">{this.props.text}</div>
          <div className='post-footer'>
            <button className='btn btn-primary del-post' onClick={this.deletePost}>Delete</button>
            <button className='btn btn-primary edit-post' onClick={this.editModeSwap}>Edit Post</button>
          </div>
        <hr />
        </div>
      )
    } else {
      return(

        <div className="editPostForm">
          <form action="#" onSubmit={this.handlePostUpdate} method="PUT" className="post-update-form">
            <input type="text" name="title" value={this.props.title} size={this.props.title.length} onChange={this.handleTitleChange} required />
            <input type="text" name="text" size={this.props.text.length} value={this.props.text} onChange={this.handleTextChange} required />
            <div className='post-footer'>
              <button className='btn btn-primary del-post' onClick={this.openModal}>Delete Post</button>
              <button className='btn btn-primary save-post'>Save Changes</button>
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

        <div className="modal-window">
          <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal} />
              <ModalTitle>Are you sure??</ModalTitle>
            </ModalHeader>
            <ModalBody>This data cannot be recovered.</ModalBody>
            <ModalFooter>
              <form>
                <button className="btn btn-default">Yes</button>
              </form>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Post;
