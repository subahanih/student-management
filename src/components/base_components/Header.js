import React from 'react';
import '../../Styles.css';
import signoutImg from '../../images/sign-out.png';
import logoImg from '../../images/logo.png';
import {Redirect} from 'react-router-dom';

export default class Header extends React.Component {

    state = {
        navigate: false
    };

    render() {

        if (this.state.navigate) {
            sessionStorage.removeItem('isLoggedIn');
            return <Redirect to="/login" push={true} />;
        }

        return (
            <div className="header">
                <img className="logo-img" src={logoImg} alt="logo" />
                <img className="signout-img" src={signoutImg} alt="signOut" onClick={() => this.setState({navigate: true})}/>
            </div>
        )
    }

}