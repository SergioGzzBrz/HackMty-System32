import React, {useContext, useState} from 'react';

import { getDatabase, set, ref } from 'firebase/database';

const SearchHistoryContext = React.createContext('search-history');
export const SearchHistoryProvider = ({children, username}) => {
	const [searchHistory, setSearchHistory] = useState(undefined);

	const getSelected = () => {
		return searchHistory.searches[searchHistory.selected];
	}

	const updateSearchHistory = (data) => {
		setSearchHistory(data);
		// const db = getDatabase();
		// set(ref(db, 'users/' + username), {searches: data.searches});
	}

	return (
		<SearchHistoryContext.Provider value={{searchHistory, setSearchHistory:updateSearchHistory, getSelected}}>
			{children}
		</SearchHistoryContext.Provider>
	)
}

const useSearchHistory = () => {
	const searchHistory = useContext(SearchHistoryContext);
	return searchHistory;
}

export default useSearchHistory;