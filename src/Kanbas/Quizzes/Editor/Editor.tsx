import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Quiz, QuizQuestion } from "../Row";
import axios from "axios";
import { FaBan, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";

const API_BASE = process.env.REACT_APP_API_BASE;

const Editor = () => {
    const navigate = useNavigate();
    const { quizId, courseId } = useParams();

    // const [quiz, setQuiz] = useState<Quiz | undefined>();
    const [quiz, setQuiz] = useState<Quiz>();

    const [editQuiz, setEditQuiz] = useState(quiz);

    const [detailsTabActive, setDetailsTabActive] = useState(true);

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const getQuiz = async () => {
        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        setQuiz(response.data);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    useEffect(() => {
        setEditQuiz(quiz);
    }, [quiz]);

    const save = async () => {
        await axios.put(QUIZZES_API, editQuiz);
        setQuiz(editQuiz);
        navigate(`../Quizzes/${quiz?._id}/Details`);
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
        navigate(`../Quizzes`);
    };

    const setEditQuizQuestions = (questions: QuizQuestion[]) => {
        if (editQuiz !== undefined) {
            setEditQuiz({ ...editQuiz, questions });
        }
    };

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
                {editQuiz &&
                    (detailsTabActive ? (
                        <DetailsEditor editQuiz={editQuiz} setEditQuiz={setEditQuiz} />
                    ) : (
                        <QuestionsEditor editQuizQuestions={editQuiz.questions} setEditQuizQuestions={setEditQuizQuestions}
                        />
                    ))}
                <hr />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                            onClick={cancel}
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
                            onClick={save}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <br />
                <br />
            </div>
        </div>
    );
};

export default Editor;
