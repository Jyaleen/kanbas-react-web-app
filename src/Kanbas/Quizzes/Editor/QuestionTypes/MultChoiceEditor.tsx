import { FaArrowRight, FaTrash } from "react-icons/fa";
import { QuizQuestion } from "../../Row";

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

    const deleteAnswer = (index: number) => {
        const filteredAnswers = editQuizQuestion.answer.filter(
            (_, i) => i !== index
        );

        setEditQuizQuestion({ ...editQuizQuestion, answer: filteredAnswers });
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

            <input
                style={{ height: "40px" }}
                value={editQuizQuestion.question}
                onChange={(e) => setEditQuizQuestion({ ...editQuizQuestion, question: e.target.value })}
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

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                    justifyContent: "flex-start",
                }}
            >
                {editQuizQuestion.answer.map((answer, index) => {
                    return (
                        <div
                            style={{
                                border: "1px solid #ccc",
                                padding: "50px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <FaArrowRight
                                    color={answer.isCorrect ? "green" : "#888"}
                                    style={{ marginRight: "10px" }}
                                    onClick={() => updateCorrectAnswer(index)}
                                />
                                {answer.isCorrect ? (
                                    <span style={{ color: "green", marginRight: "10px" }}>
                                        Correct Answer
                                    </span>
                                ) : (
                                    <span
                                        style={{ marginRight: "5px" }}
                                        onClick={() => updateCorrectAnswer(index)}
                                    >
                                        Possible Answer
                                    </span>
                                )}

                                <input
                                    style={{ height: "40px" }}
                                    value={answer.value}
                                    onChange={(e) => updateAnswerValue(e.target.value, index)}
                                />
                            </div>

                            <FaTrash color="888" onClick={() => deleteAnswer(index)} />
                        </div>
                    );
                })}
            </div>

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