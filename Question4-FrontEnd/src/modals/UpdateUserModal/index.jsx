import React from 'react';
import Button from '../../components/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateUser } from '../../services/users/index';
import './style.css';

function UpdateUserModal({ selectedUser, setUpdateUserModal }) {
  console.log(selectedUser);
  const handleClick = async (user) => {
    const payload = {
      name: user.name,
      username: user.username,
      email: user.email,
    };

    let response = await updateUser(payload, selectedUser.ID);
    setUpdateUserModal(false);
    user.name = '';
    user.username = '';
    user.email = '';
  };

  const { values, handleSubmit, handleChange, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
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
    <div className='update-user-modal'>
      <h2 className='main-span'>Update User</h2>
      <div className='create-user-inputs-main'>
        <div className='flex'>
          <div className='input-single'>
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
      </div>
      <div className='update-user-button flex'>
        <Button value='Save' onClick={handleSubmit} />
        <div className='m-left'>
          <Button
            value='Back'
            onClick={() => setUpdateUserModal(false)}
            border
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateUserModal;
