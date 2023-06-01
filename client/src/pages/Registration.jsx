import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).required(),
  });

  const onSubmitHandler = async (data) => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    alert(json.message);
    if (json.created) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>username</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="John Doe"
          />
          <label>password</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="your password"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
