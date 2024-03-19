import axios from 'axios';
import {
  getContactListStart,
  getContactListFailure,
  getContactListSuccess,
  addContactListStart,
  addContactListFailure,
  addContactListSuccess,
  deleteContactListStart,
  deleteContactListSuccess,
  deleteContactListFailure,
  updateContactListStart,
  updateContactListSuccess,
  updateContactListFailure,
} from './contactSlice';
import { API_BASE_URLS } from '../../API/Constant';

export const fetchContactLists = () => async (dispatch) => {
  dispatch(getContactListStart());
  try {
    const response = await axios.get(`${API_BASE_URLS.baseUrl}contact/`);
    dispatch(getContactListSuccess(response.data));
  } catch (error) {
    dispatch(getContactListFailure(error.message));
  }
};

export const addContact = (contactData) => async (dispatch) => {
  dispatch(addContactListStart());
  try {
    const response = await axios.post(`${API_BASE_URLS.baseUrl}contact/`, contactData);
    dispatch(addContactListSuccess(response.data));
  } catch (error) {
    dispatch(addContactListFailure(error.message));
  }
};

export const updateContact = (contactId, updatedUserData) => async (dispatch) => {
  dispatch(updateContactListStart());
  try {
    const response = await axios.patch(`${API_BASE_URLS.baseUrl}contact/${contactId}/`, updatedUserData);
    dispatch(updateContactListSuccess(response.data));
  } catch (error) {
    dispatch(updateContactListFailure(error.message));
  }
};

export const deleteContact = (contactListId) => async (dispatch) => {
  dispatch(deleteContactListStart());
  try {
    await axios.delete(`${API_BASE_URLS.baseUrl}contact/${contactListId}/`);
    dispatch(deleteContactListSuccess(contactListId));
  } catch (error) {
    dispatch(deleteContactListFailure(error.message));
  }
};
