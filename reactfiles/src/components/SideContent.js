import {useState} from 'react';

import SideContentSidebar from './SideContentSidebar'
import Keywords from './tool_components/Keywords';

const SideContent = () => {

	const [selectedTab, setSelectedTab] = useState({
		title: 'Keywords',
		icon: 'fa-solid fa-book-open',
		element: <Keywords />
	});

	return (
		<div className="side-content">
			<div className="content">
				<h2 className="subtitle">{selectedTab.title}</h2>
				<div className="side-content-container">
					<div className="side-content-body">
						{selectedTab.element}
					</div>
				</div>
			</div>
			<SideContentSidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
		</div>
	)
}

export default SideContent;