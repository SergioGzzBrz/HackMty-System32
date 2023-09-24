const PDFViewer = ({pdfURL}) => {

	return (
		<>
			<iframe title="PDF Viewer" className="pdf-viewer" src={pdfURL + "#toolbar=0&navpanes=0"} frameBorder="0"/>
		</>
	)

}

export default PDFViewer;