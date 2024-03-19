import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillEyeFill } from 'react-icons/bs';
import { BsFillEyeSlashFill } from 'react-icons/bs';

const LoginForm = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(values, 'values');
  };

  return (
    <>
      <div className='custom-form-wrapper'>
        <form action='#' className='custom-form maxWidth470' onSubmit={onFormSubmit}>
          <h2 className='title opensans-bold color-theme-tangaroa'>Login to your account</h2>
          <p className='description opensans-regular'>Feel free to contact us if you need any assistance, any help or another question.</p>
          <div className='mt-5'>
            <label htmlFor='email' className='mb-2 opensans-bold'>
              Email:
            </label>
            <input
              type='email'
              className='form-control rounded border-white mb-3 form-input'
              id='email'
              name='email'
              value={values?.email}
              placeholder='Email'
              required
              autoComplete='off'
              onChange={handleChange}
            />
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
          <div className='submit-button-wrapper mt-5'>
            <input type='submit' value='Login' className='opensans-regular' />
          </div>
          <p className='mt-3 mb-0 text-center opensans-regular'>
            Not a Member?
            <Link to={'/register'} className='opensans-bold ms-2 color-theme-tangaroa'>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
