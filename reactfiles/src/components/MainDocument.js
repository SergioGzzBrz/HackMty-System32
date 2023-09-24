import {useState} from 'react';
import useSearchHistory from '../hooks/useSearchHistory';
import FullViewer from './FullViewer';

import PDFViewer from './PDFViewer';

const MainDocument = () => {

	const [fullDocumentView, setFullDocumentView] = useState(false);
	const {getSelected} = useSearchHistory();

	const divideIntoParagraphs = () => {
		const summary = getSelected().summary;
		return summary.split('\n');
	}

	const buttonText = () => {
		switch (getSelected().full.type) {
			case 'link':
				return "Full Article";
			case 'pdf':
				return "Full Document";
			case 'video':
				return "Full Video";
			case 'text':
				return "Full Text";
		}
	}

	return (
		<div className="main-document">
			<div className="toolbar">
				{getSelected().full.type == "search" || <button className={fullDocumentView ? 'clicked' : ''} onClick={() => setFullDocumentView(prev => !prev)}><i className="fa-regular fa-file"></i> {buttonText()}</button>}
			</div>
			<div className="document-view">
				{fullDocumentView 
					? <FullViewer />
					: <>
						<div className='subtitle-bar'>Summary</div>
						<div className="text-viewer">
							{divideIntoParagraphs().map((para, i) => (<>
								<p key={i} className={`summary-para`}>{para}</p></>
							))}
					</div></>
				}
			</div>
		</div>
	);
};

export default MainDocument;