import useSearchHistory from '../hooks/useSearchHistory';

const DocumentSidebar = () => {

	const {searchHistory, setSearchHistory} = useSearchHistory();

	const click = i => {
		setSearchHistory({...searchHistory, selected: i, creating: false});
	}

	const newSearch = () => {
		setSearchHistory({
			...searchHistory,
			creating: true,
			selected: -1
		});
	}

	return (
		<div className="document-sidebar">
			<h2>Searches</h2>
			<ul className="document-list">
				{searchHistory?.searches?.map((search, i) => {
					return <li onClick={() => click(i)} key={i} className={`search-option ${searchHistory.selected == i ? 'active' : ''}`}>{search.title}</li>
				})}
				<li onClick={newSearch} className={`search-option new-search ${searchHistory.creating ? 'active' : ''}`}>New Search &nbsp;<i className="fa-solid fa-add"></i></li>
			</ul>
		</div>
	);
}

export default DocumentSidebar;