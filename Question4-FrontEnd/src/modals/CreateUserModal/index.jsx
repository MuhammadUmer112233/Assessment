import React from 'react';
import Button from '../../components/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUser } from '../../services/users/index';
import './style.css';

function CreateUserModal({ setCreateUserModal }) {
  const handleClick = async (user) => {
    const payload = {
      name: user.name,
      username: user.username,
      email: user.email,
    };

    let response = await createUser(payload);

    console.log(user);
    setCreateUserModal(false);
    user.name = ' ';
    user.username = ' ';
    user.email = ' ';
  };

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: '',
        username: '',
        email: '',
      },
      validationSchema: yup.object().shape({
        name: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Name is required'),
        username: yup
          .string()
          .min(3, 'Cannot be less than 3 characters')
          .required('Username is required'),
        email: yup
          .string()
          .email('Not a proper email')
          .required('Email is required'),
      }),
      onSubmit: (values) => {
        handleClick(values);
      },
    });
  return (
    <div>
      <h2 className='main-span'>Create User</h2>
      <div className='create-user-inputs-main'>
        <div className='flex'>
          <div className='input-single '>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <div>
                <p className='error'>{errors.name}</p>
              </div>
            ) : null}
          </div>
          <div className='input-single m-left'>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={values.username}
              onChange={handleChange('username')}
              onBlur={handleBlur}
            />
            {errors.username && touched.username ? (
              <div>
                <p className='error'>{errors.username}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className='flex'>
          <div className='input-single'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? (
              <div>
                <p className='error'>{errors.email}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className='create-user-button flex'>
          <Button value='Create' onClick={handleSubmit} />
          <div className='m-left'>
            <Button
              value='Back'
              onClick={() => setCreateUserModal(false)}
              border
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUserModal;
