import React from 'react';
import axios from 'axios';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const SubWalletForm = (props) => {
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
    forceUpdateParent
  } = props;

  return (
    <div className="new-wallets">
      <span className="big-text">Create Sub-Wallet</span>
      <form
        style={{ marginTop: "10px" }}
        onSubmit={handleSubmit}>
        <div className={`form-group ${errors.name && touched.name && 'has-error'}`}>
          <input
            name="name"
            type="text"
            className="form-control"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="User login or wallet QR code"
          />
          { errors.name && touched.name &&
          <div className="help-block">{ errors.name }</div> }
        </div>

        <div className="new-wall-buttons">
          <button
            type="submit"
            disabled={ isSubmitting || !isValid }
            style={{ fontSize: "13px", padding: "3px" }}
            className="btn btn-lg min">
            {isSubmitting ? 'Adding' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    name: '',
  }),

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Sub-wallet name is required')
  }),

  handleSubmit: (values, {
    setSubmitting, setStatus, setFieldError, props }) => {
    setFieldError('failure', undefined);
    axios.post(`/api/subwallet/${values.name}`)
    .then((response) => {
      props.forceUpdateParent();
      setStatus({ success: response.data.message });
    }).catch((e) => {
      setStatus({ failure: e.response.data.message });
    }).finally(() => {
      setSubmitting(false);
      setTimeout(() => setStatus({}), 3000);
    });
  },
})(SubWalletForm);
