import { SET_REPOSITORIES, CLEAR_REPOSITORIES } from "../../Actions/types"

const intialState = {
	search_results: []
}

const repositoriesReducer = (state = intialState, action) => {
	switch (action.type) {
		case SET_REPOSITORIES:
			state.search_results.push(action.payload)
			return {
				...state,
				search_results: state.search_results
			}
		case CLEAR_REPOSITORIES:
			return {
				...state,
				search_results: []
			}
		default:
			return state
	}
}

export default repositoriesReducer
