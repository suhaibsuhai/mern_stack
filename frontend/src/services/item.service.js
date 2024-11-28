import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/items';

const getItems = () => {
  return axios.get(apiUrl);
};

const addItem = (item) => {
  return axios.post(apiUrl, item);
};

const updateItem = (itemId, item) => {
  return axios.put(`${apiUrl}/${itemId}`, item);
};

const deleteItem = (itemId) => {
  return axios.delete(`${apiUrl}/${itemId}`);
};

export default {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
