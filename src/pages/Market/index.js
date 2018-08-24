import React from "react";
import Loadable from 'react-loadable';
import { Route, Switch } from "react-router-dom";

import withContent from "../ContentWrapper";

const LoadingMessage = (name) => (<div> Loading Market {name} modules, Please wait</div>)

export const MarketList = Loadable({
    loader: () => import(/* webpackChunkName: "market-list" */ './MarketList'),
    loading: () => LoadingMessage('Market')
});

export const MarketDetail = Loadable({
    loader: () => import(/* webpackChunkName: "market-detail" */ './MarketDetail'),
    loading: () => LoadingMessage('MarketDetail')
});

function MarketView() {
    return (
        <div className="market-view">
            <Switch>
                <Route exact path="/market/" component={MarketList} />
                <Route path="/market/detail/:symbol" component={MarketDetail} />
            </Switch>
        </div>
    )
}

export default withContent(MarketView)