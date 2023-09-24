import React, { useState, useRef } from 'react';
import pdfjsLib from 'pdfjs-dist';


const DragDropFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handlePdfFile(file);
    }
  };

  const handleChange = async function(e) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handlePdfFile(file);
    }
  };

  const handlePdfFile = async function(file) {
    const reader = new FileReader();
    reader.onload = async function(event) {
      const arrayBuffer = event.target.result;

      try {
        // Load the PDF file
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        // Initialize a variable to store the text content
        let pdfText = '';

        // Iterate through each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();

          // Extract text content from the page
          const pageText = textContent.items.map(item => item.str).join(' ');

          // Append the page text to the variable
          pdfText += pageText + '\n';
        }

        // Do something with the extracted text (e.g., set it in state)
        // For example, you can use useState to store the text content
        // and display it in your component.

        // Example:
        // setText(pdfText);
        console.log(pdfText);
      } catch (error) {
        console.error("Error parsing PDF:", error);
      }
    };

    reader.readAsArrayBuffer(file);
  };

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
