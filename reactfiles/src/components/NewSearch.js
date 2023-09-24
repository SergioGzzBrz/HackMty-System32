import React, { useState } from 'react';
import useSearchHistory from '../hooks/useSearchHistory';
import DragDropFile from './DragDropFile';

const NewSearch = () => {

	const {searchHistory, setSearchHistory} = useSearchHistory();
	const [selectedOption, setSelectedOption] = useState(0);

	const [dragActive, setDragActive] = React.useState(false);
	const [textArea, setTextArea] = useState("");
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
			questions: [],
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

	return (
		<div className="container-center newsearch-container">
			{loading && <h2>Loading...</h2>}
			{loading || <><h2>Begin a search</h2>
			<br />
			<div className="searchbar inputbar searchbar-other">
				<div className="input-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
				<input placeholder="What's on your mind..."/>
				<button className="btn">Search</button>
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
					<input placeholder="Enter a link to an article or a youtube video..."/>
					<button className="button-other">Search</button>
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

export default NewSearch;