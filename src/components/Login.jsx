import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const LOGIN_URL = '/auth';

function Login() {
	const userRef = useRef();
	const errRef = useRef();

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state.from.pathname || '/';

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');

	const { setAuth } = useAuth();

	useEffect(() => {
		userRef.current.focus();
	}, []);
	// Clear error message on input change
	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleLogin = (e) => {
		e.preventDefault();
		try {
			const response = axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			console.log(response.data);
			const accessToken = response.data.accessToken;
			setAuth({ user, pwd, accessToken });
			setUser('');
			setPwd('');
			navigate(from, { replace: true });
		} catch (error) {
			switch (error) {
				case error.response?.status === 400:
					setErrMsg('Wrong Credentials');
					break;
				case error.response?.status === 401:
					setErrMsg('Unauthorized');
					break;
				default:
					setErrMsg('Login Failed');
					break;
			}
			errRef.current.focus();
		}
	};

	return (
		<section>
			<p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
				{errMsg}
			</p>
			<h1>Login In</h1>
			<form onSubmit={handleLogin}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
				/>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<button>Sign In</button>
			</form>
		</section>
	);
}

export default Login;
