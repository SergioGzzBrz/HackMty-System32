import { useState } from 'react';
import useSearchHistory from '../../hooks/useSearchHistory';

const Questions = () => {

	const {getSelected, setSearchHistory, searchHistory} = useSearchHistory();
	const [question, setQuestion] = useState("");
	const [loading, setLoading] = useState(false);

	const changeQuestion = (e) => {
		setQuestion(e.target.value);
	}

	const keydown = async (e) => {
		if(e.keyCode == 13) {
			setLoading(true);
			setQuestion("");
			setSearchHistory(() => {
				const search = getSelected();
				search.questions.push({"type":"user","msg":question});
				searchHistory.searches[searchHistory.selected] = search;
				return {
					searches: searchHistory.searches,
					selected: searchHistory.selected,
					creating: false,
				}
			})
			const response = await fetch("http://localhost:105/question-api", {
				method: "POST",
				mode: "cors",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					question: "using this text, answer my question: " + getSelected().summary + "." + question
				})
			});
			const json = await response.json();
			const answer = json.answer;
			setSearchHistory(() => {
				const search = getSelected();
				search.questions.push({"type":"gpt","msg":answer});
				searchHistory.searches[searchHistory.selected] = search;
				return {
					searches: searchHistory.searches,
					selected: searchHistory.selected,
					creating: false,
				}
			})
			setLoading(false);
		}
	}

	return (<>
		<p>Ask for further information about the paper</p>
		<div className="chat-container">
			<div className="chat-bubbles">
				{getSelected().questions.map((question, i) => (
					<p key={i} className={`chat-bubble ${question.type == 'gpt' ? 'gpt-response' : ''}`}>
						{question.msg}
					</p>
				))}
				{loading && <p className={`chat-bubble gpt-response`}>...</p>}
			</div>
			<div className="inputbar inputbar-full">
				<i className="fa-solid fa-question"></i>
				<input placeholder="Ask a question..." autoFocus value={question} onChange={changeQuestion} onKeyDown={keydown}/>
			</div>
		</div>
	</>);
}

export default Questions;