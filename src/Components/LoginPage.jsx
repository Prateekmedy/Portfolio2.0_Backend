import React, { Component } from 'react';
import firebase from '../utility/firebase'
import {Grid, TextField, Button, Link} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style/loginPage.css'

class Login extends Component {
    state = { 
        username : "",
        password : ""
     }

     //function for Login the user inside the application
     login = (user = '') => {
        
        if(user){
            this.props.updateSignIn(user)
        }else{
            let { username, password } = this.state

            firebase.auth().signInWithEmailAndPassword(username, password).then(user => {
                this.props.updateSignIn(user)
                console.log(user+" is successfully loggined")
            }).catch(err => {
                console.log("Auth "+ err)
                toast.error("Auth "+ err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })  
        }
        
     }

     //function for the SigningUp the new User
     signUp = () => {
        let { username, password } = this.state

        firebase.auth().createUserWithEmailAndPassword(username, password).then(user => {
            this.props.updateSignIn(user)
            console.log(user + " is successfully SigUp");
        }).catch(err => {
            console.error("Auth "+ err)
        })
        
     }

     resetPassword = () => {
        let { username } = this.state

         firebase.auth().sendPasswordResetEmail(username).then(user => {
            alert("Password Reset link is sended to the email "+username);
        }).catch(err => {
            console.error("Auth "+ err)
        })
     }

     //Event Handler
    updateUsername = evt => this.setState({ username : evt.target.value })
    updatePassword = evt => this.setState({ password : evt.target.value })

    render() { 
        return ( 
            <>
                <Grid  
                    className="background_container"
                    container 
                    direction="row" 
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item sm={4} >
                        <div id="left_login_pattern" className="side_pattern"></div>
                    </Grid>
                    <Grid 
                        item
                        sm={4}
                        container 
                        direction="row" 
                        className="center_section"
                    >
                        <Grid item sm={12} id="my_logo"></Grid>
                        <Grid 
                            item 
                            container
                            direction="column"
                            sm={12}     
                            justify="center"
                            alignItems="center" 
                            id="login_form"
                        >
                            <TextField
                                item="true"
                                sm={12}
                                label="Username"
                                className="outlined-size-small spacer"
                                variant="outlined"
                                onChange={evt => this.updateUsername(evt)}
                            />
                            <TextField
                                item="true"
                                sm={12}
                                type="password"
                                label="Password"
                                className="outlined-size-small spacer"
                                variant="outlined"
                                onChange={evt => this.updatePassword(evt)}
                            />
                            <Grid 
                                item
                                sm={6}
                                container 
                                direction="row" 
                                style={{maxHeight:'50px'}}
                            >
                                <Button
                                    item="true"
                                    sm={6}
                                    variant="contained"
                                    color="primary"
                                    className="primary-btn"
                                    id="login_btn"
                                    onClick={() => this.login('')}
                                >
                                    Login
                                </Button>
                                <Button
                                    item="true"
                                    sm={6}
                                    variant="outlined"
                                    color="primary"
                                    className="second-btn"
                                    id="guest_login_btn"
                                    onClick={() => this.login('guest')}
                                >
                                    Guest
                                </Button>
                            </Grid>
                            <Link href="#" item="true" sm={6} onClick={this.resetPassword}>
                                Reset Password
                            </Link>
                            
                            {/* <button onClick={this.sessionChecker}>Session Check</button>
                            <button onClick={this.logoutUser}>Logout</button>
                            <button onClick={this.deleteUser}>Delete User</button> */}
                        </Grid>
                    </Grid>
                    <Grid item sm={4} >
                        <div id="right_login_pattern" className="side_pattern"></div>
                    </Grid>
                </Grid>
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            </>
         );
    }
}
 
export default Login;