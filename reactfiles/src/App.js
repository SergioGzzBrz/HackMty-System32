import DocumentSidebar from './components/DocumentSidebar'
import Content from './components/Content'
import Navbar from './components/Navbar'
import { SearchHistoryProvider } from './hooks/useSearchHistory';
import MainDocument from './components/MainDocument'
import SideContent from './components/SideContent'

import { useEffect, useState } from 'react'

const App = () => {	

	const [res, setRes] = useState();

	const text = `El avión roquero (Ptyonoprogne rupestris) es una especie de ave que pertenece a la familia de los aviones y golondrinas. Mide alrededor de 14 cm de largo y tiene un plumaje de color marrón ceniza en la parte superior y más claro en la parte inferior. Su cola es corta y cuadrada, con manchas blancas en las plumas. Esta especie habita en las montañas del sur de Europa, el noroeste de África y el sur de Asia. Aunque se pueden confundir con otras especies similares, el avión roquero es de mayor tamaño, tiene manchas más notorias en la cola y su plumaje es de tono diferente.  La mayoría de los ejemplares en Europa son residentes, pero las poblaciones más al norte y en Asia son migratorias.
	Durante el invierno, migran hacia el norte de África, el Medio Oriente o la India. El avión roquero construye su nido en acantilados o en estructuras hechas por el hombre. El nido es de forma de media taza y está hecho de barro, con una capa interna suave de plumas y pasto seco. Por lo general, los nidos son individuales, aunque algunas parejas pueden anidar cerca una de la otra. La hembra pone de dos a cinco huevos blancos con manchas marrones, y tanto el macho como la hembra se encargan de incubarlos y alimentar a los polluelos. Esta especie se alimenta principalmente de insectos que captura en vuelo, cerca de las paredes de los acantilados o en prados alpinos. El avión roquero es presa de aves de presa y córvidos, y también alberga ácaros que se alimentan de su sangre. Afortunadamente, debido a su gran área de distribución y su población numerosa, no se considera una especie en peligro de extinción.
	
	`;

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:105/text-api", {
				method: "POST",
				mode: "cors",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"text": text
				})
			}); 
			const jsons = await response.json();
			setRes(jsons);
		}
		fetchData();
	}, []);

	useEffect(() => {
		console.log(res);
	}, [res])
	
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
