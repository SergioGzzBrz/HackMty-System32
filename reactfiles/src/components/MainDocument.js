import PDFViewer from './PDFViewer';

const MainDocument = () => {
	return (
		<div className="main-document">
			<div className="toolbox">
				<button>See Full Document</button>
			</div>
			<div className="document-view">
				<PDFViewer pdfURL="file.pdf"/>
			</div>
		</div>
	);
};

export default MainDocument;