import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz, getFormattedDate } from "../Row";
import axios from "axios";
import {
    FaExclamationCircle,
    FaPencilAlt,
    FaQuestionCircle,
} from "react-icons/fa";
import QuestionPreview from "./QuestionPreview";

const API_BASE = process.env.REACT_APP_API_BASE;

const Preview: React.FC = () => {
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    const [quiz, setQuiz] = useState<Quiz | undefined>();
    const [startTime, setStartTime] = useState<string>();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const getQuiz = async () => {
        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        setQuiz(response.data);
    };

    useEffect(() => {
        const startedDate = getFormattedDate(new Date().toISOString());
        setStartTime(startedDate);
    }, []);

    useEffect(() => {
        getQuiz();
    }, []);

    const [savedDate, setSavedDate] = useState<string>();

    useEffect(() => {
        setSavedDate(getFormattedDate(new Date().toISOString()));
    }, [currentQuestion]);

    console.log(quiz);

    return (
        <div style={{ marginBottom: "150px" }}>
            <h1 style={{ fontSize: "30px", fontWeight: "400", color: "black" }}>
                {quiz?.title}
            </h1>

            <div
                style={{
                    backgroundColor: "#f8e9e5",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "15px",
                }}
            >
                <FaExclamationCircle color="#c13726" />
                <span style={{ marginLeft: "10px", color: "#c13726" }}>
                    This is a preview of the published version of the quiz
                </span>
            </div>
            <span style={{ fontSize: "14px" }}>Started: {startTime}</span>

            <h1
                style={{
                    fontSize: "30px",
                    fontWeight: "400",
                    color: "black",
                    marginTop: "5px",
                }}
            >
                Quiz Instructions
            </h1>

            {quiz?.instructions && (
                <div dangerouslySetInnerHTML={{ __html: quiz?.instructions }} />
            )}

            <hr />

            {quiz?.questions && quiz.questions.length && (
                <>
                    {quiz.questions.map((question, index) => {
                        return (
                            <QuestionPreview
                                question={question}
                                show={index === currentQuestion}
                            />
                        );
                    })}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                        }}
                    >
                        <button
                            style={{
                                border: "1px solid #ccc",
                                backgroundColor: "#f5f5f5",
                                padding: "5px 15px",
                            }}
                            disabled={currentQuestion === 0}
                            onClick={() =>
                                setCurrentQuestion(
                                    (curr) => (curr - 1) % quiz?.questions.length
                                )
                            }
                        >
                            Previous
                        </button>

                        <button
                            style={{
                                border: "1px solid #ccc",
                                backgroundColor: "#f5f5f5",
                                padding: "5px 15px",
                            }}
                            disabled={currentQuestion === quiz.questions.length - 1}
                            onClick={() =>
                                setCurrentQuestion(
                                    (curr) => (curr + 1) % quiz?.questions.length
                                )
                            }
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    border: "1px solid #ccc",
                    alignItems: "center",
                    columnGap: "20px",
                    padding: "10px",
                    marginTop: "25px",
                }}
            >
                <span style={{ color: "#888" }}>Quiz saved at {savedDate}</span>
                <button
                    style={{
                        border: "1px solid #ccc",
                        backgroundColor:
                            quiz?.questions && currentQuestion === quiz.questions.length - 1
                                ? "#d41b2c"
                                : "#f5f5f5",
                        padding: "5px 15px",
                        color:
                            quiz?.questions && currentQuestion === quiz.questions.length - 1
                                ? "white"
                                : "#555",
                    }}
                >
                    Submit Quiz
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    border: "1px solid #ccc",
                    backgroundColor: "#f5f5f5",
                    alignItems: "center",
                    columnGap: "5px",
                    padding: "5px 15px",
                    marginTop: "25px",
                }}
                onClick={() => navigate(`../Quizzes/${quizId}/Details/Editor`)}
            >
                <FaPencilAlt color="#555" />
                <span style={{ color: "#555" }}>Keep Editing This Quiz</span>
            </div>

            {quiz?.questions && (
                <div style={{ marginTop: "30px" }}>
                    <span style={{ fontSize: "24px" }}>Questions</span>
                    {quiz.questions.map((question, index) => {
                        return (
                            <div
                                style={{ marginLeft: "30px" }}
                                onClick={() => setCurrentQuestion(index)}
                            >
                                <FaQuestionCircle color="#888" />
                                <span
                                    style={{
                                        marginLeft: "5px",
                                        color: "#ab2022",
                                        fontWeight: index === currentQuestion ? "bold" : "normal",
                                    }}
                                >
                                    {question.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Preview;