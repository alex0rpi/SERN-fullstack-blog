import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title please :)'),
    postText: Yup.string().required(),
  });

  const onSubmit = async (data) => {
    // data object is provided by formik
    console.log(data);
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
    });
    navigate('/');
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={{ title: '', postText: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title:</label>
          <ErrorMessage name="title" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Example title"
          />
          <label>Post:</label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Example post"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
