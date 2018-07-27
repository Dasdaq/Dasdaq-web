import React from "react";
import Loadable from "react-loadable";
import { Card } from "antd";

export default
    function Loading({name}) {
    return (
        <div className="loading">
            <Card loading={true} title={`Loading ${name}`}>
                Loading modules
            </Card>
        </div>
    )
}

export const Loadingable = (loader, name) => Loadable({
    loader,
    loading: () => Loading({name})
});