import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactList: [],
  loading: false,
  error: null,
  successMessage: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // Get company
    getContactListStart: (state) => {
      state.loading = true;
    },
    getContactListSuccess: (state, action) => {
      state.contactList = action.payload;
      state.loading = false;
      state.error = null;
    },
    getContactListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add company

    addContactListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addContactListSuccess: (state, action) => {
      state.loading = false;
      state.contactList = state.contactList.map((user) => (user.id === action.payload.id ? action.payload : user));
      state.successMessage = action.payload.message;
    },
    addContactListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Company

    updateContactListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateContactListSuccess: (state, action) => {
      state.loading = false;
      state.contactList = state.contactList.map((user) => (user.id === action.payload.id ? action.payload : user));
    },
    updateContactListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Company
    deleteContactListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteContactListSuccess: (state, action) => {
      state.loading = false;
      state.contactList = state.contactList.filter((user) => user.id !== action.payload);
      state.successMessage = 'User deleted successfully';
    },
    deleteContactListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getContactListStart,
  getContactListSuccess,
  getContactListFailure,
  addContactListStart,
  addContactListSuccess,
  addContactListFailure,
  updateContactListStart,
  updateContactListSuccess,
  updateContactListFailure,
  deleteContactListStart,
  deleteContactListSuccess,
  deleteContactListFailure,
} = contactSlice.actions;

export default contactSlice.reducer;
