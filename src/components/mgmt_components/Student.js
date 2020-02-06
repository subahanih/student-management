import React from 'react'
import moment from 'moment'
import '../../Styles.css'
import firebase from '../../firebase'

export default class Student extends React.Component {

    constructor(props) {
        super(props)
        this.loadStudentDetails()
        this.state = {
            students: [],
            headers: ['First Name', 'Last Name', 'Level', 'email', 'Date of Birth', 'Mobile Number', 'Address' ],
            uid: '',
            firstname: '',
            lastname: '',
            level: '',
            email: '',
            dob: '',
            mobileno: '',
            address:'',
            selectedStudent: '',
            lblNotification: '',
            isUpdateEnabled: false,
            isAddEnabled: false
        }
    }

    render() { 
        return (
            <div>
                <div className="button-bar">
                    <button className="add-button" onClick={this.handleAdd} 
                        disabled={this.state.isAddEnabled}>Add</button>
                    <label className="lbl-notification">{this.state.lblNotification}</label>
                    <button className="delete-button" onClick={this.handleDelete}>Delete</button>
                    <button className="edit-button" onClick={this.handleEdit}>Edit</button>
                </div>
                <div className="add-edit-div">
                    <div className="add-div">
                        <div className="input-div">
                            <label className="lbl-text">Fisrt Name</label>
                            <input className="text-field" type="text" value={this.state.firstname} 
                                onChange={(event) => this.setState({firstname: event.target.value})} />
                        </div>
                        <div className="input-div">
                            <label className="lbl-text">Last Name</label>
                            <input className="text-field" type="text" value={this.state.lastname} 
                                onChange={(event) => this.setState({lastname: event.target.value})} />
                        </div>
                        <div className="input-div">
                            <div className="level-dob-div">
                                <label className="lbl-text">Date of Birth</label>
                                <input className="text-field" type="date" value={this.state.dob} 
                                    onChange={(event) => this.setState({dob: event.target.value})} />
                            </div>
                            <div className="level-dob-div">
                                <label className="lbl-text">Level</label>
                                <select className="text-field" value={this.state.level} 
                                    onChange={(event) => this.setState({level: event.target.value})}>
                                    <option value="">Select</option>
                                    <option value="1">1</option><option value="2">2</option>
                                    <option value="3">3</option><option value="4">4</option>
                                    <option value="5">5</option><option value="6">6</option>
                                    <option value="7">7</option><option value="8">8</option>
                                    <option value="9">9</option><option value="10">10</option>
                                    <option value="11">11</option><option value="12">12</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-div">
                            <label className="lbl-text">Email</label>
                            <input className="text-field" type="text" value={this.state.email} 
                                onChange={(event) => this.setState({email: event.target.value})} />
                        </div>
                        <div className="input-div">
                            <label className="lbl-text">Mobile Number</label>
                            <input className="text-field" type="text" value={this.state.mobileno} 
                                onChange={(event) => this.setState({mobileno: event.target.value})} />
                        </div>
                        <div className="input-div">
                            <label className="lbl-text">Address</label>
                            <input className="text-field" type="text" value={this.state.address} 
                                onChange={(event) => this.setState({address: event.target.value})} />
                        </div>
                        <div className="input-div">
                            <button className="cancel-button" onClick={this.handleReset}>Reset</button>
                            <button className="update-button" disabled={!this.state.isUpdateEnabled}
                                onClick={this.handleUpdate}>Update</button>
                        </div>
                    </div>
                    <div className="edit-div">
                        <table className="tbl-students">
                            <tbody>
                                <tr>{this.renderStudentHeader()}</tr>
                                {this.renderStudentData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    renderStudentHeader() {
        let headers = this.state.headers
        return headers.map((header, i) => {
            return <th key={i}>{header.toUpperCase()}</th>
        })
    }

    renderStudentData() {
        return this.state.students.map((student) => {
            return (
                <tr key={student.uid} onClick={() => this.onRowClick(student)}>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.level}</td>
                    <td>{student.email}</td>
                    <td>{student.dob}</td>
                    <td>{student.mobileno}</td>
                    <td>{student.address}</td>
                </tr>
            )
        })
    }

    onRowClick = (student) => {
        this.setState({
            selectedStudent: student
        })
    }

    handleReset = () => {
        this.setState({
            uid: '',
            firstname: '',
            lastname: '',
            level: '',
            email: '',
            dob: '',
            mobileno: '',
            address:'',
            lblNotification: '',
            isUpdateEnabled: true,
            isAddEnabled: false,
            selectedStudent: ''
        })
    }

    handleUpdate = () => {
        if(this.state.uid !== '') {
            firebase.firestore().collection('student').doc(this.state.uid).set({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                level: this.state.level,
                email: this.state.email,
                dob: moment(this.state.dob).format("YYYY-MM-DD"),
                mobileno: this.state.mobileno,
                address: this.state.address,
            }).then((docRef) => {
                this.handleReset()
                this.loadStudentDetails()
                this.setState({lblNotification: 'Updated Successfully!'})
            }).catch((error) => {
                this.setState({lblNotification: 'Error'})
            })
        } else {
            this.setState({lblNotification: 'Please select values from table'})
        }
    }

    handleDelete = () => {
        if(this.state.selectedStudent.uid !== '' && this.state.selectedStudent.uid !== undefined) {
            firebase.firestore().collection('student').doc(this.state.selectedStudent.uid)
            .delete().then((docRef) => {
                this.handleReset()
                this.loadStudentDetails()
                this.setState({lblNotification: 'Deleted Successfully!'})
            }).catch((error) => {
                this.setState({lblNotification: 'Error'})
            })
        } else {
            this.setState({lblNotification: 'Please select values from table and click Edit button then Delete'})
        }
    }

    handleEdit = () => {
        if(this.state.selectedStudent.uid !== '' && this.state.selectedStudent.uid !== undefined) {
            this.setState({
                uid: this.state.selectedStudent.uid,
                firstname: this.state.selectedStudent.firstname,
                lastname: this.state.selectedStudent.lastname,
                level: this.state.selectedStudent.level,
                email: this.state.selectedStudent.email,
                dob: moment(this.state.selectedStudent.dob).format("YYYY-MM-DD"),
                mobileno: this.state.selectedStudent.mobileno,
                address:this.state.selectedStudent.address,
                isUpdateEnabled: true,
                isAddEnabled: true
            })
        } else {
            this.setState({lblNotification: 'Please select the values to Edit'})
        }
    }

    handleAdd = () => {
        if(this.state.firstname !== ''){
            firebase.firestore().collection('student').add({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                level: this.state.level,
                email: this.state.email,
                dob: moment(this.state.dob).format("YYYY-MM-DD"),
                mobileno: this.state.mobileno,
                address: this.state.address,
            }).then((docRef) => {
                this.handleReset()
                this.loadStudentDetails()
                this.setState({lblNotification: 'Saved Successfully!'})
            }).catch((error) => {
                this.setState({lblNotification: 'Error'})
            })
        } else {
            this.setState({lblNotification: 'Please Enter Proper Values'})
        }
    }

    loadStudentDetails = () => {
        let studentsList = []
        firebase.firestore().collection('student')
        .get().then((docs) => {
            if (!docs.empty) {
                docs.forEach((doc) => {
                    studentsList.push({ ...doc.data(), uid: doc.id })
                })
                this.setState({students: studentsList})
                console.log(studentsList)
            } else {
                this.setState({lblNotification: 'Data is not available'})
            }
        }).catch((error) => {
            this.setState({lblNotification: 'Error'})
        })
    }

}