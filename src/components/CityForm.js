import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';




class CityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', imageURL: '', description: ''};
    this.state = { isOpen: false };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }


  handleImageChange(e) {
    this.setState({ imageURL: e.target.value });
  }


handleDescriptionChange(e) {
  this.setState({ description: e.target.value });
}


handleSubmit(e) {
  e.preventDefault();
  this.hideModal();
  let name = this.state.name.trim();
  let imageURL = this.state.imageURL.trim();
  let description = this.state.description.trim();
  if (!name || !imageURL || !description) {
    return;
  }
  this.props.onCitySubmit({ name: name, imageURL: imageURL, description: description });
  this.setState({name: "", imageURL: "", description: ""});

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



        <button className='btn btn-primary add-city-bttn' onClick={this.openModal}>
          Add New City
        </button>


        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Add a new City to visit!</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <form className="add-city-form">
                <input
                  type='text'
                  placeholder='City name...'
                  value={ this.state.name }
                  onChange={ this.handleNameChange } />
                <input
                  type='text'
                  placeholder='Image link...'
                  value={ this.state.imageURL }
                  onChange={ this.handleImageChange } />
                <br />
                  <input
                    type='text'
                    placeholder='Description'
                    value={ this.state.description }
                    onChange={ this.handleDescriptionChange } />
            </form>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default close-city' onClick={this.hideModal}>
              Close
            </button>
            <button className='btn btn-primary save-city' onClick={this.handleSubmit}>
              Save City
            </button>
          </ModalFooter>

        </Modal>


      </div>
)

  }
}

export default CityForm;
