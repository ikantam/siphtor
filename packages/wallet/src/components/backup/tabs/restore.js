import React from 'react';

export default function TabRestore() {
  return (
    <div className="restore_wrapperForm_2UMpE app_wrapperCenterBlock_21Sbx">
      <h4>Restore Siphtor Wallet</h4>
      <p>You will be able to restore your Siphtor Wallet by using a passphrase (Backup). You will need the passphrase + password to restore your wallet.</p>
      <textarea placeholder="Backup text..." className="restore_textarea_2ektP app_textarea_1HxKI" />
      <input type="password" className="restore_input_CxuCc app_input_37biS input_input_32E4i" placeholder="Backup password" value="" autoComplete="off" />
      <div className="restore_footerButtonStatus_2GXfp app_footerButtonStatus_28fXU">
        <div />
        <button className="button_button_3sUWn button_blue_2oFPD button_big_2vavs" disabled="">Restore</button>
      </div>
      <div className="clearfix" />
    </div>
  );
}
