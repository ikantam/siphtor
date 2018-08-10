import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#popup');

const defaultStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0)',
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '0px solid #ccc',
    background: 'rgba(0, 0, 0, 0)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};

class CommonModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const defaultHeader = (
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
      </div>
    );

    const defaultBody = (
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
    );

    return (
      <ReactModal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={defaultStyle}
      >
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content ">
            { this.props.header ? this.props.header : '' }
            { this.props.body ? this.props.body : '' }
            <div className="modal-footer">
              { this.props.submitButton }
              <button type="button" onClick={this.closeModal} className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

CommonModal.propTypes = {
  children: PropTypes.element,
  modalRef: PropTypes.func,
};

export default CommonModal;
