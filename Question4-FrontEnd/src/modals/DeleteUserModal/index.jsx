import React from 'react';
import Button from '../../components/Button';

import { deleteUser } from '../../services/users/index';

import './style.css';

function DeleteUserModal({ selectedUser, setDeleteUserModal }) {
  const handleClick = async () => {
    let response = await deleteUser(selectedUser.ID);

    console.log(response);
    if (response.status === 200) {
      setDeleteUserModal(false);
    }
  };

  return (
    <div className='delete-user-modal-main'>
      <h2 className='main-span'>Delete User</h2>
      <p>Are you sure you want to delete this user</p>

      <div className='delete-user-button flex'>
        <Button value='Delete' onClick={handleClick} />
        <div className='m-left'>
          <Button
            value='Back'
            onClick={() => setDeleteUserModal(false)}
            border
          />
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;
