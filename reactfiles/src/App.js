import DocumentSidebar from './components/DocumentSidebar'
import Content from './components/Content'
import Navbar from './components/Navbar'
import { SearchHistoryProvider } from './hooks/useSearchHistory';
import MainDocument from './components/MainDocument'
import SideContent from './components/SideContent'

import { useEffect, useState } from 'react'

const App = () => {	

	const [res, setRes] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:105/json-example", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"language" : "Python",
					"framework" : "Flask",
					"website" : "Scotch",
					"version_info" : {
						"python" : "3.9.0",
						"flask" : "1.1.2"
					},
					"examples" : ["query", "form", "json"],
					"boolean_test" : true
				})
			});
			const jsons = await response.json();
			setRes(jsons);
		}
		fetchData();
	}, []);

	useEffect(() => {
		console.log(res);
	}, [res])
	
  return (
	<SearchHistoryProvider>
		<div className="app">
			<Navbar />
			<div className="app-container">
				<DocumentSidebar />
				<Content />
			</div>
		</div>
	</SearchHistoryProvider>
  );
}

export default App;
