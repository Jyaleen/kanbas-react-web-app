import { QuestionType, QuizQuestion } from "../Row";
import QuestionEditor from "./QuestionEditor";

export interface QuestionsEditorProps {
    questions: QuizQuestion[];
    setQuestions: (quizQuestion: QuizQuestion[]) => void;
}

const QuestionsEditor: React.FC<QuestionsEditorProps> = ({
    questions,
    setQuestions,
}) => {
    const newDefaultQuestion: QuizQuestion = {
        title: "Question Title",
        points: 0,
        question: "",
        questionType: QuestionType.MultipleChoice,
        answer: [],
    };

    const addQuestion = () => {
        setQuestions([...questions, newDefaultQuestion]);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                rowGap: "20px",
            }}
        >

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

export default QuestionsEditor;