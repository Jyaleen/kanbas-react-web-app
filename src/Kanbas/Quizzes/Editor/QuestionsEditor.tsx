import { useParams } from "react-router";
import { QuestionType, Quiz, QuizQuestion } from "../Row";
import { QuizTextField } from "./DetailsEditor";
import MultipleChoiceQuestion from "./QuestionTypes/MultChoiceEditor";

interface QuestionsEditorProps {
    editQuizQuestions: QuizQuestion[];
    setEditQuizQuestions: (quizQuestion: QuizQuestion[]) => void;
}

const QuestionsEditor: React.FC<QuestionsEditorProps> = ({
    editQuizQuestions,
    setEditQuizQuestions,
}) => {
    const newDefaultQuestion: QuizQuestion = {
        title: "Question Title",
        points: 0,
        question: "",
        questionType: QuestionType["Multiple Choice"],
        answer: [],
    };

    const addQuestion = () => {
        setEditQuizQuestions([...editQuizQuestions, newDefaultQuestion]);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {/* {editQuizQuestions.map((question, index) => {
                const setQuestion = (updatedQuestion: QuizQuestion) => {
                    setEditQuizQuestions(
                        editQuizQuestions.map((q, i) => (i === index ? updatedQuestion : q))
                    );
                };
                return (
                    <Question question={question} setQuestion={setQuestion}>
                        {question.questionType === QuestionType["Multiple Choice"] ? (
                            <MultipleChoiceQuestion
                                editQuizQuestion={question}
                                setEditQuizQuestion={setQuestion}
                            />
                        ) : question.questionType === QuestionType["True/False"] ? (
                            <TrueFalseQuestion />
                        ) : (
                            <FillInTheBlankQuestion />
                        )}
                    </Question>
                );
            })} */}

            <div style={{ marginTop: "100px" }} />

            <button
                style={{
                    border: "1px solid #ccc",
                    padding: "5px 15px",
                    borderRadius: "5px",
                    marginRight: "15px",
                    margin: "auto",
                }}
                onClick={addQuestion}
            >
                + New Question
            </button>
        </div>
    );
};

const Question: React.FC<{
    children?: React.ReactNode;
    question: QuizQuestion;
    setQuestion: (q: QuizQuestion) => void;
}> = ({ children, question, setQuestion }) => {
    const updateQuestion = (property: string, value: string | number) => {
        setQuestion({ ...question, [property]: value });
    };
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
                        value={question.title}
                        onChange={(e) => updateQuestion("title", e.target.value)}
                    />

                    <select
                        value={question.questionType}
                        style={{
                            height: "36px",
                            padding: "5px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            marginRight: "15px",
                            width: "250px",
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
                        value={question.points}
                        onChange={(e) => updateQuestion("points", parseInt(e.target.value))}
                    />
                </div>
            </div>

            {children}

            <button
                style={{
                    padding: "5px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    margin: "20px 15px",
                }}
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
            >
                Update Question
            </button>
        </div>
    );
};

const TrueFalseQuestion: React.FC = () => {
    return null;
};

const FillInTheBlankQuestion: React.FC = () => {
    return null;
};

export default QuestionsEditor;