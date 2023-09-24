import useSearchHistory from '../../hooks/useSearchHistory';

const Sources = () => {

	const {getSelected} = useSearchHistory();

	return (<>
	<p>Further your research with relevant sources:</p><br />
	<ul className="linked-sources">
		{getSelected().links.map((link, i) => (
			<li key={i}><p className="linked-source">{link}</p></li>
		))}
	</ul></>);
}

export default Sources;