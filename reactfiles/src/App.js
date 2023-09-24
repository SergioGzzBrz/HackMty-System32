import DocumentSidebar from './components/DocumentSidebar'
import Content from './components/Content'
import Navbar from './components/Navbar'
import { SearchHistoryProvider } from './hooks/useSearchHistory';

const App = () => {	
  return (
	<SearchHistoryProvider>
		<div className="app">
			<Navbar />
			<div className="app-container">
				<DocumentSidebar />
				<Content />
			</div>
		</div>
	</SearchHistoryProvider>
  );
}

export default App;
