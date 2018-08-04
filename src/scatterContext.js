import React from 'react';

const ScatterContext = React.createContext(null);

export const { Consumer } = ScatterContext

export const withScatter = (Component) => (props) => (
    <Consumer>
        {
            scatter => <Component {...props} scatter={scatter} />
        }
    </Consumer>
)

export const ScatterProvider = ScatterContext.Provider