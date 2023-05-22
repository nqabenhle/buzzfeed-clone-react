const QuestionBlock = ({ question, addChosenItems, quizItemId, chosenAnswerItems, unansweredQuestionIds }) => {

  const validPick = !chosenAnswerItems.includes(question.text)
    && !unansweredQuestionIds.includes(quizItemId);

  return (
    <button
      className='question-block'
      onClick={() => addChosenItems(question.text, quizItemId)}
      disabled={validPick}
    >
      <img src={question.image} alt={question.alt} />
      <h3>{question.text}</h3>
      <p>
        <a href={question.image}>{question.credit} </a>
        <a href='https://www.unsplash.com/'>Unsplash</a>
      </p>
    </button>
  )
}

export default QuestionBlock;