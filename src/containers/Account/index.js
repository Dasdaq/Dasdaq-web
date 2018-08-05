import React from "react";
import Loadable from 'react-loadable';

const LoadingMessage = (name) => (<div> Loading {name} modules, Please wait</div>)

// 😄 Magic Happened! Dynamic import and Async Load Components
export const Login = Loadable({
  loader: () => import('./Login'),
  loading: () => LoadingMessage('Login')
});

export const User = Loadable({
  loader: () => import('./User'),
  loading: () => LoadingMessage('User')
});

export const Register = Loadable({
  loader: () => import('./Register'),
  loading: () => LoadingMessage('Register')
});

export const Logout = Loadable({
  loader: () => import('./Logout'),
  loading: () => LoadingMessage('Logout')
});

export default [
  {
    path: '/account/info',
    component: User
  },
  {
    path: '/account/register',
    component: Register
  },
  {
    path: '/account/login',
    component: Login
  },
  {
    path: '/account/logout',
    component: Logout
  }
]