import { useState } from 'react';
import SearchBar from './SearchBar';

const NewSearch = () => {

	const [selectedOption, setSelectedOption] = useState(0);

	return (
		<div className="container-center newsearch-container">
			<h2>Begin a search</h2>
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
				<div className="dragdrop">
					<i className="fa-solid fa-file-arrow-up"></i>
					<p className="bigger">Drag and drop a PDF</p>
					<p className="smaller">Or click to select a file from your device</p>
				</div>
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
				<textarea className="textsearch" placeholder="Copy &amp; Paste your text into here"></textarea>
				<button className="full-width">Search this text</button>
			</>}

		</div>
	);
};

export default NewSearch;