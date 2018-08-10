import QRCode from 'qrcode';

export function generate(walletId) {
  QRCode.toDataURL(walletId, (err, dataUrl) => {
    return dataUrl;
  });
}
