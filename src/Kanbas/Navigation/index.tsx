import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
    FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt,
    FaEnvelopeOpenText,
    FaClock,
    FaTv,
    FaArrowCircleRight,
    FaQuestionCircle
} from "react-icons/fa";
import neuLogo from './NEU logo.png';

function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" color="red" /> },
        { label: "Courses", icon: <FaBook className="fs-2" color="red" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" color="red" /> },
        { label: "Inbox", icon: <FaEnvelopeOpenText className="fs-2" color="red" /> },
        { label: "History", icon: <FaClock className="fs-2" color="red" /> },
        { label: "Studio", icon: <FaTv className="fs-2" color="red" /> },
        { label: "Commons", icon: <FaArrowCircleRight className="fs-2" color="red" /> },
        { label: "Help", icon: <FaQuestionCircle className="fs-2" color="red" /> },
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li><img src={neuLogo} alt="neu logo" width="60" /></li>
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label} </Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation