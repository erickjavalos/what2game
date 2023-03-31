import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './style.css'
import companyLogo from '../../components/images/logo.png';

import Auth from '../../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="background flex flex-col justify-center">
      <div className="companyLogo flex flex-row justify-center">
        <img src={companyLogo} alt="logo" />
      </div>
      <main className="flex flex-col justify-stretch">
        <div className="card flex flex-row columns-2 h-full">
          <div className="leftColumn flex flex-col h-full w-2/6">
            <div className="leftSide login h-full"><p>Login</p></div>
            <div className="leftSide signup h-full"><p>Sign Up</p></div>
          </div>

          <div className="card-body flex flex-col w-full">
            <div className="title bg-dark text-light p-2 h-1/6 text-center">Login</div>

            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form className="submitForm flex flex-col justify-around h-5/6 m-0" onSubmit={handleFormSubmit}>
                <div className="inputFields flex flex-col justify-center h-max pt-5">
                    <input
                      className="form-input w-5/6"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input w-5/6 mt-5"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                </div>
                <button
                  className="submit w-5/6"
                  style={{ cursor: 'pointer' }}
                >
                  Login
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
