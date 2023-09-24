import { getDatabase, ref, onValue, set } from 'firebase/database';
import useSearchHistory from '../hooks/useSearchHistory';
import { useEffect, useState } from 'react';

const User = ({logged, setLogged, username, setUsername}) => {

	const {searchHistory, setSearchHistory} = useSearchHistory();

	const login = () => {
		if(username == "") return;
		const db = getDatabase();
		const userRef = ref(db, 'users/' + username);
		onValue(userRef, (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				setSearchHistory({
					searches: [],
					selected: -1,
					creating: true
				});
				setLogged(true);
				return;
			}
			setSearchHistory({
				searches: data.searches,
				selected: 0,
				creating: false
			});
			setLogged(true);
		});
	}

	const change = (e) => {
		setUsername(e.target.value);
	}

	return (
		<>
			{logged || <>
			
				<div className="container-center center login-container">
					<h1>Log in</h1>
					<p>or create an account</p>
					<div className="inputbar login-input">
						<i className="fa-solid fa-user"></i>
						<input placeholder="Username" value={username} onChange={change}/>
					</div>
					<button className="button-mid" onClick={login}>Enter</button>
				</div>
				
			</>}
		</>
	);
}

export default User;