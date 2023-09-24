import React, {useContext, useState} from 'react';

const SearchHistoryContext = React.createContext('search-history');
export const SearchHistoryProvider = ({children}) => {
	const [searchHistory, setSearchHistory] = useState({
		searches: [
			{title: "Search 1", summary: "search1\n summary", keywords: ['ChatGPT', 'Artificial Intelligence', 'Training Models', 'Training Models', 'Training Models', 'Training Models'], topics: [{title:'Climate Change',desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec mattis nisi. Aenean sed eleifend ex. Suspendisse placerat ante in odio consequat, nec fringilla nibh luctus. In et mi pharetra, finibus ligula a, venenatis leo.'}], links: ['https://es.wikipedia.org/wiki/Otro_(filosof%C3%ADa)','https://es.wikipedia.org/wiki/Otro_(filosof%C3%ADa)'], full: {type:'link', link:'https://en.wikipedia.org/wiki/ALGO'}, notes: 'A\nA\nA', questions: [{type:'gpt', msg:'Hello! Have a question? Feel free to ask me and I\'ll do my best to answer.'},{type:'sent', msg:'What does this mean?'}]},
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