import { FaArrowRight, FaTrash } from "react-icons/fa";
import { QuizQuestion } from "../../Row";

interface QuestionTypeProps {
    editQuizQuestion: QuizQuestion;
    setEditQuizQuestion: (quizQuestion: QuizQuestion) => void;
}

const TrueFalseQuestion: React.FC<QuestionTypeProps> = ({
    editQuizQuestion,
    setEditQuizQuestion,
}) => {
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
                Enter your question text, then select if True or False is the correct
                Answer
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

                                <span
                                    style={{
                                        color: answer.isCorrect ? "green" : "#888",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {answer.value}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrueFalseQuestion;