import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
import { Login } from './pages/login/Login';
import './App.css';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <Login />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
