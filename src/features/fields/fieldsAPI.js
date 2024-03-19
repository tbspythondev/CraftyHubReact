import axios from 'axios';
import {
  getFieldStart,
  getFieldSuccess,
  getFieldFailure,
  addFieldStart,
  addFieldSuccess,
  addFieldFailure,
  updateFieldStart,
  updateFieldSuccess,
  updateFieldFailure,
  deleteFieldStart,
  deleteFieldSuccess,
  deleteFieldFailure,
  getModulesStart,
  getModulesSuccess,
  getModulesFailure,
} from './fieldsSlice';
import { API_BASE_URLS } from '../../API/Constant';

export const getModules = () => async (dispatch) => {
  dispatch(getModulesStart());
  try {
    const response = await axios.get(`${API_BASE_URLS.baseUrl}module/`);
    dispatch(getModulesSuccess(response.data));
  } catch (error) {
    dispatch(getModulesFailure(error.message));
  }
};
export const fetchField = (id) => async (dispatch) => {
  dispatch(getFieldStart());
  try {
    const response = await axios.get(`${API_BASE_URLS.baseUrl}module/${id}/`);
    dispatch(getFieldSuccess(response.data));
  } catch (error) {
    dispatch(getFieldFailure(error.message));
  }
};

export const addField = (userData) => async (dispatch) => {
  dispatch(addFieldStart());
  try {
    const response = await axios.post(`${API_BASE_URLS.baseUrl}field/`, userData);
    dispatch(addFieldSuccess(response.data));
  } catch (error) {
    dispatch(addFieldFailure(error.message));
  }
};

export const updateField = (fieldId, updatedUserData) => async (dispatch) => {
  dispatch(updateFieldStart());
  try {
    const response = await axios.patch(`${API_BASE_URLS.baseUrl}field/${fieldId}/`, updatedUserData);
    dispatch(updateFieldSuccess(response.data));
  } catch (error) {
    dispatch(updateFieldFailure(error.message));
  }
};

export const deleteField = (fieldId) => async (dispatch) => {
  dispatch(deleteFieldStart());
  try {
    await axios.delete(`${API_BASE_URLS.baseUrl}field/${fieldId}/`);
    dispatch(deleteFieldSuccess(fieldId));
  } catch (error) {
    dispatch(deleteFieldFailure(error.message));
  }
};
