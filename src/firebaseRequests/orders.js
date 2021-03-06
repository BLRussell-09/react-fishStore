import axios from 'axios';
import constants from '../constants';

const getRequest = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/orders.json?orderBy="uid"&equalTo="${uid}"`)
      .then(res => {
        const orders = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            orders.push(res.data[fbKey]);
          });
        }
        resolve(orders);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const postRequest = (newOrder) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/orders.json`, newOrder)
      .then((res) => { resolve(res); })
      .catch((err) => { reject(err); });
  });
};

const deleteRequest = (firebaseId) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/orders/${firebaseId}.json`)
      .then((res) => { resolve(res); })
      .catch((err) => { console.error(err); });
  });
};

const getSingleRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/orders/${id}.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const putRequest = (orderId, updatedOrder) =>
{
  return new Promise((resolve, reject) =>
  {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/orders/${orderId}.json`, updatedOrder)
      .then((res) => { resolve(res); })
      .catch((err) => { console.error(err); });
  });
};

export default {getRequest, getSingleRequest, postRequest, putRequest, deleteRequest};
