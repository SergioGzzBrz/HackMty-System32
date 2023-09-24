import DocumentSidebar from './components/DocumentSidebar'
import Content from './components/Content'
import Navbar from './components/Navbar'
import useSearchHistory, { SearchHistoryProvider } from './hooks/useSearchHistory';
import MainDocument from './components/MainDocument'
import SideContent from './components/SideContent'

import {initializeApp} from 'firebase/app'
import {getDatabase, set, ref, get, onValue} from 'firebase/database'

import { useEffect, useState } from 'react'
import User from './components/User';
const firebaseConfig = {
	apiKey: "AIzaSyAJcj7VHKDZ-4rdImMVBnHpqG38ddPm0Lw",
	authDomain: "hackmty-8942b.firebaseapp.com",
	databaseURL: "https://hackmty-8942b-default-rtdb.firebaseio.com",
	projectId: "hackmty-8942b",
	storageBucket: "hackmty-8942b.appspot.com",
	messagingSenderId: "58223174133",
	appId: "1:58223174133:web:c628c530957d8763dec0bc",
	measurementId: "G-Q4F1C07GEW"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const App = () => {	

	const [res, setRes] = useState();
	const [logged, setLogged] = useState(false);
	const [username, setUsername] = useState("");
	
  return (
	<SearchHistoryProvider username={username}>
		<div className="app">
			<Navbar logged={logged} setLogged={setLogged}/>
			<User logged={logged} setLogged={setLogged} username={username} setUsername={setUsername}/>
			{logged && <>
			<div className="app-container">
				<DocumentSidebar />
				<Content />
			</div>
			</>}
		</div>
	</SearchHistoryProvider>
  );
}

export default App;
