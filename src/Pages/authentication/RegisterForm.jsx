import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';

const RegisterForm = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [values, setValues] = useState({
    first_name: '',
    ladt_name: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div class='custom-form-wrapper d-flex justify-content-center'>
        <form action='#' class='custom-form maxWidth470' onSubmit={onFormSubmit}>
          <h2 class='title opensans-bold color-theme-tangaroa'>Create new account</h2>
          <p class='description opensans-regular'>Feel free to contact us if you need any assistance, any help or another question.</p>
          <div className='mt-5'>
            <label htmlFor='first_name' className='mb-2 opensans-bold'>
              First Name:
            </label>
            <input type='text' className='form-control rounded border-white mb-3 form-input' id='first_name' placeholder='First Name' required autoComplete='off' />
          </div>
          <div>
            <label htmlFor='last_name' className='mb-2 opensans-bold'>
              Last Name:
            </label>
            <input type='text' className='form-control rounded border-white mb-3 form-input' id='last_name' placeholder='Last Name' required autoComplete='off' />
          </div>
          <div>
            <label htmlFor='email' className='mb-2 opensans-bold'>
              Email
            </label>
            <input type='text' className='form-control rounded border-white mb-3 form-input' id='email' placeholder='Email' required autoComplete='off' />
          </div>
          <div>
            <label htmlFor='password' className='mb-2 opensans-bold'>
              Password:
            </label>

            <div className='input-group mb-3'>
              <input
                type={showPwd ? 'text' : 'password'}
                className='form-control rounded border-white form-input'
                id='password'
                name='password'
                value={values?.password}
                placeholder='Password'
                required
                autoComplete='off'
                onChange={handleChange}
              />
              <div className='input-group-append'>
                <button className='btn btn-show-eye' type='button' onClick={() => setShowPwd(!showPwd)}>
                  {!showPwd ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </button>
              </div>
            </div>
          </div>
          <div class='submit-button-wrapper mt-5'>
            <input type='submit' value='Create Account' className='opensans-regular' />
          </div>
          <p className='mt-3 mb-0 text-center opensans-regular'>
            Already have an account?
            <Link to={'/login'} className='opensans-bold ms-2 color-theme-tangaroa'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
