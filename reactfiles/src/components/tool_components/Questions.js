import useSearchHistory from '../../hooks/useSearchHistory';

const Questions = () => {

	const {getSelected} = useSearchHistory();

	return (<>
		<p>Ask for further information about the paper</p>
		<div className="chat-container">
			<div className="chat-bubbles">
				{getSelected().questions.map((question, i) => (
					<p key={i} className={`chat-bubble ${question.type == 'gpt' ? 'gpt-response' : ''}`}>
						{question.msg}
					</p>
				))}
			</div>
			<div className="inputbar inputbar-full">
				<i className="fa-solid fa-question"></i>
				<input placeholder="Ask a question..." autoFocus/>
			</div>
		</div>
	</>);
}

export default Questions;