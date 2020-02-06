import React from 'react';
import '../../Styles.css';
import studenImg from '../../images/student.png';
import settingsImg from '../../images/settings.png';
import attendanceImg from '../../images/attendance.png';
import Settings from '../mgmt_components/Settings';
import Attendance from '../mgmt_components/Attendance';
import Student from '../mgmt_components/Student';

export default class Body extends React.Component {

    state = {
        selectedComponent: ''
    };

    render() {
        return (
            <div className="body-panel">
                <div className="menubar">
                    <div className="menu-item-div">
                        <img className="menu-item" src={studenImg} alt="student" onClick={()=>this.setState({selectedComponent:"Student"})} />
                        <h4 className="menu-txt">Student</h4>
                    </div>
                    <div className="menu-item-div">
                        <img className="menu-item" src={attendanceImg} alt="attendance" onClick={()=>this.setState({selectedComponent:"Attendance"})} />
                        <h4 className="menu-txt">Attendance</h4>
                    </div>
                    <div className="menu-item-div">
                        <img className="menu-item" src={settingsImg} alt="settings" onClick={()=>this.setState({selectedComponent:"Settings"})} />
                        <h4 className="menu-txt">Settings</h4>
                    </div>
                </div>
                <div className="mainbar">
                    {this.renderSelectedComponent(this.state.selectedComponent)}
                </div>
            </div>
        )
    }

    renderSelectedComponent(selectedComponent){
        switch(selectedComponent){
        case 'Student':
            return <Student />;
        case 'Attendance':
            return <Attendance />;
        case 'Settings':
            return <Settings />;
        default: 
            return <Student />;
        }
    }
    
}