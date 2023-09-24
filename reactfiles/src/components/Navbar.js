import SearchBar from './SearchBar';

const Navbar = () => {
	return (
		<nav>
			<div className="left">
				<h2 className="brand">FRIDA</h2>
				<SearchBar />
			</div>
			<div className="right">
				<a href="#">About us</a>
				<div className="user">
					<a href="#">Sign out</a>
					<i className="fa-solid fa-circle-user" />
				</div>
			</div>
		</nav>
	)
}

export default Navbar;