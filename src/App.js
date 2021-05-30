import './App.scss';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { connect, dispatch } from 'react-redux'
import { addAuth } from './actionCreators/auth'
import React from 'react'
import Login from './components/login/login'
import Courses from './components/courses/courses'

function App(props) {
  const [authData, setAuthData] = useState({})
  const [authChanged, setAuthChanged] = useState(0)

  let getAuth = async () => {
    console.log(props.authData)
    console.log(props && props.authData !== {} && props.authData['token'] !== undefined)
    if (props && props.authData && props.authData['token'] !== undefined) {
      setAuthData(props.authData)
      console.log({ authData })
    } else {
      let storedAuthData = await JSON.parse(await localStorage.getItem('authData'))
      console.log({ storedAuthData })
      if (storedAuthData && storedAuthData !== {}) {
        await props.addToAuth(authData)
      } else {
        console.log('logged Out')
      }
    }
  }
  useEffect(() => {
    getAuth()
  }, [])
  useEffect(() => {
    getAuth()
  }, [authChanged])


  return (
    <div className="App animate__animated animate__fadeInDown animate__faster">
      {(!props.authData || !props.authData['token']) && <Login authChanged={authChanged} setAuthChanged={setAuthChanged} />}

      {(props.authData['token']) && <Courses authChanged={authChanged} setAuthChanged={setAuthChanged} />}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log({ state })
  console.log(state['authReducer']['authData'])
  return ({
    authData: state['authReducer']['authData']
  })
}
const mapDispatchToProps = (dispatch) => {

  return {
    addToAuth: async authData => {
      console.log('authdata to dispatch:', authData)
      if (authData !== {}) {
        await dispatch(addAuth(authData))
        return true
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
