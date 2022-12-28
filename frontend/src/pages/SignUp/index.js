import { useState, useEffect } from 'react';
import { signUp } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
	const initialState = { username: '', password: '' };
	const [formState, setFormState] = useState(initialState);
	const navigate = useNavigate();

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.name]: event.target.value })};
		
		function handleSubmit(event) {
			event.preventDefault();
			signUp(formState).then((data) => {
				localStorage.token = data.token;
				localStorage.user_Id = data.user._id;
				props.setUser(data.user);
				console.log('this is signup data', data);
			});
			navigate('/user/login')
		};

		return (
			<div className="form">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>
					<p>Username</p>
					<input
						type='text'
						name='username'
						value={formState.username}
						onChange={handleChange}
						required
					/>
				</label>
				<label htmlFor='password'>
					<p>Password</p>
					<input
						type='password'
						name='password'
						value={formState.password}
						onChange={handleChange}
						required
					/>
				</label>
					<button type='submit'>Sign Up</button>
			</form>
			</div>
		);
	}
