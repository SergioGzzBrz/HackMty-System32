const SideContentSidebar = ({setSelectedTab}) => {

	return (
		<div className="side-content-sidebar">
			<ul className="menu">
				<li data-tooltip="Keywords" className="side-content-tab"><i class="fa-solid fa-book-open"></i></li>
				<li data-tooltip="Citations" className="side-content-tab"><i class="fa-solid fa-book-open"></i></li>
				<li data-tooltip="More resources" className="side-content-tab"><i class="fa-solid fa-book-open"></i></li>
			</ul>
		</div>
	);

};

export default SideContentSidebar;