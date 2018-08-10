import React from 'react';
import axios from 'axios';
import BuyCheckout from '../components/BuyCheckout';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const SendForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    isValid,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
    status,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit} style={{padding: "10px"}}>
        <div className={`input-group form-group ${errors.amount && touched.amount && 'has-error'}`}>
          <span className="input-group-addon" title="Amount" id="priceLabel">Amount</span>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            id="searchbygenerals_priceFrom"
            name="amount"
            required="required"
            className="form-control"/>

          <span
            className="input-group-addon"
            style={{width: "0px", paddingLeft:"0px", paddingRight: "0px", border: "none"}}>
          </span>

          <select
            onChange={handleChange}
            id="searchbygenerals_currency"
            name="symbol"
            className="form-control">
              <option value="sph">SPH</option>
              <option value="usd">USD</option>
          </select>
        </div>
        { errors.amount && touched.amount &&
        <div style={{color: '#a94442'}} className="help-block">{ errors.amount }</div> }

        <div className={`form-group ${errors.login && touched.login && 'has-error'}`}>
          <input
            name="login"
            type="text"
            className="form-control"
            value={values.login}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="User login or wallet QR code"
          />
          { errors.login && touched.login &&
          <div className="help-block">{ errors.login }</div> }
        </div>

        <button
          type="submit"
          className="btn btn-lg pull-right"
          style={{ marginBottom: "10px", fontSize: "13px" }}
          disabled={ isSubmitting || !isValid }>
          {isSubmitting ? 'Sending' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    symbol: 'sph',
    amount: '',
    login: ''
  }),

  validationSchema: Yup.object().shape({
    symbol: Yup.string(),

    login: Yup.string()
    .required('Login is required')
    .test('login-uniq', 'Login ${value} is not registered', async function (value) {
      const url = `/api/user/exists/${value}`;
      return axios(url).then(r => r.data.payload.length !== 0);
    }),

    amount: Yup.number()
    .required('Amount is required')
    .max(1000000, 'Maximum value is 1000000')
    .min(1, 'Minimim value is 1')
  }),

  handleSubmit: (values, { setSubmitting, setStatus, setFieldError }) => {
    setFieldError('failure', undefined);
    axios.post('/api/send', {
      symbol: values.symbol,
      login: values.login,
      amount: values.amount,
    }).then((r) => {
      setStatus({ success: r.data.message });
    }).catch((e) => {
      setStatus({ failure: e.response.data.message });
    }).finally(() => {
      setSubmitting(false);
      setTimeout(() => setStatus({}), 3000);
    });
  },
})(SendForm);
