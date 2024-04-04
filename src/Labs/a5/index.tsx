import EncodingParametersInURLs from "./EncodingParametersInURLS";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";
const API_BASE = process.env.REACT_APP_API_BASE;
function Assignment5() {
    return (
        <div>
            <h1>Assignment 5</h1>
            <a href="${API_BASE}/a5/welcome">
                Welcome
            </a>
            <br />
            <br />
            <WorkingWithArrays />
            <br />
            <br />
            <WorkingWithObjects />
            <br />
            <br />
            <EncodingParametersInURLs />
        </div>
    );
}
export default Assignment5;