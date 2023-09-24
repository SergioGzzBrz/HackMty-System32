import { useEffect, useState } from 'react';
import useSearchHistory from '../../hooks/useSearchHistory';

const Notes = () => {

	const {getSelected, searchHistory, setSearchHistory} = useSearchHistory();
	const [notes, setNotes] = useState("");

	const onChange = (e) => {
		setNotes(e.target.value);
	}

	return (
		<>
			<textarea value={notes} onChange={onChange} className="note-editor" placeholder="Write your notes here"></textarea>
		</>
	);
}

export default Notes;