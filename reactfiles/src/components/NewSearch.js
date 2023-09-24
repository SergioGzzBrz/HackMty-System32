import React, { useState } from 'react';
import DragDropFile from './DragDropFile';

const NewSearch = () => {

	const [selectedOption, setSelectedOption] = useState(0);

	const [dragActive, setDragActive] = React.useState(false);
  
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
				{/* <form id="dragdrop-file" onDragEnter={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
					<input type="file" id="input-file-upload" multiple={false} accept=".pdf"/>
					<label for="input-file-upload">
						<div className="dragdrop">
							<i className="fa-solid fa-file-arrow-up"></i>
							<p className="bigger">Drag and drop a PDF</p>
							<p className="smaller">Or click to select a file from your device</p>
						</div>
					</label>
				</form> */}
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
				<textarea className="textsearch" placeholder="Copy &amp; Paste your text into here"></textarea>
				<button className="full-width">Search this text</button>
			</>}

		</div>
	);
};

export default NewSearch;