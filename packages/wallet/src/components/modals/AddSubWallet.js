import React from 'react';
import CommonModal from '../common/modal';
import PropTypes from 'prop-types';
import crypto from 'crypto';

import {connect} from 'react-redux';
import {notify} from 'reapop';
const hash = crypto.createHash('sha256');

class AddSubWallet extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        disabled: true
      }
    }

    _onClose = () => {
      this.modal.closeModal();
    }

    _onSubmit = () => {
      const {notify} = this.props;
      axios.post(`/api/create-subwallet/${this.state.name}`).then((response) => {
        axios.get('/api/get-accounts').then((response) => {
          ls.set('accounts', response.data.data);
          this.props.tab.forceUpdate();

          notify({
            message: 'Sub-wallet was successfully added',
            status: 'success',
            dismissible: true,
            dismissAfter: 3000
          })
        });
      }).catch(e => {
        notify({
          title: 'Error',
          message: e.response.data.message,
          status: 'error',
          dismissible: true,
          dismissAfter: 3000
        })
      })
    }

    _onChange = (e) => {
      let disabled;
      e.target.value.length > 3 ? disabled = false : disabled = true;

      this.setState({
        name: e.target.value,
        disabled: disabled
      })
    }

    render() {
        let header = (
          <div className="modal-header">
            <h5 className="modal-title">Create Subwallet</h5>
          </div>
        );

        let body = (
          <div className="modal-body">
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">Name</label>
              <div className="col-sm-9">
                <input onChange={this._onChange} type="text" className="form-control" id="inputPassword" placeholder=""/>
              </div>
            </div>
          </div>
        );

        let submitButton = (
          <button disabled={this.state.disabled} onClick={this._onSubmit} style={{padding: '7px 22px'}} type="button" className="button_button_3sUWn button_blue_2oFPD btn ">Create</button>
        );
        return (
          <CommonModal
            header={header}
            body={body}
            submitButton={submitButton}
            ref={this.props.modalRef}
          >
          </CommonModal>
        );
    }
}

export default connect(null, {notify})(AddSubWallet);
