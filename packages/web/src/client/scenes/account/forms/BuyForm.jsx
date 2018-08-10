import React from 'react';
import axios from 'axios';
import BuyCheckout from '../components/BuyCheckout';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const BuyForm = (props) => {
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
      <form onSubmit={handleSubmit}>
        <div className="input-group form-group">
          <span className="input-group-addon" title="Amount" id="priceLabel">
            Currency
          </span>
          <span className="input-group-addon" style={{width: "0px", paddingLeft:"0px", paddingRight: "0px", border: "none"}}></span>

          <select
            onChange={handleChange}
            name="symbol"
            className="form-control">
              <option value="sph">SPH</option>
              <option value="usd">USD</option>
          </select>
        </div>

        <div className={`form-group ${errors.amount && touched.amount && 'has-error'}`}>
          <input
            name="amount"
            type="number"
            className="form-control"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Amount"
          />
          { errors.amount && touched.amount &&
          <div className="help-block">{ errors.amount }</div> }
        </div>
        <BuyCheckout
          name={values.symbol.toUpperCase()}
          amount={values.amount}
          symbol={values.symbol}
          disabled={ !isValid }
        />
      </form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    symbol: 'sph',
    amount: ''
  }),

  validationSchema: Yup.object().shape({
    symbol: Yup.string(),
    amount: Yup.number()
    .required('Amount is required')
    .max(1000000, 'Maximum value is 1000000')
    .min(1, 'Is too short minimum length is 1 characters')
  }),

  handleSubmit: (values, { setSubmitting, setStatus, setFieldError }) => {
  },
})(BuyForm);
