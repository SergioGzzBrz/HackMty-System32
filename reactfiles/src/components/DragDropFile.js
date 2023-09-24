import React, {useState} from 'react';

// drag drop file component
const DragDropFile = () => {
	// drag state
	const [dragActive, setDragActive] = React.useState(false);
	// ref
	const inputRef = React.useRef(null);
	
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
	
	// triggers when file is dropped
	const handleDrop = function(e) {
	  e.preventDefault();
	  e.stopPropagation();
	  setDragActive(false);
	  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
		// handleFiles(e.dataTransfer.files);
	  }
	};
	
	// triggers when file is selected with click
	const handleChange = function(e) {
	  e.preventDefault();
	  if (e.target.files && e.target.files[0]) {
		// handleFiles(e.target.files);
	  }
	};
	
  // triggers the input when the button is clicked
	const onButtonClick = () => {
	  inputRef.current.click();
	};
	
	return (
	  <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
		<input ref={inputRef} type="file" id="input-file-upload" multiple={false} accept=".pdf" onChange={handleChange} />
		<label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
		  <div>
			<i className="fa-solid fa-file-arrow-up"></i>
			<p className="bigger">Drag and drop your PDF here</p>
			<button className="upload-button" onClick={onButtonClick}>Or click here</button>
		  </div> 
		</label>
		{ dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
	  </form>
	);
  };

  export default DragDropFile;