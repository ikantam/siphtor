import bcrypt from 'bcrypt';

const saltRounds = 7;

export async function cryptPassword(plainPassword) {
  const cryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return cryptedPassword;
}

export async function comparePassword(plainPassword, cryptedPassword) {
  const match = await bcrypt.compare(plainPassword, cryptedPassword);
  return match;
}
