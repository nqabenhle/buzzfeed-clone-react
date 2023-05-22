import { useEffect, useState } from 'react';
import Title from './components/Title';
import QuestionsBlock from './components/QuestionsBlock';
import AnswerBlock from './components/AnswerBlock';

const App = () => {
  const [quiz, setQuiz] = useState();
  const [chosenAnswerItems, setChosenAnswerItems] = useState([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState([0, 1, 2])
  const [showAnswer, setShowAnswer] = useState(false);

  console.log('showAnswer', showAnswer);
  console.log('chosenAnswerItems', chosenAnswerItems);
  console.log('unansweredQuestionIds', unansweredQuestionIds);

  const addChosenItems = (answer, quizItemId) => {
    setChosenAnswerItems((prevChosenAnswerItems) => (
      [...prevChosenAnswerItems, answer]
    ));

    setUnansweredQuestionIds(() => {
      return unansweredQuestionIds.filter((id) => id !== quizItemId)
    })
  }

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/quiz');
      const json = await response.json();
      setQuiz(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
      console.log('I am not rendered');
      setShowAnswer(true);
      const answerBlock = document.getElementById('answer-block');
      answerBlock?.scrollIntoView({ behavior: 'smooth' });
    } 
    const highestId = Math.min(...unansweredQuestionIds);
    const highestElement = document.getElementById(highestId);
    highestElement?.scrollIntoView({ behavior: 'smooth' });
  }, [chosenAnswerItems, showAnswer, unansweredQuestionIds])

  return (
    <div className='app'>
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />

      {quiz?.content?.map((contentItem) => (
        <QuestionsBlock
         key={contentItem.id} 
         quizItem={contentItem} 
         addChosenItems={addChosenItems}
         chosenAnswerItems={chosenAnswerItems}
         unansweredQuestionIds={unansweredQuestionIds}
        />
      ))}

      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswerItems={chosenAnswerItems}
        />
      )}

    </div>
  );
}

export default App;
