import React, { useState } from 'react';
import useSearchHistory from '../hooks/useSearchHistory';
import DragDropFile from './DragDropFile';

const NewSearch = () => {

	const {searchHistory, setSearchHistory} = useSearchHistory();
	const [selectedOption, setSelectedOption] = useState(0);

	const [dragActive, setDragActive] = React.useState(false);
	const [textArea, setTextArea] = useState("");
	const [link, setLink] = useState("");
	const [prompt, setPrompt] = useState("");
	const [loading, setLoading] = useState(false);
  
	// handle drag events
	const handleDrag = function(e) {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
		setDragActive(true);
		} else if (e.type === "dragleave") {
		setDragActive(false);
		}
	};

	const handleDrop = function(e) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
		// at least one file has been dropped so do something
		// handleFiles(e.dataTransfer.files);
		}
	};

	const changeTextArea = (e) => {
		setTextArea(e.target.value);
	}

	const changeLink = (e) => {
		setLink(e.target.value);
	}

	const submitText = async () => {
		setLoading(true);
		const response = await fetch("http://localhost:105/text-api", {
			method: "POST",
			mode: "cors",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: textArea
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
				text: textArea,
				type: "text"
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
	}

	const toembed = (link) => {
		const right = link.split("?v=")[1];
		const vidid = right.split("&")[0];
		const embed = "https://www.youtube.com/embed/"+vidid+"?si=VdjDmCgfDPq3EoFc";
		console.log(embed)
		return embed;
	}

	const submitLink = async () => {
		setLoading(true);
		if(link.match('youtu')) {
			const response = await fetch("http://localhost:105/youtube-api", {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					link: link
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
					link: toembed(link),
					type: "video"
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
		} else {
			const response = await fetch("http://localhost:105/webpage-api", {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					link: link
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
					link: link,
					type: "link"
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
		}
	}

	const changePrompt = e => {
		setPrompt(e.target.value);
	}

	const submitPrompt = async () => {
		setLoading(true)
		const response = await fetch("http://localhost:105/google-search-api", {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					google_search: prompt
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
	}

	return (
		<div className="container-center newsearch-container">
			{loading && <h2>Loading...</h2>}
			{loading || <><h2>Begin a search</h2>
			<br />
			<div className="searchbar inputbar searchbar-other">
				<div className="input-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
				<input placeholder="What's on your mind..." value={prompt} onChange={changePrompt}/>
				<button className="btn"  onClick={submitPrompt}>Search</button>
			</div>
			<span className="orDiv">or</span>
			<div className="search-options">
				<div onClick={()=>setSelectedOption(0)} className={`search-option-tile ${selectedOption==0?'active':''}`}>
					Upload a PDF
				</div>
				<div onClick={()=>setSelectedOption(1)} className={`search-option-tile ${selectedOption==1?'active':''}`}>
					Link to an article or video
				</div>
				<div onClick={()=>setSelectedOption(2)} className={`search-option-tile ${selectedOption==2?'active':''}`}>
					Copy and paste text
				</div>
			</div>
			{selectedOption == 0 && <>
				<DragDropFile />
			</>}
			{selectedOption == 1 && <>
				<br />
				<div className="linksearch inputbar searchbar-other">
					<div className="input-icon"><i className="fa-solid fa-link"></i></div>
					<input onChange={changeLink} value={link} placeholder="Enter a link to an article or a youtube video..."/>
					<button onClick={submitLink} className="button-other">Search</button>
				</div>
			</>}
			{selectedOption == 2 && <>
				<br />
				<textarea className="textsearch" placeholder="Copy &amp; Paste your text into here" onChange={changeTextArea} value={textArea}></textarea>
				<button onClick={submitText} className="full-width">Search this text</button>
			</>}
			</>}
		</div>
	);
};

export default NewSearch