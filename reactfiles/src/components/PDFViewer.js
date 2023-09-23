const PDFViewer = ({pdfURL}) => {

	return (
		<div>
			<iframe src={pdfURL}/>
		</div>
	)

}

export default PDFViewer;