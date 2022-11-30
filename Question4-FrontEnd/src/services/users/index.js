import API from '../../config/api';

export const getAllUsers = async () => {
  try {
    const response = await API.get('/users', {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const createUser = async (data) => {
  try {
    const response = await API.post('/user', data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/user/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response;
  }
};

let config = {
  withCredentials: true,

};

export const updateUser = async (data, id) => {
  try {
    const response = await API.put(`/user/${id}`, data, config);
    return response;
  } catch (error) {
    throw error.response;
  }
};
