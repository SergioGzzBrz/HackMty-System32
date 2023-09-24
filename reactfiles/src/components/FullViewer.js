import useSearchHistory from '../hooks/useSearchHistory';
import PDFViewer from './PDFViewer';

const FullViewer = () => {

	const {getSelected} = useSearchHistory();

	const divideIntoParagraphs = () => {
		const text = getSelected().full.text;
		return text.split('\n');
	}

	return (
		<>
			{getSelected().full.type == 'link' && <>
				<iframe title="Link Viewer" className="pdf-viewer" src={getSelected().full.link} frameBorder="0" />
			</>}
			{getSelected().full.type == 'pdf' && <>
				<PDFViewer pdfURL={getSelected().full.pdfPath}/>
			</>}
			{getSelected().full.type == 'video' && <>
				<iframe className="video-viewer" src={getSelected().full.link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
			</>}
			{getSelected().full.type == 'text' && <>
				<div className="full-text-viewer">
					{divideIntoParagraphs().map((para, i) => (
						<p key={i} className="summary-para">{para}</p>
					))}
				</div>
			</>}
		</>
	);
};

export default FullViewer;