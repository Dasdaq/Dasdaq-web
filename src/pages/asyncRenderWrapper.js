import React from "react";
import Loadable from 'react-loadable';

const LoadingMessage = (name) => (<div> Loading {name} modules, Please wait</div>)

export const Dapp = Loadable({
  loader: () => import('./DappStore/Dapp'),
  loading: () => LoadingMessage('DappStore')
});

export const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => LoadingMessage('Home')
});
