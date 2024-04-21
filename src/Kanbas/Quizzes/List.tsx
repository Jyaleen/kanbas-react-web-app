import { useEffect, useState } from "react";
import Row, { Quiz } from "./Row";
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
        // console.log(result)
        // console.log(QUIZZES_API)
        setQuizzes(result.data);
    };

    useEffect(() => {
        getQuizzes();
        console.log(quizzes)
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
        setQuizzes(response.data);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "40px",
                marginTop: "20px"
            }}>
                <input
                    placeholder="Search for Quiz"
                    style={{
                        width: "300px",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                />
                <div>
                    <button
                        className="btn btn-danger"
                        style={{ marginRight: "12px" }}
                        onClick={addQuiz}
                    >
                        + Quiz
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                    >
                        <FaEllipsisV size="18" color="gray" />
                    </button>
                </div>
            </div>
            <hr />
            <div
                style={{
                    marginTop: "10px",
                    marginRight: "40px",
                    backgroundColor: "#f3f3f3",
                    border: "1px solid gray",
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <FaCaretDown color="black" />
                <h5 style={{ margin: "8px" }}>Assignment Quizzes</h5>
            </div>
            {quizzes.map((quiz) => {
                return (
                    <Row
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
