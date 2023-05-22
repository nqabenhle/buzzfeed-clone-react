import QuestionBlock from './QuestionBlock';

const QuestionsBlock = ({ quizItem, addChosenItems, chosenAnswerItems, unansweredQuestionIds }) => {
  return (
    <>
      <h2 id={quizItem.id} className='question-title'>    
        {quizItem.text}
      </h2>
      <div className='questions-container'>
        {quizItem.questions.map((question, _index) => (
          <QuestionBlock 
            key={_index} 
            question={question}
            addChosenItems={addChosenItems}
            quizItemId={quizItem.id} 
            chosenAnswerItems={chosenAnswerItems}
            unansweredQuestionIds={unansweredQuestionIds}
          />
        ))}
      </div>
    </>
  )
}

export default QuestionsBlock;