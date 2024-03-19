// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import fieldsReducer from '../features/fields/fieldsSlice';
import companyReducer from '../features/company/companySlice';
import contactReducer from '../features/contact/contactSlice';

export const store = configureStore({
  reducer: {
    fields: fieldsReducer,
    company: companyReducer,
    contact: contactReducer,
    // Add more reducers if needed
  },
});
