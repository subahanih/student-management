import React from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import {Redirect} from 'react-router-dom';
import '../../Styles.css';

export default class Main extends React.Component {

    render() {
        if(sessionStorage.getItem('isLoggedIn')){
            return (
                <div>
                    <Header />
                    <Body />
                    <Footer /> 
                </div>
            )
        } else {
            return <Redirect to="/login" push={true} />
        }
    }

}