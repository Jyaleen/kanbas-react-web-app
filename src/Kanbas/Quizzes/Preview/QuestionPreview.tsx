import { useState } from "react";
import { QuestionType, QuizQuestion } from "../Row";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const QuestionPreview: React.FC<{
    question: QuizQuestion;
    show: boolean;
    editQuestion?: () => void;
    deleteQuestion?: () => void;
}> = ({ question, editQuestion, deleteQuestion, show }) => {
    const [questionAnswer, setQuestionAnswer] = useState<string>();

    return (
        <div style={{ border: "1px solid #ccc", display: show ? "block" : "none" }}>
            <div
                style={{
                    borderBottom: "1px solid #ccc",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 20px",
                }}
            >
                <div style={{ display: "flex", columnGap: "10px" }}>
                    {editQuestion && (
                        <button onClick={editQuestion} style={{ border: "none" }}>
                            <FaPencilAlt />
                        </button>
                    )}
                    {deleteQuestion && (
                        <button onClick={deleteQuestion} style={{ border: "none" }}>
                            <FaTrash />
                        </button>
                    )}
                    <h3 style={{ fontSize: "20px", paddingTop: "5px" }}>
                        {question.title}
                    </h3>
                </div>

                <h4 style={{ fontSize: "17px" }}>{question.points} pts</h4>
            </div>

            <div style={{ padding: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: question.question }} />

                {question.answer.map((answer, index) => {
                    if (question.questionType === QuestionType.FillInTheBlank) {
                        return (
                            <div>
                                <hr />
                                <span>Answer {index + 1}: </span>
                                <input
                                    value={questionAnswer}
                                    onChange={(e) => setQuestionAnswer(e.target.value)}
                                />
                            </div>
                        );
                    }

                    return (
                        <div>
                            <hr />
                            <input
                                type="radio"
                                name={question.question}
                                id={answer.value}
                                style={{ marginRight: "10px" }}
                            />
                            <label htmlFor={answer.value}>{answer.value}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionPreview;