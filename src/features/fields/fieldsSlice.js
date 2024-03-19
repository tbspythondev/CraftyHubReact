import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modulesList: [],
  fieldsList: [],
  loading: false,
  error: null,
  successMessage: null,
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {
    // Get Modules
    getModulesStart: (state) => {
      state.loading = true;
    },
    getModulesSuccess: (state, action) => {
      state.modulesList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getModulesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Get Fields
    getFieldStart: (state) => {
      state.loading = true;
    },
    getFieldSuccess: (state, action) => {
      state.fieldsList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFieldFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Add Fields
    addFieldStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    addFieldSuccess: (state, action) => {
      state.loading = false;
      state.fieldsList.push(action.payload);
      state.successMessage = 'User added successfully';
    },
    addFieldFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Fields

    updateFieldStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFieldSuccess: (state, action) => {
      state.loading = false;
      state.fieldsList = state.fieldsList.map((user) => (user.id === action.payload.id ? action.payload : user));
    },
    updateFieldFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Delete Fields
    deleteFieldStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteFieldSuccess: (state, action) => {
      state.loading = false;
      state.fieldsList = state.fieldsList.filter((user) => user.id !== action.payload);
      state.successMessage = 'User deleted successfully';
    },
    deleteFieldFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getModulesStart,
  getModulesSuccess,
  getModulesFailure,
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
} = fieldsSlice.actions;

export default fieldsSlice.reducer;
