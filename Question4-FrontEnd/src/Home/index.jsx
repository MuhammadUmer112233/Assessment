import React, { useState, useEffect, useMemo } from 'react';
import { getAllUsers } from '../services/users/index';
import Rodal from 'rodal';
import { AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import { MdOpenInNew } from "react-icons/md";

import Button from '../components/Button';
import { CreateUserModal, UpdateUserModal, DeleteUserModal } from '../modals';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

import 'rodal/lib/rodal.css';
import './style..css';

function Home() {
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [createUserModal, setCreateUserModal] = useState(false);
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  const navigate = useNavigate();

  const handleGetAllUsers = async () => {
    let response = await getAllUsers();
    setUsers(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    handleGetAllUsers();
  }, [createUserModal, updateUserModal, deleteUserModal]);

  return (
    <>
      <div className='create-user-main main-padding'>
        {createUserModal && (
          <Rodal
            visible={createUserModal}
            onClose={() => setCreateUserModal(false)}
            width={1000}
            customStyles={{ borderRadius: '10px', height: 'max-content' }}>
            <CreateUserModal setCreateUserModal={setCreateUserModal} />
          </Rodal>
        )}

        {updateUserModal && (
          <Rodal
            visible={updateUserModal}
            onClose={() => setUpdateUserModal(false)}
            width={1000}
            customStyles={{ borderRadius: '10px', height: 'max-content' }}>
            <UpdateUserModal
              selectedUser={selectedUser}
              setUpdateUserModal={setUpdateUserModal}
            />
          </Rodal>
        )}
        <Rodal
          visible={deleteUserModal}
          onClose={() => setDeleteUserModal(false)}
          width={600}
          customStyles={{ borderRadius: '10px', height: 'max-content' }}>
          <DeleteUserModal
            selectedUser={selectedUser}
            setDeleteUserModal={setDeleteUserModal}
          />
        </Rodal>
        <div className='flex-between'>
          <h1 className='main-span'>All Users</h1>
          <Button
            value='Create User'
            onClick={() => setCreateUserModal(true)}
          />
        </div>
        <div className='get-all-users-table-main'>
          <table className='get-all-users-table-single'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Single User</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  className='table-tr'
                  key={user._id}
                  
                  >
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td className='edit-icon'>
                    <AiTwotoneEdit
                      onClick={() => {
                        setSelectedUser(user);
                        setUpdateUserModal(true);
                      }}
                    />
                  </td>
                  <td className='delete-icon'>
                    <AiTwotoneDelete
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteUserModal(true);
                      }}
                    />
                  </td>
                  <td>

                    <MdOpenInNew  
                        onClick={() => navigate(`/${user.ID}`)}
                      />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
