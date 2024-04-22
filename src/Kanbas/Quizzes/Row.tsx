import axios from "axios";
import {
    FaBan,
    FaCheckCircle,
    FaEllipsisH,
    FaEllipsisV,
    FaRocket,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export function getDateFormat(dateStr: string) {
    const date = new Date(dateStr);
    const monthDay = date.toLocaleString("default", {
        month: "short",
        day: "numeric",
    });
    const time = date
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
        .toLowerCase();

    return `${monthDay} at ${time}`;
}

export enum QuestionType {
    "Multiple Choice",
    "True/False",
    "Fill In The Blank",
}

export type QuizQuestion = {
    title: string;
    points: number;
    question: string;
    questionType: QuestionType;
    answer: { isCorrect: boolean; value: string }[];
};

export type QuizType =
    | "Graded Quiz"
    | "Practice Quiz"
    | "Graded Survey"
    | "Ungraded Survey";

export type AssignmentGroup = "Quizzes" | "Exams" | "Assignments" | "Project";

export type Quiz = {
    _id: string;
    courseNumber: string;
    title: string;
    instructions: string;
    availableDate: string;
    dueDate: string;
    untilDate: string;
    points: number;
    numQuestions: number;
    isPublished: boolean;
    quizType: QuizType;
    assignmentGroup: AssignmentGroup;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestions: boolean;
    questions: QuizQuestion[];
};

interface RowProps {
    quiz: Quiz;
    removeQuiz: (id: string) => void;
    updateQuiz: (quiz: Quiz) => void;
}

const API_BASE = process.env.REACT_APP_API_BASE;

const Row: React.FC<RowProps> = ({ quiz, removeQuiz, updateQuiz }) => {
    const navigate = useNavigate();

    const { courseId } = useParams();

    const QUIZZES_API = `${API_BASE}/api/courses/${courseId}/quizzes`;

    const getAvailability = () => {
        const availableDate = new Date(quiz.availableDate).getTime();
        const dueDate = new Date(quiz.dueDate).getTime();
        const untilDate = new Date(quiz.untilDate).getTime();
        const currentDate = new Date().getTime();

        if (currentDate > availableDate) {
            return "Closed";
        } else if (currentDate > availableDate && currentDate < untilDate) {
            return "Available";
        } else {
            const formattedDate = getDateFormat(quiz.availableDate);
            return `Not available until ${formattedDate}`;
        }
    };

    return (
        <div
            style={{
                padding: "12px 6px 12px 10px",
                border: "1px solid #c1c1c1",
                borderTop: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <FaRocket color={quiz.isPublished ? "green" : "gray"} />
                <div style={{ marginRight: "24px", marginLeft: "12px" }}>
                    <h4
                        style={{ fontSize: "16px", margin: 0 }}
                        onClick={() => navigate(`${quiz._id}/Details`)}
                    >
                        {quiz.title}
                    </h4>
                    <div style={{ fontSize: "12px", display: "flex", columnGap: "12px" }}>
                        <span>{getAvailability()}</span>
                        <span>{quiz.points} pts</span>
                        <span>{quiz.numQuestions} Questions</span>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    columnGap: "20px",
                    marginRight: "20px",
                    alignItems: "center",
                }}
            >
                {quiz.isPublished ? (
                    <FaCheckCircle size="20" color="green" />
                ) : (
                    <FaBan size="20" color="gray" />
                )}

                <div className="dropdown">
                    <button
                        data-bs-toggle="dropdown"
                        style={{ backgroundColor: "white", border: "none" }}
                    >
                        <FaEllipsisV size="20" color="gray" />
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button
                            className="dropdown-item"
                            onClick={() => {
                                navigate(`${quiz._id}/Details`);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="dropdown-item"
                            onClick={() => {
                                removeQuiz(quiz._id);
                            }}
                        >
                            Delete
                        </button>
                        {quiz.isPublished ? (
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    const publishedQuiz = {
                                        ...quiz,
                                        isPublished: false,
                                    };
                                    updateQuiz(publishedQuiz);
                                }}
                            >
                                Unpublish
                            </button>
                        ) : (
                            <button
                                className="dropdown-item"
                                onClick={() => {
                                    const publishedQuiz = {
                                        ...quiz,
                                        isPublished: true,
                                    };
                                    updateQuiz(publishedQuiz);
                                }}
                            >
                                Publish
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Row;