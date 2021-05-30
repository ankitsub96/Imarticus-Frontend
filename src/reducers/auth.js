import {ADD_AUTH, DEL_AUTH} from '../types'

let authReducer= ( state={authData:{}}, action)=>{

	switch(action.type){
		case ADD_AUTH: 
        console.log('addAuth Received::', action.payload);
        if(action.payLoad!=={}){
            localStorage.setItem('authData', JSON.stringify(action.payload)); 
        }
        return {...state, authData: action.payload}; 


		case DEL_AUTH: 
        localStorage.removeItem('authData');
        return {...state, authData: {}}; 

		default: return state
	} 
}
 
export {authReducer}