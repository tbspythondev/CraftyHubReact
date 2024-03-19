import axios from 'axios';
import {
  getCompanyListStart,
  getCompanyListFailure,
  getCompanyListSuccess,
  addCompanyListStart,
  addCompanyListFailure,
  addCompanyListSuccess,
  deleteCompanyListStart,
  deleteCompanyListSuccess,
  deleteCompanyListFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
} from './companySlice';
import { API_BASE_URLS } from '../../API/Constant';

export const fetchCompanyLists = () => async (dispatch) => {
  dispatch(getCompanyListStart());
  try {
    const response = await axios.get(`${API_BASE_URLS.baseUrl}company/`);
    dispatch(getCompanyListSuccess(response.data));
  } catch (error) {
    dispatch(getCompanyListFailure(error.message));
  }
};

export const addCompany = (companyData) => async (dispatch) => {
  dispatch(addCompanyListStart());
  try {
    const response = await axios.post(`${API_BASE_URLS.baseUrl}company/`, companyData);
    dispatch(addCompanyListSuccess(response.data));
  } catch (error) {
    dispatch(addCompanyListFailure(error.message));
  }
};

export const updateCompany = (companyId, updatedUserData) => async (dispatch) => {
  dispatch(updateCompanyStart());
  try {
    const response = await axios.patch(`${API_BASE_URLS.baseUrl}company/${companyId}/`, updatedUserData);
    dispatch(updateCompanySuccess(response.data));
  } catch (error) {
    dispatch(updateCompanyFailure(error.message));
  }
};

export const deleteCompany = (CompanyListId) => async (dispatch) => {
  dispatch(deleteCompanyListStart());
  try {
    await axios.delete(`${API_BASE_URLS.baseUrl}company/${CompanyListId}/`);
    dispatch(deleteCompanyListSuccess(CompanyListId));
  } catch (error) {
    dispatch(deleteCompanyListFailure(error.message));
  }
};
