import Speakeasy from 'speakeasy';

export function generateSecret(o = {}) {
  const defaultOptions = {
    length: 32,
    name: o.name,
    issuer: 'Siphtor Wallet',
  };
  const options = Object.assign(defaultOptions, o);
  return Speakeasy.generateSecret(options).base32;
}

export function otpauthURL(o = {}) {
  const options = {
    label: o.label,
    secret: o.secret,
    issuer: 'Siphtor Wallet',
    algorithm: 'sha512',
    encoding: 'base32',
  };
  return Speakeasy.otpauthURL(options);
}

export function generateTOTP(secret) {
  return Speakeasy.totp({ secret, encoding: 'base32' });
}

export function verifyTOTP(secret, token) {
  const options = {
    secret,
    token,
    encoding: 'base32',
    window: 1,
  };
  const result = Speakeasy.totp.verify(options);
  return result;
}
