import express from 'express';
import UserRouter from './user';
import SessionRouter from './session';
import TransactionRouter from './transaction';
import WalletRouter from './wallet';
import SecurityRouter from './security';


const decorator = func => async (req, res) => {
  try {
    await func(req, res);
  } catch (e) {
    console.log(e.stack);
    res.json({ error: e.message });
  }
};

const router = express.Router();

UserRouter(router, decorator);
SessionRouter(router, decorator);
TransactionRouter(router, decorator);
WalletRouter(router, decorator);
SecurityRouter(router, decorator);

export default router;
