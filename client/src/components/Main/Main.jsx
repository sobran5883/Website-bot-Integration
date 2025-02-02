

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="">
			<nav className="">
				<h1>fakebook</h1>
				<button className="" onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};

export default Main;