import useSearchHistory from '../../hooks/useSearchHistory';

const Topics = () => {

	const {getSelected} = useSearchHistory();

	return (
		<ul className="topics">
			{getSelected().topics.map((topic, i) => (
				<li key={i}>
					<h3>{topic.title}</h3>
					<p>{topic.desc}</p>
				</li>
			))}
		</ul>
	);
}

export default Topics;