import useSearchHistory from '../../hooks/useSearchHistory';

const Topics = () => {

	const {getSelected} = useSearchHistory();

	const divideIntoParagraphs = () => {
		const summary = getSelected().topics;
		return summary.split('\n');
	}

	return (
		<ul className="topics">
			{/* {getSelected().topics.map((topic, i) => (
				<li key={i}>
					<h3>{topic.title}</h3>
					<p>{topic.desc}</p>
				</li>
			))} */}
			{divideIntoParagraphs().map((para, i) => (
				<p key={i} className={`summary-para`}>{para}</p>
			))}
		</ul>
	);
}

export default Topics;