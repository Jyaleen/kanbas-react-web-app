import { FaArrowRight, FaTrash } from "react-icons/fa";
import { QuizQuestion } from "../../Row";

interface QuestionTypeProps {
    editQuizQuestion: QuizQuestion;
    setEditQuizQuestion: (quizQuestion: QuizQuestion) => void;
}

const FillInTheBlankQuestionEditor: React.FC<QuestionTypeProps> = ({
    editQuizQuestion,
    setEditQuizQuestion,
}) => {
    const addAnswer = () => {
        setEditQuizQuestion({
            ...editQuizQuestion,
            answer: [
                ...editQuizQuestion.answer,
                {
                    isCorrect: false,
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
                Enter your question text, then define all possible correct answers for
                the blank.
                <br />
                Students will see the question followed by a small text box to type in
                their answer.
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
                                <span style={{ marginRight: "5px" }}>
                                    Blank {index + 1} Answer:{" "}
                                </span>

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

export default FillInTheBlankQuestionEditor;