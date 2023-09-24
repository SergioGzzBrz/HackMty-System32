import React, {useContext, useState} from 'react';

const SearchHistoryContext = React.createContext('search-history');
export const SearchHistoryProvider = ({children}) => {
	const [searchHistory, setSearchHistory] = useState({
		searches: [
			{title: "Search 1", summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat elementum mi et condimentum. Vivamus ac est lectus. Nulla viverra eros ac sem scelerisque finibus. Pellentesque pellentesque pulvinar urna, a tristique quam euismod ac. Aliquam sodales ex neque, sit amet accumsan leo sodales sed. Nullam scelerisque lacinia sapien. Vivamus lacinia neque vel placerat malesuada. Suspendisse eu laoreet mi, eu viverra libero. Proin dui diam, faucibus fringilla mi vitae, pulvinar rutrum velit. Etiam sed dignissim lorem. Nam viverra tellus sed magna accumsan posuere.\nDuis lacus nisi, sollicitudin vitae erat vitae, sagittis rhoncus nisi. Morbi mattis ex lacus, id aliquam risus tincidunt at. Nullam lacinia risus ac ligula euismod varius. Aenean non fringilla augue. Pellentesque ultrices et purus in posuere. Suspendisse eu condimentum nisl. Vivamus eu ligula est. Phasellus ligula nisl, aliquam sit amet arcu vitae, mattis pharetra velit. Phasellus imperdiet quam vitae felis blandit maximus. Curabitur feugiat tellus ex, sit amet vulputate ipsum consequat ut.\nPraesent mattis metus tellus, sit amet convallis tellus vulputate a. Pellentesque ullamcorper nulla ac congue malesuada. Maecenas vel metus pulvinar, eleifend sapien ut, viverra massa. Nulla facilisi. Fusce a eros gravida, aliquet tellus viverra, lobortis purus. Nulla urna massa, lacinia nec tellus ac, ultricies placerat neque. Etiam nec ipsum quis nisi semper suscipit non id purus. Nullam ornare in lectus non dignissim. Maecenas quis dapibus augue. Maecenas dui justo, consectetur et urna non, placerat sollicitudin diam.\nAenean vitae consequat tellus, a pretium est. Nunc cursus nibh vitae sapien aliquam, in tempus leo tempus. Morbi egestas massa nec enim rutrum, vitae varius sem tristique. In feugiat tristique felis, et sollicitudin dolor fermentum sed. Sed dignissim ex quis lacinia convallis. In id dui tortor. Sed maximus efficitur ipsum eu malesuada. Ut volutpat convallis nunc. Aenean eu elementum leo.\nSed luctus velit quis dui tempus, et ullamcorper dolor elementum. Proin volutpat velit vitae metus consequat, vitae hendrerit dui posuere. Vivamus porta risus nisi, scelerisque auctor turpis euismod sit amet. Nullam purus lectus, dapibus vitae pretium at, pulvinar in ex. Etiam lectus lacus, convallis eget scelerisque in, fringilla sit amet urna. Proin vel lectus sit amet ante sollicitudin mollis ut et sem. Pellentesque vel hendrerit magna. Duis viverra enim ligula, sed commodo magna fringilla id.", keywords: ['ChatGPT', 'Artificial Intelligence', 'Training Models', 'Training Models', 'Training Models', 'Training Models'], topics: [{title:'Climate Change',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec mattis nisi. Aenean sed eleifend ex. Suspendisse placerat ante in odio consequat, nec fringilla nibh luctus. In et mi pharetra, finibus ligula a, venenatis leo.'}], links: ['https://es.wikipedia.org/wiki/Otro_(filosof%C3%ADa)','https://es.wikipedia.org/wiki/Otro_(filosof%C3%ADa)'], full: {type:'link', link:'https://en.wikipedia.org/wiki/ALGO'}, notes: 'A\nA\nA', questions: [{type:'gpt', msg:'Hello! Have a question? Feel free to ask me and I\'ll do my best to answer.'},{type:'sent', msg:'What does this mean?'}]},
			{title: "Search 2", summary: "search2 summary", keywords: [], topics: [], links: [], full: {type: 'pdf', pdfPath: 'file.pdf'}},
			{title: "Search 3", summary: "search3 summary", keywords: [], topics: [], links: [], full: {type: 'video', link: 'https://www.youtube.com/embed/-CQatuQdQv4?si=JYOIjabC00sBic6n'}},
			{title: "Search 4", summary: "search4 summary", keywords: [], topics: [], links: [], full: {type: 'text', text: 'this\nis\nthe\nfull\ntext\nis\nthe\nfull\ntext\nis\nthe\nfull\ntext\nis\nthe\nfull\ntext\nis\nthe\nfull\ntext\nis\nthe\nfull\ntext'}}
		],
		selected: 0,
		creating: false
	});

	const getSelected = () => {
		return searchHistory.searches[searchHistory.selected];
	}

	return (
		<SearchHistoryContext.Provider value={{searchHistory, setSearchHistory, getSelected}}>
			{children}
		</SearchHistoryContext.Provider>
	)
}

const useSearchHistory = () => {
	const searchHistory = useContext(SearchHistoryContext);
	return searchHistory;
}

export default useSearchHistory;