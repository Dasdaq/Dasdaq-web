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
