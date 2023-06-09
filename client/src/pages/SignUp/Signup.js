import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import './style.css'
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import 'font-awesome/css/font-awesome.min.css';

import Auth from '../../utils/auth';

const Signup = (props) => {
  const [formState, setFormState] = useState({fullName: '', username: '', email: '', password: '', });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      email: '',
      password: '',
      fullName: ''
    });
  };

  return (
    <div className="background flex flex-col justify-center">
      <main className="m-auto flex flex-col justify-center">
        <div className="card flex flex-row columns-2 h-full">
          <div className="leftColumn flex flex-col h-full w-2/6">
            <div className="leftSide signup loginSection h-full flex flex-col justify-center"><FontAwesomeIcon size='2x' icon={faCircleUser} /><div className="mx-auto pt-2">Log in</div></div>
            <div className="leftSide signup signupSection h-full flex flex-col justify-center"><FontAwesomeIcon size='2x' icon={faPenToSquare} className="pl-2" /><div className="mx-auto pt-2">Sign up</div></div>
          </div>

          <div className="card-body flex flex-col w-full">
            <div className="title bg-dark text-light p-2 h-1/6 text-center">Sign up here</div>

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
                      placeholder="Full Name"
                      name="fullName"
                      type="fullname"
                      value={formState.fullName}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input w-5/6"
                      placeholder="Username"
                      name="username"
                      type="username"
                      value={formState.username}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input w-5/6"
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                    <input
                      className="form-input w-5/6 mt-5"
                      placeholder="Password"
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
                  Sign up
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

export default Signup;
