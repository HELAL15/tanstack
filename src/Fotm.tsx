import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

interface IProps {
  account_type: string | undefined;
  email: string | undefined;
  password: string | undefined;
  message?: string | undefined;
}

const Basic = () => {
  const validationSchema = object({
    email: string().email('Invalid email format').required('Email is required'),
    password: string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(12, 'Password must be at most 12 characters long'),
    account_type: string().required()
  });

  const { mutate, isPending, isError, error } = useMutation<
    IProps,
    Error,
    IProps
  >({
    mutationFn: async (newSetting) => {
      const response = await fetch(
        'https://backend.smartvision4p.com/ecommerce-multivendor/public/api/user/login',
        {
          method: 'POST',
          body: JSON.stringify(newSetting),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      return response.json();
    },
    onSuccess: (responseData) => {
      console.log('Login Successful:', responseData);
      alert(responseData.message || 'Login successful!');
    },
    onError: (err) => {
      console.error('Error:', err.message);
      alert('Login failed. Please try again.');
    }
  });

  return (
    <>
      <h1>Login Form</h1>

      {isPending && <div>Loading...</div>}
      {isError && <div style={{ color: 'red' }}>Error: {error?.message}</div>}

      <Formik
        initialValues={{ email: '', password: '', account_type: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          mutate(values, {
            onSettled: () => {
              setSubmitting(false);
              resetForm();
            }
          });
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component={'div'} />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component={'div'} />
            </div>
            {/* <div>
              <label htmlFor="type">type:</label>
              <Field as="select" name="account_type" id="type">
                <option value="" selected disabled>
                  select type
                </option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </Field>
              <ErrorMessage name="account_type" component={'div'} />
            </div> */}

            <label>
              <Field type="radio" name="account_type" value="user" />
              user
            </label>
            <label>
              <Field type="radio" name="account_type" value="admin" />
              admin
            </label>
            <ErrorMessage name="account_type" component={'div'} />

            <button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Basic;
