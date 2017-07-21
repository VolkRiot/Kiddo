import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import * as style from './addkiddo.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ modalIsOpen: nextProps.modalState });
  }

  afterOpenModal() {
    setTimeout(() => {this.props.closeModal();}, 2000);
    this.subtitle.style.color = '#f7786b';
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={ this.state.modalIsOpen }
          onAfterOpen={ this.afterOpenModal }
          onRequestClose={ this.props.closeModal }
          style={customStyles}
          contentLabel="Example Modal">
            <h2 className="modalTitle" ref={subtitle => this.subtitle = subtitle }>Awesome!</h2>
              <div className="modalSubtitle">Your Kiddo's profile has been added to your dashboard.</div>
        </Modal>
      </div>
    );
  }
}

export default Success;
