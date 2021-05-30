import { useState, useEffect } from 'react'
import './courses.scss';
import axios from 'axios'
import { connect, dispatch } from 'react-redux'
import { addAuth, removeAuth } from '../../actionCreators/auth'
import path from '../../env'
import { Navbar, Nav, ListGroup } from 'react-bootstrap'
import ReactPlayer from 'react-player'


function Courses(props) {
    const [authData, setAuthData] = useState({})
    const [courses, setCourses] = useState([])
    const [showModule, setShowModule] = useState(false)
    const [modules, setModules] = useState({})

    let getAuth = async () => {
        console.log(props)
        console.log(props.authData)
        if (props && props.authData) {
            setAuthData(props.authData)
            console.log({ authData })
        } else {
            console.log('logged Out')
            // props.removeAuth()
        }
    }
    useEffect(() => {
        getAuth()
        console.log({ authData })
        console.log(Object.keys(authData))
        console.log(Boolean(Object.keys(authData).length > 0))
    }, [])

    useEffect(() => {
        let getCourses = async () => {
            if (authData && authData['token']) {
                console.log('fetching courses::', path + 'courses/')
                axios.get(path + 'courses/', {
                    headers: {
                        token: authData['token']
                    }
                })
                    .then(async (response) => {
                        console.log(response)
                        if (response['data']['status']['code'] === 201) {
                            if (response['data']['data']) {
                                let coursesFetched = []
                                await response['data']['data'].forEach(el => {
                                    coursesFetched.push(el)
                                })
                                console.log({ coursesFetched })
                                await setCourses(coursesFetched)
                                console.log({ courses })
                            } else if (response['data']['data']['data']) {
                                let coursesFetched = []
                                await response['data']['data'].forEach(el => {
                                    coursesFetched.push(el)
                                })
                                console.log({ coursesFetched })
                                await setCourses(coursesFetched)
                            }
                        } else {
                            window.alert('Something went wrong. Please try again.')
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            } else {
                console.log('logged Out')
            }
        }
        getCourses()


    }, [authData])

    let getModules = async (id) => {
        if (authData && authData['token']) {
            console.log('fetching modules::', path + 'modules/' + id)
            axios.get(path + 'modules/' + id, {
                headers: {
                    token: authData['token']
                }
            })
                .then(async (response) => {
                    console.log(response)
                    if (response['data']['status']['code'] === 201) {
                        if (response['data']['data']) { 
                            let data = {}
                            data= response['data']['data']
                            console.log({ data })
                            await setModules(data)
                            console.log({ modules })
                        } else if (response['data']['data']['data']) { 
                            let data = {}
                            data= response['data']['data']['data']
                            console.log({ data })
                            await setModules(data)   
                        }
                    } else {
                        window.alert('Something went wrong. Please try again.')
                    }
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            console.log('logged Out')
        }
    }

    return (
        <div className="courses">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Imarticus-Courses</Navbar.Brand>

                <Navbar.Text className="mx-auto"> Hi,  {authData.name} </Navbar.Text>
                <Nav.Link onClick={props.removeAuth}>Logout</Nav.Link>
            </Navbar>

            <div className="animate__animated animate__zoomInDown" style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', gap: '5%', width: '90%', maxWidth: '700px', margin: '2% auto', height: '100%' }}>
                {!showModule && courses.map((course, ind) => {
                    return <div key={ind}>
                        <div key={ind} className="card" style={{ display: 'flex', flexDirection: 'row', alignContent: 'stretch', margin: '2% 0' }}>
                            <img src="https://i.pinimg.com/originals/dd/8f/2f/dd8f2fff7569e32d8cedc9344c6aa772.png" alt="web" style={{ height: '12rem' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexGrow:'1', padding: '10%' }}>
                                <h3 >{course.name}</h3>
                            </div>
                        </div>
                        <ListGroup>
                        {
                            course.modules.map((module, ind2) => {
                                return <ListGroup.Item action variant="info"  key={ind2}  style={{cursor: 'pointer'}} onClick={() => { getModules(module); setShowModule(true);}}>
                                    <h3 className="btn btn-outline-warn">Module {ind2}</h3>
                                </ListGroup.Item>
                            })
                        }
                        </ListGroup> 
                    </div>
                })
                }
                {showModule && modules && <h2 className="btn btn-danger mx-auto " onClick={() => { setModules({}); setShowModule(false);}}>Go Back</h2>}
                {showModule && modules && <h2>{modules.name}</h2>}
                {showModule && modules['videos'] && modules['videos'].map((video, ind) => {
                    return <div key={ind} className="card animate__animated animate__slideInUp" style={{ display: 'flex', flexDirection: 'column', margin: '2% 0', padding:'2%'}}>
                        <ReactPlayer url={video.url} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding:'2%' }}>
                            <h3>{video.name}</h3>
                            <p className="card-text">{video.description}</p>
                        </div>
                    </div>
                })
                }
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    authData: state['authReducer']['authData']
})
const mapDispatchToProps = (dispatch) => {

    return {
        addToAuth: authData => {
            console.log('authdata to dispatch:', authData)
            dispatch(addAuth(authData))
            return true
        },
        removeAuth: () => {
            console.log('logging Out: ')
            dispatch(removeAuth())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
