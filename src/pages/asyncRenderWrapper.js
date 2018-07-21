import React from "react";
import Loadable from 'react-loadable';

const LoadingMessage = (name) => (<div> Loading {name} modules, Please wait</div>)

export const Market = Loadable({
  loader: () => import('./Market'),
  loading: () => LoadingMessage('Market')
});

export const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => LoadingMessage('Home')
});
