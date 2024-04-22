import { useEffect, useState } from "react";
import QuizRow, { Quiz } from "./Row";
import axios from "axios";
import { FaCaretDown, FaEllipsisV } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE;

const List: React.FC = () => {
    const navigate = useNavigate();

    const { courseId } = useParams();

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const getQuizzes = async () => {
        const result = await axios.get(QUIZZES_API);
        setQuizzes(result.data);
    };

    useEffect(() => {
        getQuizzes();
    }, []);

    const addQuiz = async () => {
        const response = await axios.post(QUIZZES_API);
        setQuizzes([...quizzes, response.data]);
        navigate(`${response.data._id}/Details`);
    };

    const removeQuiz = async (quizId: string) => {
        await axios.delete(`${QUIZZES_API}/${quizId}`);
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    };

    const updateQuiz = async (quiz: Quiz) => {
        const response = await axios.put(`${QUIZZES_API}`, quiz);
        setQuizzes(quizzes.map((q) => (q._id === quiz._id ? quiz : q)));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                    placeholder="Search for Quiz"
                    style={{
                        width: "225px",
                        padding: "8px",
                        border: "1px solid #ccc",
                        marginBottom: "12px",
                        borderRadius: "5px",
                    }}
                />

                <div>
                    <button
                        style={{
                            padding: "8px 16px",
                            border: "1px solid #ccc",
                            backgroundColor: "#d51a2c",
                            color: "white",
                            borderRadius: "5px",
                            marginRight: "12px",
                        }}
                        onClick={addQuiz}
                    >
                        + Quiz
                    </button>
                    <button
                        style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            borderRadius: "5px",
                        }}
                    >
                        <FaEllipsisV size="20" color="gray" />
                    </button>
                </div>
            </div>
            <hr />
            <div
                style={{
                    marginTop: "12px",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #c7cdd1",
                    padding: "12px 6px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <FaCaretDown color="black" />
                <h2 style={{ fontSize: "16px", margin: "8px" }}>Assignment Quizzes</h2>
            </div>
            {quizzes.map((quiz) => {
                return (
                    <QuizRow
                        quiz={quiz}
                        removeQuiz={removeQuiz}
                        updateQuiz={updateQuiz}
                    />
                );
            })}
        </div>
    );
};

export default List;