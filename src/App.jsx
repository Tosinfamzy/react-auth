import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Home from './components/Home';
import RequireAuth from './utils/requireAuth';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route element={<RequireAuth />}>
					<Route path='/' element={<Home />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
