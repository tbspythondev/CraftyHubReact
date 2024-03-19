import { API_BASE_URLS } from './Constant';
import { toast } from 'react-toastify';

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const handleError = (error) => {
  let errorMessage = 'An error occurred';
  if (error && error.message) {
    errorMessage = error.message;
  }
  toast.error(errorMessage);
};

export const postWithoutToken = (url, values) => {
  return fetch(API_BASE_URLS.baseUrl + url, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const getWithoutToken = (url) => {
  return fetch(API_BASE_URLS.baseUrl + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .catch(handleError);
};

export const patchWithoutToken = (url, values) => {
  return fetch(API_BASE_URLS.baseUrl + url, {
    method: 'PATCH',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .catch((error) => toast.error(error?.response?.data?.message));
};

export const deleteWithoutToken = (url) => {
  return fetch(API_BASE_URLS.baseUrl + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .catch(handleError);
};
