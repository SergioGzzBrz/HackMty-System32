import SearchBar from './SearchBar';

const Navbar = ({logged, setLogged}) => {
	return (
		<nav>
			<div className="left">
				<h2 className="brand">cerebrAI</h2>
				{logged && <SearchBar />}
			</div>
			<div className="right">
				<a href="#">About us</a>
				<div className="user">
					{logged && <><a href="#" onClick={() => setLogged(false)}>Sign out</a>
					<i className="fa-solid fa-circle-user" /></>}
				</div>
			</div>
		</nav>
	)
}

export default Navbar;