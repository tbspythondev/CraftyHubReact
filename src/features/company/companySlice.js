import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyList: [],
  loading: false,
  error: null,
  successMessage: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // Get company
    getCompanyListStart: (state) => {
      state.loading = true;
    },
    getCompanyListSuccess: (state, action) => {
      state.companyList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getCompanyListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add company

    addCompanyListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addCompanyListSuccess: (state, action) => {
      state.loading = false;
      state.companyList = state.companyList.map((user) => (user.id === action.payload.id ? action.payload : user));
    },
    addCompanyListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Company

    updateCompanyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateCompanySuccess: (state, action) => {
      state.loading = false;
      state.companyList = state.companyList.map((user) => (user.id === action.payload.id ? action.payload : user));
    },
    updateCompanyFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Company
    deleteCompanyListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCompanyListSuccess: (state, action) => {
      state.loading = false;
      state.companyList = state.companyList.filter((user) => user.id !== action.payload);
      state.successMessage = 'User deleted successfully';
    },
    deleteCompanyListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getCompanyListStart,
  getCompanyListSuccess,
  getCompanyListFailure,
  addCompanyListStart,
  addCompanyListSuccess,
  addCompanyListFailure,
  updateCompanyStart,
  updateCompanySuccess,
  updateCompanyFailure,
  deleteCompanyListStart,
  deleteCompanyListSuccess,
  deleteCompanyListFailure,
} = companySlice.actions;

export default companySlice.reducer;
