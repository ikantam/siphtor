import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const PasswordChangeForm = (props) => {
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
      {
        status && status.failure &&
        (<div className="alert-siphtor alert">
          { status.failure }
        </div>)
      }
      {
        status && status.success &&
        (<div className="alert-siphtor-success alert">
          { status.success }
        </div>)
      }
      <form className="p-5" onSubmit={handleSubmit}>
        <div className={`form-group ${errors.currentPassword &&
                touched.currentPassword && 'has-error'}`}>
          <input
            name="currentPassword"
            type="password"
            className={`form-control`}
            value={values.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Current Password"
          />
          { errors.currentPassword && touched.currentPassword &&
            <div className="help-block">{ errors.currentPassword }</div> }
        </div>
        <div className={`form-group ${errors.newPassword && touched.newPassword && 'has-error'}`}>
          <input
            name="newPassword"
            type="password"
            className="form-control"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="New Password"
          />
        { errors.newPassword && touched.newPassword &&
          <div className="help-block">{ errors.newPassword }</div> }
        </div>

        <div className={`form-group ${errors.confirmation && touched.confirmation && 'has-error'}`}>
          <input
            name="confirmation"
            type="password"
            className="form-control"
            value={values.confirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password Confirmation"
          />
          { errors.confirmation && touched.confirmation &&
          <div className="help-block">{ errors.confirmation }</div> }
        </div>

        <button
          type="submit"
          className="btn btn-lg"
          style={{ fontSize: "12px" }}
          disabled={ isSubmitting || !isValid }>
          {isSubmitting ? 'Changing' : 'Change'}
        </button>
      </form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: ''
  }),

  validationSchema: Yup.object().shape({
    currentPassword: Yup.string()
    .required('Current password is required')
    .min(4, 'Is too short minimum length is 4 characters'),

    newPassword: Yup.string()
    .required('Password is required')
    .min(4, 'Is too short minimum length is 4 characters'),

    confirmation: Yup.string()
    .required('Password confirmation is required')
    .min(4, 'Is too short minimum length is 4 characters')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
  }),

  handleSubmit: (values, { setSubmitting, setStatus, setFieldError }) => {
    setFieldError('failure', undefined);
    axios.put('/api/password', {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    }).then((r) => {
      setStatus({ success: r.data.message });
    }).catch((e) => {
      setStatus({ failure: e.response.data.message });
    }).finally(() => {
      setSubmitting(false);
      setTimeout(() => setStatus({}), 3000);
    });
  },
})(PasswordChangeForm);
