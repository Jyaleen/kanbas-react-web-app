import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz, QuizQuestion } from "../Row";
import axios from "axios";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsListEditor";

const API_BASE = process.env.REACT_APP_API_BASE;

const Editor = () => {
    const [quiz, setQuiz] = useState<Quiz | undefined>();

    const { quizId, courseId } = useParams();

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const [editQuiz, setEditQuiz] = useState(quiz);

    const [detailsTabActive, setDetailsTabActive] = useState(true);

    const getQuiz = async () => {
        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        setQuiz(response.data);
    };

    const navigate = useNavigate();

    useEffect(() => {
        getQuiz();
    }, []);

    useEffect(() => {
        setEditQuiz(quiz);
    }, [quiz]);

    const save = async () => {
        await axios.put(QUIZZES_API, editQuiz);
        setQuiz(editQuiz);
    };

    const saveAndPublish = async () => {
        if (editQuiz !== undefined) {
            const publishedQuiz = { ...editQuiz, isPublished: true };
            await axios.put(QUIZZES_API, publishedQuiz);
            setQuiz(publishedQuiz);
            navigate(`../Quizzes`);
        }
    };

    const cancel = () => {
        setEditQuiz(quiz);
    };

    const setEditQuizQuestions = (questions: QuizQuestion[]) => {
        if (editQuiz !== undefined) {
            setEditQuiz({ ...editQuiz, questions });
        }
    };

    return (
        <div style={{ height: "100%" }}>
            <div
                style={{
                    display: "flex",
                    columnGap: "15px",
                    marginRight: "20px",
                    justifyContent: "flex-end",
                    alignItems: "center",
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

            <div style={{ marginRight: "20px" }}>
                <hr />
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

                {editQuiz &&
                    (detailsTabActive ? (
                        <DetailsEditor editQuiz={editQuiz} setEditQuiz={setEditQuiz} />
                    ) : (
                        <QuestionsEditor
                            questions={editQuiz.questions}
                            setQuestions={setEditQuizQuestions}
                        />
                    ))}

                <hr />

                <div style={{ marginRight: "20px", display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <input style={{ marginRight: "10px" }} type="checkbox" />
                        <span>Notify users this quiz has changed</span>
                    </div>

                    <div>
                        <button
                            style={{
                                border: "1px solid #ccc",
                                padding: "5px 15px",
                                borderRadius: "5px",
                                marginRight: "15px",
                            }}
                            onClick={() => {
                                cancel();
                                navigate(`../Quizzes`);
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            style={{
                                border: "1px solid #ccc",
                                padding: "5px 15px",
                                borderRadius: "5px",
                                marginRight: "15px",
                            }}
                            onClick={saveAndPublish}
                        >
                            Save & Publish
                        </button>

                        <button
                            style={{
                                backgroundColor: "#d51a2c",
                                color: "white",
                                border: "1px solid #ccc",
                                padding: "5px 15px",
                                borderRadius: "5px",
                            }}
                            onClick={() => {
                                save();
                                navigate(`../Quizzes/${quizId}/Details`);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <hr />
        </div>
    );
};

export default Editor;