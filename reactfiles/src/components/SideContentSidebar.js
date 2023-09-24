import SideContentOption from './SideContentOption';

import Keywords from './tool_components/Keywords';
import Notes from './tool_components/Notes';
import Questions from './tool_components/Questions';
import Sources from './tool_components/Sources';
import Topics from './tool_components/Topics';

const SideContentSidebar = ({setSelectedTab, selectedTab}) => {

	const tabs = [
		{title: 'Keywords', icon: 'fa-solid fa-book-open', element: <Keywords />},
		{title: 'Topics', icon: 'fa-solid fa-book', element: <Topics />},
		{title: 'Questions', icon: 'fa-solid fa-circle-question', element: <Questions />},
		{title: 'Explore sources', icon: 'fa-solid fa-link', element: <Sources />},
		{title: 'Notes', icon: 'fa-solid fa-note-sticky', element: <Notes />},
	]

	return (
		<div className="side-content-sidebar">
			<ul className="menu">
				{tabs.map(tab => {
					return <SideContentOption tab={tab} setSelectedTab={setSelectedTab} active={selectedTab.title==tab.title}/>
				})}
			</ul>
		</div>
	);

};

export default SideContentSidebar;