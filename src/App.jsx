import './assets/styles/Global.css';
import './assets/styles/MediaQuery.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CompanyForm from './Pages/modules/CompanyForm';
import ContactForm from './Pages/modules/ContactForm';
import { Slide, ToastContainer } from 'react-toastify';
import Modules from './Pages/modules/Modules';
import LoginForm from './Pages/authentication/LoginForm';
import RegisterForm from './Pages/authentication/RegisterForm';
import Layout from './components/Layout';
import CompanyLists from './Pages/CompanyLists';
import ContactLists from './Pages/ContactLists';

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Slide}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        style={{ zIndex: '99999' }}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<CompanyLists />} />
            <Route path='/contact' element={<ContactLists />} />
            <Route path='/company-fields' element={<CompanyForm />} />
            <Route path='/contact-fields' element={<ContactForm />} />
          </Route>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
