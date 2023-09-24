import useSearchHistory from "../hooks/useSearchHistory";
import { useState } from "react";

const SearchBar = () => {

	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState("");
	const {searchHistory, setSearchHistory} = useSearchHistory();
	
	const changePrompt = e => {
		setPrompt(e.target.value);
	}

	const submitPrompt = async () => {
		const p = prompt;
		setPrompt("");
		setLoading(true)
		const response = await fetch("http://localhost:105/google-search-api", {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					google_search: p
				})
			});
			const json = await response.json();
			const newsearch = {
				title: json.title,
				summary: json.summary,
				keywords: json.keywords,
				topics: json.topics,
				links: json.links,
				questions: [{type:"gpt", msg: "Have questions? Feel free to ask me."}],
				notes: "",
				full: {
					type: "search"
				}
			};
			setSearchHistory(() => {
				return {
					searches: [
						...searchHistory.searches,
						newsearch
					],
					selected: searchHistory.searches.length,
					creating: false,
				}
			})
			setLoading(false);
	}

	return (
		<div className="searchbar inputbar">
			<div className="input-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
			<input value={prompt} onChange={changePrompt} placeholder={loading ? 'Loading...' : 'Start a search...'}/>
			<button onClick={submitPrompt} className="btn">Search</button>
		</div>
	)
}

export default SearchBar;