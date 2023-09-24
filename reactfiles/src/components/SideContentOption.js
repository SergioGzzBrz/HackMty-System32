const SideContentOption = ({tab, setSelectedTab, active}) => {
	return (
		<li onClick={() => setSelectedTab(tab)} data-tooltip={tab.title} className={`side-content-tab ${active?'active':''}`}>
				<i className={tab.icon}></i>
		</li>
	)
}

export default SideContentOption;