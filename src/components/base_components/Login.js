import React from 'react';
import userImg from '../../images/user.png';
import passwordImg from '../../images/lock.png';
import {Redirect} from 'react-router-dom';
import '../../Styles.css';
import firebase from '../../firebase'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            lblNotification: ''
        };
    }

    render() {

        if(sessionStorage.getItem('isLoggedIn')) {
            return <Redirect to="/main" push={true} />
        }

        return (
            <div className="login-bg">
                <div className="login-main-panel">
                    <div className="login-left-panel"></div>
                    <div className="login-right-panel">
                        <h1 className="login-text">Login</h1>
                        <div className="user-div">
                            <img src={userImg} alt="UserImg"/>
                            <input className="user-field" type="text" name="username" placeholder="Username" 
                                onChange={(evt) => this.setState({username:evt.target.value})} />
                        </div>
                        <div className="password-div">
                            <img src={passwordImg} alt="PasswordImg"/>
                            <input className="password-field" type="password" name="password" placeholder="Password"
                                onChange={(evt) => this.setState({password:evt.target.value})} />
                        </div>
                        <div className="login-button-div">
                            <button className="forgot-button">Forgot Password?</button>
                            <button className="login-button" onClick={this.login}>LOGIN</button>
                        </div>
                        <div className="login-notification-div">
                            <label className="login-notification">{this.state.lblNotification}</label>
                        </div>
                    </div>
                </div>
                <div className="about-me-div">
                    <h4 className="about-me-txt">Powerd by: Mahaboob Subahan | email: subahanih@gmail.com | mobile: +358 466182902</h4>
                </div>
            </div>
        )
    }

     login = () => {
        firebase.firestore().collection('user')
        .where('username', '==', this.state.username)
        .where('password', '==', this.state.password)
        .get().then((docs) => {
            if (!docs.empty) {
                const { history } = this.props;
                sessionStorage.setItem('isLoggedIn', true);
                history.push('/main');
            } else {
                this.setState({lblNotification: 'Invalid Username or Password'})
            }
        }).catch((error) => {
            this.setState({lblNotification: 'Error'})
        })
        // if(this.state.username === "admin" && this.state.password === "admin") {
        //     const { history } = this.props;
        //     sessionStorage.setItem('isLoggedIn', true);
        //     history.push('/main');
        // }
    }
}

export default Login;