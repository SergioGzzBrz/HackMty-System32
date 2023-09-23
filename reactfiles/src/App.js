import DocumentSidebar from './components/DocumentSidebar'
import MainDocument from './components/MainDocument'
import SideContent from './components/SideContent'

const App = () => {
  return (
    <div className="App">
		<div className="app-container">
			<DocumentSidebar />
			<MainDocument />
			<SideContent />
		</div>
    </div>
  );
}

export default App;
