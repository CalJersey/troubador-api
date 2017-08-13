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

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', text: '' };
    this.state = { isOpen: false };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    let title = this.state.title.trim();
    let text = this.state.text.trim();
    if (!text || !title) {
      return;
    }
    this.props.onPostSubmit({ title: title, text: text });
    this.setState({ title: '', text: '' });
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

  render() {
    return (
      <div className="modal-window">
        <button className="btn btn-primary" onClick={this.openModal}>
          Add New Post
        </button>

        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />
            <ModalTitle>Modal title</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form>
              <input
                type="text"
                placeholder="title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <input
                type="text"
                placeholder="text"
                value={this.state.text}
                onChange={this.handleTextChange}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-default" onClick={this.hideModal}>
              Close
            </button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save Post
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PostForm;
