import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const SignUpNew = (props) => {
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
      { status && status.failure && (
        <div className="col-sm-6 col-sm-offset-3 alert-siphtor alert">
          { status.failure }
        </div>
      ) }
      { status && status.success && <Redirect to="/signin" /> }
      <form className="p-5" onSubmit={handleSubmit}>
        <div className={`form-group ${errors.login && touched.login && 'has-error'}`}>
          <input
            name="login"
            type="text"
            className={`form-control`}
            value={values.login}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Login"
          />
          { errors.login && touched.login &&
            <div className="help-block">{ errors.login }</div> }
        </div>
        <div className={`form-group ${errors.password && touched.password && 'has-error'}`}>
          <input
            name="password"
            type="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Password"
          />
        { errors.password && touched.password &&
          <div className="help-block">{ errors.password }</div> }
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

        <Link to="/">
          <button className="btn btn-lg btn-primary pull-left" type="submit">
            <i className="fa fa-arrow-left"/> Back
          </button>
        </Link>

        <button
          type="submit"
          className="btn  btn-lg"
          disabled={ isSubmitting || !isValid }>
          {isSubmitting ? 'Signing Up' : 'Sign Up'}
          &nbsp;<i className="fa fa-user"/>
        </button>
      </form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    login: '',
    password: '',
    confirmation: ''
  }),

  validationSchema: Yup.object().shape({
    login: Yup.string()
    .required('Login is required!')
    .min(4, 'Is too short minimum length is 4 characters')
    .test('login-uniq', 'Login ${value} registered already', async function (value) {
      const url = `/api/user/exists/${value}`;
      return axios(url).then(r => r.data.payload.length === 0);
    }),

    password: Yup.string()
    .required('Password is required')
    .min(4, 'Is too short minimum length is 4 characters'),

    confirmation: Yup.string()
    .required('Password confirmation is required')
    .min(4, 'Is too short minimum length is 4 characters')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
  }),

  handleSubmit: (values, { setSubmitting, setStatus, setFieldError }) => {
    setFieldError('failure', undefined);
    axios.post('/api/user', {
      password: values.password,
      login: values.login,
    }).then(() => {
      setStatus({ success: true });
    }).catch((e) => {
      setStatus({ failure: e.response.data.message });
    }).finally(() => {
      setSubmitting(false);
    });
  },
})(SignUpNew);
