import { useState } from "react";
import { QuestionType, QuizQuestion } from "../Row";
import QuestionPreview from "../Preview/QuestionPreview";
import MultipleChoiceQuestion from "./QuestionTypes/MultChoiceEditor";
import FillInTheBlankQuestionEditor from "./QuestionTypes/FillInTheBlankQuestionEditor";
import TrueFalseQuestion from "./QuestionTypes/TrueFalseQuestionEditor";

export const QuestionEditor: React.FC<{
    question: QuizQuestion;
    setQuestion: (q: QuizQuestion) => void;
    deleteQuestion: () => void;
    isEditingInit?: boolean;
}> = ({ question, setQuestion, deleteQuestion, isEditingInit }) => {
    const [isEditing, setIsEditing] = useState(isEditingInit === true);

    const [editQuestion, setEditQuestion] = useState(question);

    const saveQuestion = () => {
        setQuestion(editQuestion);
        setIsEditing(false);
    };

    const cancel = () => {
        setEditQuestion(question);
        setIsEditing(false);
    };

    const updateQuestion = (property: string, value: string | number) => {
        setEditQuestion({ ...editQuestion, [property]: value });
    };

    const updateQuestionType = (newType: string) => {
        if (newType === "Multiple Choice") {
            setEditQuestion({
                ...question,
                questionType: QuestionType.MultipleChoice,
                answer: [],
            });
        } else if (newType === "Fill In The Blank") {
            setEditQuestion({
                ...question,
                questionType: QuestionType.FillInTheBlank,
                answer: [],
            });
        } else {
            setEditQuestion({
                ...question,
                questionType: QuestionType.TrueFalse,
                answer: [
                    { isCorrect: true, value: "True" },
                    { isCorrect: false, value: "False" },
                ],
            });
        }
    };

    if (!isEditing) {
        return (
            <QuestionPreview
                question={question}
                show={true}
                editQuestion={() => setIsEditing(true)}
                deleteQuestion={deleteQuestion}
            />
        );
    }

    return (
        <div style={{ border: "1px solid #ccc" }}>
            <div
                style={{
                    borderBottom: "1px solid #ccc",
                    padding: "20px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <input
                        style={{
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            marginRight: "15px",
                        }}
                        value={editQuestion.title}
                        onChange={(e) => updateQuestion("title", e.target.value)}
                    />

                    <select
                        value={editQuestion.questionType}
                        style={{
                            height: "36px",
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            marginRight: "15px",
                            width: "250px",
                        }}
                        onChange={(e) => {
                            updateQuestionType(e.target.value);
                        }}
                    >
                        {Object.values(QuestionType)
                            .slice(0, 3)
                            .map((k) => {
                                return <option>{k}</option>;
                            })}
                    </select>
                </div>

                <div>
                    <span style={{ fontWeight: "500", marginRight: "5px" }}>pts:</span>
                    <input
                        style={{
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            marginRight: "15px",
                            width: "50px",
                        }}
                        type="number"
                        value={editQuestion.points}
                        onChange={(e) => updateQuestion("points", parseInt(e.target.value))}
                    />
                </div>
            </div>

            {editQuestion.questionType === QuestionType.MultipleChoice && (
                <MultipleChoiceQuestion
                    editQuizQuestion={editQuestion}
                    setEditQuizQuestion={setEditQuestion}
                />
            )}

            {editQuestion.questionType === QuestionType.FillInTheBlank && (
                <FillInTheBlankQuestionEditor
                    editQuizQuestion={editQuestion}
                    setEditQuizQuestion={setEditQuestion}
                />
            )}

            {editQuestion.questionType === QuestionType.TrueFalse && (
                <TrueFalseQuestion
                    editQuizQuestion={editQuestion}
                    setEditQuizQuestion={setEditQuestion}
                />
            )}

            <button
                style={{
                    padding: "5px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    margin: "20px 15px",
                }}
                onClick={cancel}
            >
                Cancel
            </button>

            <button
                style={{
                    backgroundColor: "#d51a2c",
                    padding: "5px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    margin: "20px 15px",
                    color: "white",
                }}
                onClick={saveQuestion}
            >
                Update Question
            </button>
        </div>
    );
};

export default QuestionEditor;