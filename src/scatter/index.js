import React, { Component } from 'react';

const { Consumer, Provider } = React.createContext(null);

export const withScatter = (Component) => (props) => (
    <Consumer>
        {
            scatter => <Component {...props} scatter={scatter} />
        }
    </Consumer>
)

export class ScatterProvider extends Component {
    // We do all those scatter dirty job here
    state = { scatter: null }

    componentWillMount() {
        // Listen to Scatter Loading
        document.addEventListener('scatterLoaded', () => {
            const scatter = window.scatter
            this.setState({ scatter })
            // It is good practice to take this off the window 
            // once you have a reference to it. @GetScatter Team
            window.scatter = null
        })
    }

    render() {
        return (
            <Provider value={this.state.scatter}>
                {this.props.children(this.state)}
            </Provider>
        )
    }
}