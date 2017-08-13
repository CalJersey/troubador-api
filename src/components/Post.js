import React, { Component } from 'react';
import '../MainStyle.css';
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
      user: ''
    };
    this.deletePost = this.deletePost.bind(this);
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

  deletePost(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onPostDelete(id);
    console.log('oops deleted');
  }
  editPost(e) {}

  render() {
    return (
      <div className="post">
        <div className="modal-window">
          <button className="btn btn-primary" onClick={this.openModal}>
            Delete
          </button>
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
