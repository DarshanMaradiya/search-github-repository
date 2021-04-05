import { Provider } from "react-redux"
import "./App.css"
import Welcome from "./Components/Welcome"
import store from "./ReduxStore/store"

function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Welcome />
			</div>
		</Provider>
	)
}

export default App
