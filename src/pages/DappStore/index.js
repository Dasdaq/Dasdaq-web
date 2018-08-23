import React from "react";
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";

import withContent from "../ContentWrapper";

const LoadingMessage = (name) => (<div> Loading Dapp {name} modules, Please wait</div>)

export const DappList = Loadable({
    loader: () => import('./Dapp'),
    loading: () => LoadingMessage('Ranking List')
});

export const DappDetail = Loadable({
    loader: () => import('./DappDetail'),
    loading: () => LoadingMessage('Detail')
});

function DappView() {
    return (
        <div className="dappstore-view">
            <Switch>
                <Route exact path="/dapp" component={DappList} />
                <Route path="/dapp/:symbol/:exchange" component={DappDetail} />
            </Switch>
        </div>
    )
}

export default withContent(DappView)