import { QuizQuestion } from "../../Row";
import { QuizTextField } from "../DetailsEditor";

interface QuestionTypeProps {
    editQuizQuestion: QuizQuestion;
    setEditQuizQuestion: (quizQuestion: QuizQuestion) => void;
}

const MultipleChoiceQuestion: React.FC<QuestionTypeProps> = ({
    editQuizQuestion,
    setEditQuizQuestion,
}) => {
    const addAnswer = () => {
        const isCorrect = editQuizQuestion.answer.length === 0;
        setEditQuizQuestion({
            ...editQuizQuestion,
            answer: [
                ...editQuizQuestion.answer,
                {
                    isCorrect: isCorrect,
                    value: "",
                },
            ],
        });
    };

    const updateAnswerValue = (value: string, index: number) => {
        const newAnswers = editQuizQuestion.answer.map((answer, i) => {
            if (i === index) {
                return { ...answer, value };
            } else {
                return answer;
            }
        });
        setEditQuizQuestion({ ...editQuizQuestion, answer: newAnswers });
    };

    const updateCorrectAnswer = (index: number) => {
        const newAnswers = editQuizQuestion.answer.map((answer, i) => ({
            ...answer,
            isCorrect: i === index,
        }));
        setEditQuizQuestion({ ...editQuizQuestion, answer: newAnswers });
    };

    return (
        <div style={{ margin: "20px" }}>
            <span>
                Enter your question and multiple answers, then select the one correct
                answer.
            </span>

            <span
                style={{
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "10px",
                }}
            >
                Question:
            </span>

            <QuizTextField
                value={editQuizQuestion.question}
                setValue={(v) =>
                    setEditQuizQuestion({ ...editQuizQuestion, question: v })
                }
            />

            <span
                style={{
                    display: "block",
                    fontSize: "18px",
                    fontWeight: "500",
                    marginTop: "10px",
                }}
            >
                Answers:
            </span>

            {editQuizQuestion.answer.map((answer, index) => {
                return (
                    <div>
                        {answer.isCorrect ? (
                            <span>Correct Answer</span>
                        ) : (
                            <span onClick={() => updateCorrectAnswer(index)}>
                                Possible Answer
                            </span>
                        )}

                        <input
                            value={answer.value}
                            onChange={(e) => updateAnswerValue(e.target.value, index)}
                        />
                    </div>
                );
            })}

            <button
                style={{
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#d51a2c",
                }}
                onClick={addAnswer}
            >
                + Add Another Answer
            </button>
        </div>
    );
};

export default MultipleChoiceQuestion;