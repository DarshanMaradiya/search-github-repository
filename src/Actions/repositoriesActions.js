import {
	CLEAR_ERRORS,
	SET_REPOSITORIES,
	CLEAR_REPOSITORIES,
	SET_ERRORS
} from "./types"

export const searchRepository = (
	keyword,
	per_page = 10,
	page = 1,
	dispatch
) => ({
	requestURL: `https://api.github.com/search/repositories?q=${keyword}&per_page=${per_page}&page=${page}`,
	requestMethod: "GET",
	requestPayload: null,
	onSuccess: (response) => {
		dispatch({
			type: CLEAR_ERRORS
		})
		dispatch({
			type: SET_REPOSITORIES,
			payload: response.data.items
		})
	},
	onFailure: (error) => {
		dispatch({
			type: SET_REPOSITORIES
		})
		dispatch({
			type: SET_ERRORS,
			payload: error
		})
	}
})

export const cleanUpRepositoriesSlice = () => (dispatch) => {
	dispatch({
		type: CLEAR_REPOSITORIES
	})
}
