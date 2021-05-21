import React, { Component } from 'react';
import GLOBAL from '../global';
import AppContext from './appcontext';

class AppProvider extends Component {
    state = {
        authenticated: false,
        userInfo: null,
    };

    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            GLOBAL.USER_INFO = userInfo;
            this.authenticate(true);
        }
    }

    authenticate(authenticated) {
        this.setState({authenticated: authenticated});
    }

    deAuthenticate = () => {
        this.setState({ authenticated: false, userInfo: null });
        GLOBAL.USER_INFO = null;
        localStorage.removeItem("userInfo");
    };

    render() {
        const { children } = this.props;

        return(
            <AppContext.Provider value={{
                ...this.state,
                authenticate: this.authenticate,
                deAuthenticate: this.deAuthenticate

            }}>
            {children}
            </AppContext.Provider>
        )
    }

};

export default AppProvider;