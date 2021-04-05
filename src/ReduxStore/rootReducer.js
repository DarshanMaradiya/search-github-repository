import { combineReducers } from "redux"
import errorsReducer from "./Reducers/errorsReducer"
import repositoriesReducer from "./Reducers/repositoriesReducer"

const rootReducer = combineReducers({
	repositories: repositoriesReducer,
	errors: errorsReducer
})

export default rootReducer
