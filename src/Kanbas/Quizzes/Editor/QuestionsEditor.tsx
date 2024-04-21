import { useParams } from "react-router";
import { Quiz } from "../Row";

interface DetailsEditorProps {
    quiz: Quiz;
}

const QuestionsEditor: React.FC<DetailsEditorProps> = ({ quiz }) => {
    const { quizId } = useParams();

    return <div>Questions Editor {quizId}</div>;
};

export default QuestionsEditor;
