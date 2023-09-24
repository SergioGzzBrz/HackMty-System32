import { useState } from 'react';
import useSearchHistory from '../../hooks/useSearchHistory';

const Keywords = () => {

	const {getSelected} = useSearchHistory();
	const [seeMore, setSeeMore] = useState(false);

	const getKeywords = () => {
		if(seeMore) {
			return getSelected().keywords;
		} else {
			return getSelected().keywords.slice(0, 3);
		}
	}

	return (
		<>
			<ul className="keywords">
				{getKeywords().map((word, i) => (
					<li key={i}>{word}</li>
				))}
			</ul>
			{seeMore ||
			<button onClick={() => setSeeMore(true)} className="showall">Show all</button>}
		</>
	);
}

export default Keywords;