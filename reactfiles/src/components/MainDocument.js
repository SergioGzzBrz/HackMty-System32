import {useState} from 'react';

import PDFViewer from './PDFViewer';

const MainDocument = () => {

	const [fullDocumentView, setFullDocumentView] = useState(false);

	return (
		<div className="main-document">
			<div className="toolbar">
				<button className={fullDocumentView ? 'clicked' : ''} onClick={() => setFullDocumentView(prev => !prev)}><i class="fa-regular fa-file"></i> Full Document</button>
			</div>
			<div className="document-view">
				{fullDocumentView 
					? <PDFViewer pdfURL="file.pdf"/>
					: <div className="text-viewer">
						<h2>Summary</h2>
						<br />
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec mattis nisi. Aenean sed eleifend ex. Suspendisse placerat ante in odio consequat, nec fringilla nibh luctus. In et mi pharetra, finibus ligula a, venenatis leo. Aenean leo elit, volutpat quis arcu in, pharetra feugiat leo. Etiam pharetra massa et viverra semper. Sed ut pharetra elit, vitae egestas lorem. Morbi cursus pulvinar nisl, mollis tempor tellus fermentum non. Ut interdum nulla sit amet lobortis viverra. Sed faucibus imperdiet pulvinar. Aenean a augue massa. Cras et nibh pellentesque, imperdiet nunc at, interdum neque. Sed mollis mollis venenatis. Mauris feugiat hendrerit tincidunt. Duis dignissim, ante id sagittis fringilla, sapien dui laoreet odio, et elementum arcu nibh nec ex. Aliquam mattis, dolor eget ultrices pellentesque, dui justo scelerisque nunc, in ullamcorper ligula massa ac elit.
							<br />
							<br />
							Nunc eu maximus nulla. Fusce quis fringilla ante, vitae sollicitudin arcu. Duis convallis tellus vitae ultricies accumsan. Maecenas aliquet felis nec porttitor posuere. Etiam at dolor sit amet eros semper aliquet viverra convallis orci. Aliquam volutpat massa eget euismod iaculis. Aliquam ultricies sapien velit, ac feugiat dui fringilla id. Fusce augue mauris, vulputate vitae ultricies vel, dignissim et sem. Donec rhoncus scelerisque blandit. In quis interdum ante, sit amet sollicitudin augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque purus elit, condimentum et tortor a, fermentum efficitur dui. Nam a dolor eleifend, pretium nisl et, bibendum lacus. Praesent auctor, magna ac fermentum dignissim, nisi arcu lacinia lacus, eu venenatis augue diam vel lacus. Sed pellentesque viverra eros, id lobortis leo pharetra vel.
							<br />
							<br />
							Vivamus cursus, velit ac finibus tristique, quam eros molestie odio, vel venenatis orci mi vel elit. Aliquam cursus sem ipsum, id rutrum libero vulputate vitae. Donec feugiat risus id lorem imperdiet, ac mattis orci lacinia. Etiam consequat mi sit amet dolor fermentum dictum. Nullam mollis est non risus tempor pharetra. Donec porttitor sit amet nulla ac aliquam. Nulla leo erat, placerat vitae mi quis, pretium interdum est. Nullam vestibulum arcu magna, vitae rhoncus ante ultricies eget. In urna metus, laoreet vel massa vel, auctor molestie ante. Ut vel bibendum nisi. Fusce at nibh at nibh sagittis gravida vitae sed est. Ut pharetra lorem semper mauris interdum auctor. Curabitur rutrum velit id elit venenatis tempus. Aliquam pharetra scelerisque magna, eu rhoncus ipsum efficitur pretium.
							<br />
							<br />
							Aliquam feugiat vitae elit laoreet malesuada. In rutrum viverra consequat. Mauris venenatis lacus vestibulum ante facilisis, non tempor tellus tempor. Etiam sit amet malesuada magna. Morbi tempor vulputate iaculis. Morbi a sapien dignissim, gravida purus eu, laoreet turpis. Nullam sodales magna at est pellentesque, ut scelerisque nisl rutrum. Mauris gravida semper laoreet. Nulla facilisi.
							<br />
							<br />
							Aliquam ac odio sit amet turpis lacinia aliquam. Fusce tempor sodales aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu pretium justo. Vestibulum id eleifend nisi. Phasellus posuere tortor pellentesque mi imperdiet, non pharetra libero sodales. Proin condimentum, quam eget venenatis ultricies, sem elit finibus ante, eu rutrum sapien dolor a ipsum. Quisque at posuere arcu, ullamcorper tristique libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in velit vestibulum nisl porta rutrum. Praesent mauris sem, aliquam eu ultrices a, mattis ut ante. Fusce fringilla metus sit amet convallis fermentum. Integer a odio lectus. Praesent ultrices neque condimentum volutpat commodo.
						</p>
					</div>
				}
			</div>
		</div>
	);
};

export default MainDocument;