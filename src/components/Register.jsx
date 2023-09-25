import { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
function Register() {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	// const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);
	//Validate user TODO: Consider using ZOD
	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);
	// validate password
	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd, matchPwd]);
	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? 'errmsg' : 'offscreen'}
				aria-live='assertive'
			>
				{errMsg}
			</p>
			<h1>Register</h1>
			<form>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setUser(e.target.value)}
					required
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
				/>
				<p
					id='uidnote'
					className={
						userFocus && user && !validName ? 'instructions' : 'offscreen'
					}
				>
					<FaInfoCircle />
					4 to 24 characters.
					<br />
					Must begin with a letter.
					<br />
					Letters, numbers, underscores, hyphens allowed.
				</p>

				<label htmlFor='password'>
					Password:
					<FaCheck className={validPwd ? 'valid' : 'hide'} />
					<FaTimes className={validPwd || !pwd ? 'hide' : 'invalid'} />
				</label>
				<input
					type='password'
					id='password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
					aria-invalid={validPwd ? 'false' : 'true'}
					aria-describedby='pwdnote'
					onFocus={() => setPwdFocus(true)}
					onBlur={() => setPwdFocus(false)}
				/>
				<p
					id='pwdnote'
					className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
				>
					<FaInfoCircle />
					8 to 24 characters.
					<br />
					Must include uppercase and lowercase letters, a number and a special
					character.
					<br />
				</p>

				<label htmlFor='confirm_pwd'>
					Confirm Password:
					<FaCheck className={validMatch && matchPwd ? 'valid' : 'hide'} />
					<FaTimes className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
				</label>
				<input
					type='password'
					id='confirm_pwd'
					onChange={(e) => setMatchPwd(e.target.value)}
					value={matchPwd}
					required
					aria-invalid={validMatch ? 'false' : 'true'}
					aria-describedby='confirmnote'
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
				/>
				<p
					id='confirmnote'
					className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
				>
					<FaInfoCircle />
					Must match the first password input field.
				</p>

				<button
					disabled={!validName || !validPwd || !validMatch ? true : false}
				>
					Sign Up
				</button>
			</form>
		</section>
	);
}

export default Register;
