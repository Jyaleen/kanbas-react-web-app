import { useEffect, useState } from "react";
import { Quiz } from "../Row";
import {
    FaCaretDown,
    FaCode,
    FaEllipsisV,
    FaExpandAlt,
    FaGripVertical,
    FaKeyboard,
    FaPencilAlt,
    FaTimes,
} from "react-icons/fa";

interface DetailsEditorProps {
    editQuiz: Quiz;
    setEditQuiz: (quiz: Quiz) => void;
}

export const QuizTextField: React.FC<{
    value: string;
    setValue: (v: string) => void;
}> = ({ value, setValue }) => {
    const [text, setText] = useState(value);

    useEffect(() => {
        setValue(text);
    }, [text]);

    return (
        <div>
            <div
                style={{
                    marginLeft: "10px",
                    display: "flex",
                    columnGap: "15px",
                    padding: "10px 0",
                    marginRight: "20px"
                }}
            >
                <span>Edit</span>
                <span>View</span>
                <span>Insert</span>
                <span>Format</span>
                <span>Tools</span>
                <span>Table</span>
            </div>

            <div style={{ display: "flex", columnGap: "15px", padding: "10px 0" }}>
                <span>
                    12pt <FaCaretDown />
                </span>
                <span>
                    Paragraph <FaCaretDown />
                </span>
                <span>|</span>
                <span style={{ fontWeight: "900" }}>B</span>
                <span style={{ fontStyle: "italic" }}>I</span>
                <span style={{ textDecoration: "underline" }}>U</span>
                <span
                    style={{
                        textDecoration: "underline",
                        textDecorationThickness: "5px",
                    }}
                >
                    A <FaCaretDown />
                </span>
                <span
                    style={{
                        textDecoration: "underline",
                        textDecorationThickness: "5px",
                    }}
                >
                    <FaPencilAlt />
                    <FaCaretDown />
                </span>
                <span>
                    T <FaCaretDown />
                </span>
                <span>|</span>
                <span>
                    <FaEllipsisV />
                </span>
            </div>

            <textarea
                style={{ width: "100%" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>p</span>

                <div style={{ display: "flex", columnGap: "10px", color: "#d51a2c" }}>
                    <span>
                        <FaKeyboard />
                    </span>
                    <span style={{ color: "black" }}>|</span>
                    <span>0 words</span>
                    <span style={{ color: "black" }}>|</span>
                    <span></span>
                    <span>
                        <FaCode />
                    </span>
                    <span>
                        <FaExpandAlt />
                    </span>
                    <span>
                        <FaGripVertical color="gray" />
                    </span>
                </div>
            </div>
        </div>
    );
};

const DetailsEditor: React.FC<DetailsEditorProps> = ({
    editQuiz,
    setEditQuiz,
}) => {
    const [hasTimeLimit, setHasTimeLimit] = useState(
        editQuiz.timeLimit !== undefined
    );

    const updateQuiz = (
        property: string,
        value: string | number | boolean | undefined
    ) => {
        setEditQuiz({
            ...editQuiz,
            [property]: value,
        });
    };

    const optionTypeStyle = {
        height: "32px",
        display: "flex",
        alignItems: "center",
    };

    return (
        <div>
            <input
                value={editQuiz.title}
                placeholder="Title"
                onChange={(e) => updateQuiz("title", e.target.value)}
                // onChange={(e) => setEditQuiz({ ...editQuiz, title: e.target.value })}
                style={{
                    margin: "25px 0",
                    padding: "5px",
                    borderRadius: "3px",
                    border: "1px solid #c1c1c1",
                    width: "50%",
                    display: "flex",
                }}
            />

            <span>Quiz Instructions:</span>
            <QuizTextField
                value={editQuiz.instructions}
                setValue={(e: string) => updateQuiz("instructions", e)}
            // setValue={(e: string) => setEditQuiz({ ...editQuiz, instructions: e })}
            />
            <br />
            <div style={{ display: "flex", columnGap: "20px", flexWrap: "wrap" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "flex-end",
                        rowGap: "20px",
                    }}
                >
                    <span>Quiz Type</span>
                    <span>Assignment Group</span>
                    <span>Points</span>
                    <br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br />

                </div>
                <div
                    style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
                >
                    <select
                        style={{ padding: "5px", width: "150px" }}
                        value={editQuiz.quizType}
                        onChange={(e) => updateQuiz("quizType", e.target.value)}
                    >
                        <option>Graded Quiz</option>
                        <option>Practice Quiz</option>
                        <option>Graded Survey</option>
                        <option>Ungraded Survey</option>
                    </select>
                    <select
                        value={editQuiz.assignmentGroup}
                        style={{ padding: "5px", width: "150px" }}
                        onChange={(e) => updateQuiz("assignmentGroup", e.target.value)}
                    >
                        <option>Quizzes</option>
                        <option>Exams</option>
                        <option>Assignments</option>
                        <option>Projects</option>
                    </select>
                    <input
                        type="number"
                        value={editQuiz.points}
                        placeholder="Points"
                        onChange={(e) => setEditQuiz({ ...editQuiz, points: e.target.valueAsNumber })}
                        style={{
                            padding: "5px",
                            borderRadius: "3px",
                            border: "1px solid #c1c1c1",
                            width: "50%",
                            display: "flex",
                        }}
                    />
                    <br />
                    <h6>Options</h6>
                    <div>
                        <input
                            type="checkbox"
                            style={{ marginRight: "10px", marginBottom: "10px" }}
                            checked={editQuiz.shuffleAnswers}
                            onChange={(e) =>
                                updateQuiz("shuffleAnswers", e.target.checked)
                            }
                        />
                        <label>Shuffle Answers</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            style={{ marginRight: "10px" }}
                            id="time-limit"
                            checked={hasTimeLimit}
                            onChange={(e) => {
                                setHasTimeLimit(e.target.checked);
                                updateQuiz("timeLimit", undefined);
                            }}
                        />
                        <label style={{ marginRight: "20px" }} htmlFor="time-limit">
                            Time Limit
                        </label>
                        <input
                            disabled={!hasTimeLimit}
                            style={{ marginRight: "10px", width: "40px" }}
                            value={hasTimeLimit ? editQuiz.timeLimit : ""}
                            onChange={(e) =>
                                updateQuiz("timeLimit", e.target.valueAsNumber)
                            }
                        />
                        <label>Minutes</label>
                        <div>
                            <input
                                type="checkbox"
                                style={{ marginRight: "10px", marginTop: "20px" }}
                                checked={editQuiz.multipleAttempts}
                                onChange={(e) =>
                                    updateQuiz("multipleAttempts", e.target.checked)
                                }
                            />
                            <label>Allow Multiple Attempts</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                style={{ marginRight: "10px", marginTop: "20px" }}
                                checked={editQuiz.showCorrectAnswers}
                                onChange={(e) =>
                                    updateQuiz("showCorrectAnswers", e.target.checked)
                                }
                            />
                            <label>Show Correct Answers</label>
                        </div>
                        <h6
                            style={{ marginTop: "20px", }}
                        >Access Code</h6>
                        <input
                            type="number"
                            value={editQuiz.accessCode}
                            placeholder="Access Code"
                            onChange={(e) => setEditQuiz({ ...editQuiz, accessCode: e.target.value })}
                            style={{
                                padding: "5px",
                                borderRadius: "3px",
                                border: "1px solid #c1c1c1",
                                width: "50%",
                                display: "flex",
                            }}
                        />
                        <div>
                            <input
                                type="checkbox"
                                style={{ marginRight: "10px", marginTop: "20px" }}
                                checked={editQuiz.oneQuestionAtATime}
                                onChange={(e) =>
                                    updateQuiz("oneQuestionAtATime", e.target.checked)
                                }
                            />
                            <label>One Question at a Time</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                style={{ marginRight: "10px", marginTop: "20px" }}
                                checked={editQuiz.webcamRequired}
                                onChange={(e) =>
                                    updateQuiz("webcamRequired", e.target.checked)
                                }
                            />
                            <label>Webcam Required</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                style={{ marginRight: "10px", marginTop: "20px" }}
                                checked={editQuiz.lockQuestions}
                                onChange={(e) =>
                                    updateQuiz("lockQuestions", e.target.checked)
                                }
                            />
                            <label>Lock Questions After Answering</label>
                        </div>

                        <br />
                        <div
                            style={{
                                width: "400px",
                                paddingTop: "20px",
                                paddingLeft: "15px",
                                border: "1px solid #ccc",
                                borderRadius: "3px",
                                height: "300px",
                            }}
                        >
                            <h6>Assign to</h6>
                            <div
                                style={{
                                    width: "350px",
                                    padding: "5px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    height: "38px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: "#eee",
                                        width: "100px",
                                        padding: "3px 7px",
                                        borderRadius: "3px",
                                    }}
                                >
                                    <span style={{ fontSize: "14px" }}>Everyone</span>
                                    <FaTimes />
                                </div>
                            </div>
                            <br />
                            <h6>Due</h6>
                            <input
                                type="datetime-local"
                                style={{
                                    height: "32px",
                                    width: "350px",
                                    border: "1px solid #ccc",
                                    borderRadius: "3px",
                                    padding: "5px",
                                }}
                                value={new Date(editQuiz.dueDate).toISOString().replace("Z", "")}
                                onChange={(e) =>
                                    updateQuiz("dueDate", new Date(e.target.value).toString())
                                }
                            // value={editQuiz.dueDate}
                            // onChange={(e) =>
                            //     updateQuiz("dueDate", e.target.value)
                            // }
                            />
                            <br /><br />
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginRight: "33px"
                            }}>
                                <div>
                                    <h6>Available from</h6>
                                    <input
                                        type="datetime-local"
                                        style={{
                                            height: "32px",
                                            width: "170px",
                                            border: "1px solid #ccc",
                                            borderRadius: "3px",
                                            padding: "5px",
                                        }}
                                        value={new Date(editQuiz.availableDate).toISOString().replace("Z", "")}
                                        onChange={(e) =>
                                            updateQuiz("availableDate", new Date(e.target.value).toString())
                                        }
                                    // value={editQuiz.availableDate}
                                    // onChange={(e) =>
                                    //     updateQuiz("availableDate", e.target.value)
                                    // }
                                    />
                                </div>
                                <div>
                                    <h6>Until</h6>
                                    <input
                                        type="datetime-local"
                                        style={{
                                            height: "32px",
                                            width: "170px",
                                            border: "1px solid #ccc",
                                            borderRadius: "3px",
                                            padding: "5px",
                                        }}
                                        value={new Date(editQuiz.untilDate).toISOString().replace("Z", "")}
                                        onChange={(e) =>
                                            updateQuiz("untilDate", new Date(e.target.value).toString())
                                        }
                                    // value={editQuiz.untilDate}
                                    // onChange={(e) =>
                                    //     updateQuiz("untilDate", e.target.value)
                                    // }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsEditor;
