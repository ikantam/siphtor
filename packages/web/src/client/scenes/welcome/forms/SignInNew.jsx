import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import SecureLS from 'secure-ls';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const UserForm = (props) => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset,
    status,
  } = props;

  const _handleSelect = (selectChoice) => {
    setFieldValue('imaginaryThingId', selectChoice.value);
  };

  return (
    <div>
      { status && status.failure && (
        <div className="col-sm-6 col-sm-offset-3 alert-siphtor alert">
          { status.failure }
        </div>
      ) }
      { status && status.success && <Redirect to='/account'/> }
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

        <Link to="/">
          <button className="btn btn-lg pull-left" type="submit">
            <i className="fa fa-arrow-left"/> Back
          </button>
        </Link>

        <button type="submit" className="btn btn-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In' : 'Sign In'}
          &nbsp;<i className="fa fa-sign-in-alt"/>
        </button>
      </form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (props) => ({
    login: '',
    password: ''
  }),

  validationSchema: Yup.object().shape({
    login: Yup.string()
    .required('Login is required!')
    .min(4, 'Is too short minimum length is 4 characters')
    .test('login-uniq', 'Login ${value} registered already', function (value) {
      return true;
    }),

    password: Yup.string()
    .min(4, 'Is too short minimum length is 4 characters')
    .required('Password is required!')
  }),

  handleSubmit: async (values, { setSubmitting, setStatus, setFieldError }) => {
    setFieldError('failure', undefined);
    axios.post('/api/session', {
      password: values.password,
      login: values.login,
    }).then((response) => {
      console.log(response);
      window.ls = new SecureLS();
      ls.set('user', response.data.user);
      ls.set('subwallet', undefined);
      setStatus({ success: true });
    }).catch((e) => {
      setStatus({ failure: e.response.data.message });
    }).finally(() => {
      setSubmitting(false);
    });
  },
})(UserForm);
