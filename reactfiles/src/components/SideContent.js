import {useState} from 'react';

import SideContentSidebar from './SideContentSidebar'

const SideContent = () => {

	const [selectedTab, setSelectedTab] = useState({
		title: 'Keywords'
	});

	return (
		<div className="side-content">
			<div className="content">
				<h2 className="subtitle">{selectedTab.title}</h2>
				<div className="side-content-container">
					<div className="side-content-body">
						<ul>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
							<li>Cosa</li>
						</ul>
					</div>
				</div>
			</div>
			<SideContentSidebar setSelectedTab={setSelectedTab}/>
		</div>
	)
}

export default SideContent;