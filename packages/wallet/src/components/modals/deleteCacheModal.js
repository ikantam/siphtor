import React from 'react';
import CommonModal from '../common/modal';
import PropTypes from 'prop-types';

class DeleteCacheModal extends React.Component {
  render() {
    return (
      <CommonModal ref={this.props.modalRef} >
        <div className="popup_popup_uNhfi" style={{ position: 'absolute', zIndex: 999, width: `${430}px` }}>
          <div className="popup-confirm_popupContent_A2S1h">
            <div className="popup-confirm_popupCenterData_1shmm">
              <p className="popup-confirm_atentionText_3Io6M"><img src="/public/images/1_yFKMP.svg?1522250547189" alt="" className="popup-confirm_iconAttention_1a52A" /><span>Attention!</span> You can clean the cache of your browser and create a new wallet. Before deleting cache we'll create a backup of your wallet. This will let you restore your wallet in the future. Press "Delete Cache" to download a backup of your wallet and delete it from the cache of your browser.</p>
              <div className="popup-confirm_iconBackupWrapper_24JQL"><img src="/public/images/1E-DInX.svg?1522250547189" alt="" /></div>
              <button className="popup-confirm_buttonDownload_3VCuR button_button_3sUWn button_red_2Ce20">Create SubWallet</button>
            </div>
          </div>
        </div>
      </CommonModal>
    );
  }
}

DeleteCacheModal.propTypes = {
  modalRef: PropTypes.func,
};

export default DeleteCacheModal;
