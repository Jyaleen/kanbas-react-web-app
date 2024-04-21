import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Quiz, getFormattedDate } from "./Row";
import { FaBan, FaCheckCircle, FaEllipsisV, FaPencilAlt } from "react-icons/fa";

const API_BASE = process.env.REACT_APP_API_BASE;

const Details: React.FC = () => {
    const navigate = useNavigate();

    const { courseId, quizId } = useParams();

    const [quiz, setQuiz] = useState<Quiz | undefined>();

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const getQuiz = async () => {
        const response = await axios.get(`${QUIZZES_API}/${quizId}`);
        setQuiz(response.data);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const getQuizDetails = () => {
        if (quiz?.accessCode === "") {
            return [
                { title: "Quiz Type", value: quiz?.quizType },
                { title: "Points", value: quiz?.points },
                { title: "Assignment Group", value: quiz?.assignmentGroup },
                { title: "Shuffle Answers", value: quiz?.shuffleAnswers ? "Yes" : "No" },
                { title: "Time Limit", value: `${quiz?.timeLimit} Minutes` },
                {
                    title: "Multiple Attempts",
                    value: quiz?.multipleAttempts ? "Yes" : "No",
                },
                {
                    title: "Show Correct Answers",
                    value: quiz?.showCorrectAnswers ? "Yes" : "No",
                },
                {
                    title: "One Question at a Time",
                    value: quiz?.oneQuestionAtATime ? "Yes" : "No",
                },
                { title: "Webcam Required", value: quiz?.webcamRequired ? "Yes" : "No" },
                {
                    title: "Lock Questions After Answering",
                    value: quiz?.lockQuestions ? "Yes" : "No",
                },
            ];
        }
        else return [
            { title: "Quiz Type", value: quiz?.quizType },
            { title: "Points", value: quiz?.points },
            { title: "Assignment Group", value: quiz?.assignmentGroup },
            { title: "Shuffle Answers", value: quiz?.shuffleAnswers ? "Yes" : "No" },
            { title: "Time Limit", value: `${quiz?.timeLimit} Minutes` },
            {
                title: "Multiple Attempts",
                value: quiz?.multipleAttempts ? "Yes" : "No",
            },
            {
                title: "Access Code", value: quiz?.accessCode ? quiz?.accessCode : "",
            },
            {
                title: "Show Correct Answers",
                value: quiz?.showCorrectAnswers ? "Yes" : "No",
            },
            {
                title: "One Question at a Time",
                value: quiz?.oneQuestionAtATime ? "Yes" : "No",
            },
            { title: "Webcam Required", value: quiz?.webcamRequired ? "Yes" : "No" },
            {
                title: "Lock Questions After Answering",
                value: quiz?.lockQuestions ? "Yes" : "No",
            },
        ];
    };

    const publishQuiz = async () => {
        if (quiz === undefined) {
            return;
        }
        const publishedQuiz = {
            ...quiz,
            isPublished: !quiz?.isPublished,
        };
        await axios.put(`${QUIZZES_API}`, publishedQuiz);
        setQuiz(publishedQuiz);
    };

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    columnGap: "10px",
                }}
            >
                {!quiz?.isPublished ? (
                    <button
                        style={{
                            backgroundColor: "gray",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "5px 15px",
                            color: "white",
                        }}
                        onClick={publishQuiz}
                    >
                        <FaBan style={{ marginRight: "5px" }} />
                        Unpublished
                    </button>
                ) : (
                    <button
                        style={{
                            backgroundColor: "green",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            padding: "5px 15px",
                            color: "white",
                        }}
                        onClick={publishQuiz}
                    >
                        <FaCheckCircle color="white" style={{ marginRight: "5px" }} />
                        Published
                    </button>
                )}

                <button
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px 15px",
                    }}
                    onClick={() => navigate(`../Quizzes/${quiz?._id}/Preview`)}
                >
                    Preview
                </button>
                <button
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px 15px",
                    }}
                    onClick={() => navigate(`../Quizzes/${quiz?._id}/Details/Editor`)}
                >
                    <FaPencilAlt
                        style={{ transform: "scale(-1, 1)", marginRight: "5px" }}
                    />
                    Edit
                </button>
                <button
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px 10px",
                    }}
                >
                    <FaEllipsisV />
                </button>
            </div>

            <hr />

            <h1 style={{ color: "black", fontSize: "36px", fontWeight: "400" }}>
                {quiz?.title}
            </h1>

            <div style={{ display: "flex", columnGap: "10px" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        rowGap: "10px",
                    }}
                >
                    {getQuizDetails().map((detail) => {
                        return <span style={{ fontWeight: "600" }}>{detail.title}</span>;
                    })}
                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
                >
                    {getQuizDetails().map((detail) => {
                        return <span>{detail.value}</span>;
                    })}
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                        fontWeight: "700",
                    }}
                >
                    Due
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                        fontWeight: "700",
                    }}
                >
                    For
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                        fontWeight: "700",
                    }}
                >
                    Available From
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                        fontWeight: "700",
                    }}
                >
                    Until
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                    }}
                >
                    {getFormattedDate(quiz?.dueDate ?? "")}
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                    }}
                >
                    Everyone
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                    }}
                >
                    {getFormattedDate(quiz?.availableDate ?? "")}
                </span>
                <span
                    style={{
                        width: "25%",
                        borderBottom: "1px solid #888",
                        padding: "16px 0",
                    }}
                >
                    {getFormattedDate(quiz?.untilDate ?? "")}
                </span>
            </div>
        </div>
    );
};

export default Details;