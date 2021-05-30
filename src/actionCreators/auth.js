import { ADD_AUTH, DEL_AUTH } from '../types'

const addAuth= authData=>{
	return {type: ADD_AUTH, payload: authData}
}

const removeAuth= ()=>{
	return {type: DEL_AUTH }
}
export { addAuth, removeAuth }