const SearchBar = () => {
	return (
		<div className="searchbar inputbar">
			<div className="input-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
			<input placeholder="Start a search..."/>
			<button className="btn">Search</button>
		</div>
	)
}

export default SearchBar;