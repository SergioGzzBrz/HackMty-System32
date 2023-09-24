import DocumentSidebar from './components/DocumentSidebar'
import MainDocument from './components/MainDocument'
import SideContent from './components/SideContent'

const App = () => {

  fetch(encodeURI('http://127.0.0.1:8000/process-text-api?text=this is a sample text that has this words this this words words sample'))
	.then(res => {
		console.log(res);
	});

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
