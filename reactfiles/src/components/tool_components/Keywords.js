import useSearchHistory from '../../hooks/useSearchHistory';

const Keywords = () => {

	const {getSelected} = useSearchHistory();

	return (
		<>
			<ul className="keywords">
				{getSelected().keywords.map((word, i) => (
					<li key={i}>{word}</li>
				))}
			</ul>
		</>
	);
}

export default Keywords;