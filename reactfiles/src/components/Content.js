import useSearchHistory from '../hooks/useSearchHistory';
import MainDocument from './MainDocument'
import NewSearch from './NewSearch';
import SideContent from './SideContent'

const Content = () => {

	const {searchHistory} = useSearchHistory();

	return (
		<>
		{searchHistory.creating || <>
			<MainDocument />
			<SideContent />
		</>}
		{searchHistory.creating && <>
			<NewSearch />
		</>}
		</>
	)
}

export default Content;