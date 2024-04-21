import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Quiz } from "../Row";
import axios from "axios";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";

const API_BASE = process.env.REACT_APP_API_BASE;

const Editor = () => {
    const { quizId, courseId } = useParams();

    const [quiz, setQuiz] = useState<Quiz | undefined>();
    const [detailsTabActive, setDetailsTabActive] = useState(true);

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const getQuiz = async () => {
        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        setQuiz(response.data);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginRight: "40px"
                }}
            >
                <span>Points {quiz?.points}</span>
                {quiz?.isPublished ? (
                    <span>
                        <FaCheckCircle color="green" style={{ marginRight: "5px" }} />
                        Published
                    </span>
                ) : (
                    <span>
                        <FaBan color="gray" style={{ marginRight: "5px" }} />
                        Not Published
                    </span>
                )}
                <button
                    style={{
                        backgroundColor: "ccc",
                        border: "1px solid #ccc",
                        padding: "5px 5px",
                    }}
                >
                    <FaEllipsisV color="gray" />
                </button>
            </div>

            <hr />

            <div
                style={{
                    marginRight: "40px"
                }}>
                <nav className="nav nav-tabs mt-2">
                    <Link
                        className={`nav-link ${detailsTabActive && "active"}`}
                        to={""}
                        style={{ color: detailsTabActive ? "black" : "#d51a2c" }}
                        onClick={() => setDetailsTabActive(true)}
                    >
                        Details
                    </Link>
                    <Link
                        className={`nav-link ${!detailsTabActive && "active"}`}
                        to={""}
                        style={{ color: !detailsTabActive ? "black" : "#d51a2c" }}
                        onClick={() => setDetailsTabActive(false)}
                    >
                        Questions
                    </Link>
                </nav>
            </div>

            <div
                style={{
                    marginRight: "40px"
                }}>
                {quiz &&
                    (detailsTabActive ? (
                        <DetailsEditor quiz={quiz} />
                    ) : (
                        <QuestionsEditor quiz={quiz} />
                    ))}
            </div>
        </div>
    );
};

export default Editor;
