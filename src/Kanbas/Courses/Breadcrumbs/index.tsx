import { useParams, useLocation } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import db from "../../Database";

function Breadcrumbs({ courses }: { courses: any[]; }) {
    const links = ["Home", "Modules", "Assignments", "Grades"];
    const { courseId } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === courseId);

    if (pathname.includes("Home")) {
        return (<h1><HiMiniBars3 /> {course?.number} {course?.name} {'>'} Home</h1>);
    }
    else if (pathname.includes("Modules")) {
        return (<h1><HiMiniBars3 /> {course?.number} {course?.name} {'>'} Modules</h1>);
    }
    else if (pathname.includes("Assignments")) {
        return (<h1><HiMiniBars3 /> {course?.number} {course?.name} {'>'} Assignments</h1>);
    }
    else if (pathname.includes("Grades")) {
        return (<h1><HiMiniBars3 /> {course?.number} {course?.name} {'>'} Grades</h1>);
    }
    else {
        return (<h1><HiMiniBars3 /> {course?.number} {course?.name}</h1>);
    }
}

export default Breadcrumbs