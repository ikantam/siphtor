import React from 'react';
import { Link } from 'react-router-dom';

const ImportWallet = () => (
  <div className="app_pageWrapper_2GcaG">
    <div className="container">
      <div className="row">
        <div className="col-xs-6 col-xs-offset-3">
          <div className="import_container_1YI5G">
            <h3>Import your wallets<span>From Backup code</span></h3>
            <p>You can import the addresses private key you own into the Siphtor Wallet. We don't store or manage your keys. The wallet operates only on the client side, just in your local browser.</p>
            <div className="input-currency_wrapper_4mRdo inputs_wrapper_24u4z" tabIndex="0" role="button">
              <div className="input-currency_inputWrapper_2mPr5 inputs_inputWrapper_1HL5k input-currency_placeholder_2JYv2"><span>Select currency</span>
                <div className="input-currency_iconArrow_1_N99 inputs_iconArrow_ClpVp">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <path transform="rotate(-45 1.792 -.672)" d="M0 10h-1v1h1v-1zm10-1H0v2h10V9zm-9 1V0h-2v10h2z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="import-block_wrapperQrScanner__UdvM">
                <div className="qr-scanner_wrapper_Jz3YS tooltip_wrapper_2pDFm tooltip_oneLine_3SnMh">
                  <div><img src="/public/images/kRpsexV.svg?1522250547189" alt="" className="" /></div>
                </div>
              </div>
              <input type="password" className="import-block_inputPrivateKey_2ucKQ app_input_37biS input_input_32E4i" value="" autoComplete="off" placeholder="Private key, Mnemonic or XPRV" />
            </div>
            <div className="import-block_wrapperAddButton_VrOBm">
              <div className="tooltip_wrapper_2pDFm">
                <div className="secure-note_secureNote_2SEKG"><img src="/public/images/16djMkL.svg?1522250547189" alt="Secure encryption" /><span>Secure encryption</span></div>
              </div>
              <button className="button_button_3sUWn button_light-blue_2MRVC button_big_2vavs" disabled="">Import wallet</button>
            </div>
            <div className="import_wrapperContainerWallets_vxnPD">
              <h4>Wallets</h4>
              <div className="import_emptyWallets_3HoSB">No wallets have been added</div>
            </div>
            <div className="import_inlineButtons_3NGiS">
              <Link to="/welcome"><button className="back-button_backButton_2i8tV button_button_3sUWn button_simple_3l8_S"><img className="back-button_iconBack_ryDWT" alt="" src="/public/images/32-BNn3.svg?1522250547189" /><span>Back</span></button></Link>
              <button className="button_button_3sUWn button_blue_2oFPD button_big_2vavs" disabled="">Import</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ImportWallet;
