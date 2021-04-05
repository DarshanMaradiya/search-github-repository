import { SET_ERRORS, CLEAR_ERRORS } from "../../Actions/types"

const intialState = {
	errors: {}
}

const errorsReducer = (state = intialState, action) => {
	switch (action.type) {
		case SET_ERRORS:
			return {
				...state,
				errors: action.payload
			}
		case CLEAR_ERRORS:
			return {
				...state,
				errors: {}
			}
		default:
			return state
	}
}

export default errorsReducer
