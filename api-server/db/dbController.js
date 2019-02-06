"use strict";

const urlStart = "http://anttus.ddns.net:8080/";
import axios from "axios";

// const AUTH_TOKEN = 'Authorization: Basic cmVzdC5hcGk6c3VwZXJzZWNyZXQxMjM=';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// const BASIC_AUTH = 'Basic ' + btoa('rest.api' + ':' + 'supersecret123');
// auth: {
//     username: 'rest.api',
//     password: 'supersecret123'
// }

async function getFromUrl(url) {
  const response = await axios
    .get(url, status => {
      return status < 500; // Reject only if the status code is greater than or equal to 500
    })
    .catch(err => {
      throw new Error(err.message);
    });
  return response;
}

// FUTURE DEVELOPMENT

// export async function editListName(listId, newName) {
//   let url = urlStart + "api/lists?listId=" + listId + "&newName=" + newName;
//   axios.patch(url).catch(err => {
//     throw err;
//   });
// }

// export async function getUser() {
//   let url = urlStart + "api/users";
//   return getFromUrl(url);
// }

// export async function deleteUser(userId) {
//   let url = urlStart + "api/users?userId=" + userId;
//   axios.delete(url).catch(err => {
//     throw err;
//   });
// }

// export async function editItemName(itemId, newName) {
//   let url = urlStart + "api/items?itemId=" + itemId + "&newName=" + newName;
//   return axios.patch(url).catch(err => {
//     throw err;
//   });
// }

// USERS
export async function addUser(userId, email) {
  let url = urlStart + "api/users?userId=" + userId + "&email=" + email;
  return axios.put(url).catch(err => {
    throw err;
  });
}

export async function checkUserExists(email) {
  let url = urlStart + "api/users/ifexists?email=" + email;
  return getFromUrl(url);
}

// LISTS
export async function getListsOfUser(userId) {
  let url = urlStart + "api/lists?userId=" + userId;
  return getFromUrl(url);
}

export async function getSharedToUsers(listId) {
  let url = urlStart + "api/lists/users/shared?listId=" + listId;
  return getFromUrl(url);
}

export async function shareList(email, listId) {
  let url =
    urlStart + "api/lists/users/shared?email=" + email + "&listId=" + listId;
  return axios.put(url).catch(err => {
    throw err;
  });
}

export async function addList(userId, listName) {
  let url = urlStart + "api/lists?userId=" + userId + "&listName=" + listName;
  return axios.put(url).catch(err => {
    throw err;
  });
}

export async function addReferenceToUserLists(email, listId) {
  let url = urlStart + "api/lists/users?email=" + email + "&listId=" + listId;
  axios.put(url).catch(err => {
    throw err;
  });
}

export async function deleteList(listId) {
  let url = urlStart + "api/lists/" + listId;
  return axios.delete(url).catch(err => {
    throw err;
  });
}

// ITEMS
export async function getItems(listId) {
  let url = urlStart + "api/items?listId=" + listId;
  return getFromUrl(url);
}

export async function addItem(listId, itemName) {
  let url = urlStart + "api/items?name=" + itemName + "&listId=" + listId;
  return axios.put(url).catch(err => {
    throw err;
  });
}

export async function deleteItem(listId, itemId, itemName) {
  let url =
    urlStart +
    "api/items?listId=" +
    listId +
    "&itemId=" +
    itemId +
    "&itemName=" +
    itemName;
  axios.delete(url).catch(err => {
    throw err;
  });
}

export async function setItemStatus(itemId, completed) {
  let url =
    urlStart + "api/items/status?itemId=" + itemId + "&completed=" + completed;
  return axios.patch(url).catch(err => {
    throw err;
  });
}
