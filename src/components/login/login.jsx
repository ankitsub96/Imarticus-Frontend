import { useState } from 'react'
import './login.scss';
import axios from 'axios'
import { connect, dispatch } from 'react-redux'
import { addAuth } from '../../actionCreators/auth'
import path from '../../env'
import { Form, Button } from 'react-bootstrap'

function Login(props) {
    const [authData, setAuthData] = useState({})
    const [registerName, setRegisterName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    let reset =()=>{
        setRegisterName('')
        setRegisterEmail('')
        setRegisterPassword('')
        setLoginEmail('')
        setLoginPassword('')
    }
    let handleRegister = (event) => {
        event.preventDefault()
        axios.post(path + 'users/', {
            name: registerName,
            email: registerEmail,
            password: registerPassword
        })
        .then(async (response)=> {
            console.log(response);
            if (response['data']['status']['code'] === 200) {
                if(response['data']['data']){
                    await props.addAuth(response['data']['data'])
                    await setAuthData( props.authData ) 
                }else if(response['data']['data']['data']){  
                    await props.addAuth(response['data']['data']['data'])
                    await setAuthData( props.authData ) 
                    props.setAuthChanged(props.authChanged+1)
                }
                await console.log({authData})
            } else {
                window.alert('Something went wrong. Please try again.')
            }
            reset()
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    let handleRegisterName = (event) => {
        setRegisterName(event.target.value)
    }
    let handleRegisterEmail = (event) => {
        setRegisterEmail(event.target.value)
    }
    let handleRegisterPassword = (event) => {
        setRegisterPassword(event.target.value)
    }
    let handleLogin = (event) => {
        event.preventDefault()
        axios.post(path + 'users/'+loginEmail+'/login', { 
            password: loginPassword
        })
        .then( async (response)=> {
            console.log({response});
            if (response['data']['status']['code'] === 200) {
                if(response['data']['data']){
                    await props.addAuth(response['data']['data'])
                    await setAuthData( props.authData ) 
                }else if(response['data']['data']['data']){  
                    await props.addAuth(response['data']['data']['data'])
                    await setAuthData( props.authData ) 
                    props.setAuthChanged(props.authChanged+1)
                }
                await console.log({authData})
            } else {
                window.alert('Something went wrong. Please try Again with correct credentials')
            }
            reset()
            console.log('props.authData:::')
            console.log(await props.authData)
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
    let handleLoginEmail = (event) => {
        setLoginEmail(event.target.value)
    }
    let handleLoginPassword = (event) => {
        setLoginPassword(event.target.value)
    }

    return (
        <div className="login-main">
            <div className="card-group animate__animated animate__lightSpeedInRight">
                <div className="card register">
                    <h1>Register if you are a new User</h1>
                    <Form onSubmit={handleRegister}>
                        <Form.Label>Name</Form.Label>
                        <Form.Group controlId="registerName">
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleRegisterName} value={registerName} />
                        </Form.Group>

                        <Form.Group controlId="registerEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleRegisterEmail} value={registerEmail} />
                            <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="registerPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleRegisterPassword} value={registerPassword} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Submit </Button>
                    </Form>
                </div>
                <div className="card login">
                    <h1>Login if you are an existing User</h1>
                    <Form onSubmit={handleLogin}> 

                        <Form.Group controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleLoginEmail} value={loginEmail} />
                            <Form.Text className="text-muted"> We'll never share your email with anyone else. </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleLoginPassword} value={loginPassword} />
                        </Form.Group>
                        <Button variant="primary" type="submit"> Submit </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) =>{ 
    console.log({state})
    return({
        authData: state['authReducer']['authData']
    })
} 
const mapDispatchToProps = (dispatch) => {
    
    return{ addAuth:  authData=>{
        console.log('authdata to dispatch:', authData)
        dispatch(addAuth(authData))
      }}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
