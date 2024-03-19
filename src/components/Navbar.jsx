import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-themePrussianBlue'>
          <div className='container-fluid'>
            <a className='navbar-brand opensans-bold' href='#'>
              CraftyHub
            </a>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <Link className={`nav-link opensans-regular ${location?.pathname == '/' ? 'active ' : ''}`} aria-current='page' to={'/'}>
                    Company
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className={`nav-link opensans-regular ${location?.pathname == '/contact' ? 'active' : ''}`} to={'/contact'}>
                    Contact
                  </Link>
                </li>
                {/* <li className='nav-item'>
                  <a className='nav-link disabled' href='#' tabindex='-1' aria-disabled='true'>
                    Disabled
                  </a>
                </li> */}
              </ul>
              <form className='d-flex'>
                {/* <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/login'}>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/register'}>
                      Signup
                    </Link>
                  </li>
                </ul> */}
                {/* <input className='form-control me-2' type='search' placeholder='Search' aria-label='Search' />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button> */}
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
