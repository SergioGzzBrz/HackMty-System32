import useSearchHistory from '../../hooks/useSearchHistory';

const Notes = () => {

	const {getSelected} = useSearchHistory();

	const divideIntoParagraphs = () => {
		const text = getSelected().notes;
		return text.split('\n');
	}

	return (
		<>
			{divideIntoParagraphs().map((para, i) => (
				<p key={i}>{para}</p>
			))}
		</>
	);
}

export default Notes;