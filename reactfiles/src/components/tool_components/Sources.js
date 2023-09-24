import useSearchHistory from '../../hooks/useSearchHistory';

const Sources = () => {

	const {getSelected} = useSearchHistory();

	// const submitLink = async () => {
	// 	setLoading(true);
	// 	if(link.match('youtu')) {
	// 		const response = await fetch("http://localhost:105/youtube-api", {
	// 			method: "POST",
	// 			mode: "cors",
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				link: link
	// 			})
	// 		});
	// 		const json = await response.json();
	// 		const newsearch = {
	// 			title: json.title,
	// 			summary: json.summary,
	// 			keywords: json.keywords,
	// 			topics: json.topics,
	// 			links: json.links,
	// 			questions: [],
	// 			notes: "",
	// 			full: {
	// 				link: toembed(link),
	// 				type: "video"
	// 			}
	// 		};
	// 		setSearchHistory(() => {
	// 			return {
	// 				searches: [
	// 					...searchHistory.searches,
	// 					newsearch
	// 				],
	// 				selected: searchHistory.searches.length,
	// 				creating: false,
	// 			}
	// 		})
	// 	} else {
	// 		const response = await fetch("http://localhost:105/webpage-api", {
	// 			method: "POST",
	// 			mode: "cors",
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({
	// 				link: link
	// 			})
	// 		});
	// 		const json = await response.json();
	// 		const newsearch = {
	// 			title: json.title,
	// 			summary: json.summary,
	// 			keywords: json.keywords,
	// 			topics: json.topics,
	// 			links: json.links,
	// 			questions: [],
	// 			notes: "",
	// 			full: {
	// 				link: link,
	// 				type: "link"
	// 			}
	// 		};
	// 		setSearchHistory(() => {
	// 			return {
	// 				searches: [
	// 					...searchHistory.searches,
	// 					newsearch
	// 				],
	// 				selected: searchHistory.searches.length,
	// 				creating: false,
	// 			}
	// 		})
	// 	}
	// }

	// const linkClick = link => {

	// }

	return (<>
	<p>Further your research with relevant sources:</p><br />
	<ul className="linked-sources">
		{getSelected().links.map((link, i) => (
			<li key={i}><p className="linked-source">{link}</p></li>
		))}
	</ul></>);
}

export default Sources;