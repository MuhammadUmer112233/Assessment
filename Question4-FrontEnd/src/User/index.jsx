import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllUsers } from '../services/users/index';
import './style.css';

function User() {
  const [users, setUsers] = useState();
  const { userId } = useParams();

  const handleGetAllUsers = async () => {
    let response = await getAllUsers();
    setUsers(response.data);
    console.log(response.data);
  };

  const currentUser = users?.find((user) => user.ID == userId);
  console.log(currentUser);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <div className='single-user'>
      <h1>{currentUser?.name}</h1>
      <p>{currentUser?.ID}</p>
      <p>{currentUser?.email}</p>
    </div>
  );
}

export default User;
