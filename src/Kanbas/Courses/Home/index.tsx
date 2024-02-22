import ModuleList from "../Modules/List";
import "./index.css";

function Home() {
  return (
    <div className="home">
      <div className="col">
        <ModuleList />
      </div>
      <div className="status col">
        <h4>Course Status</h4>
        <table>
          <tbody>
            <tr>
              <td>
                <button>Unpublish</button>
                <button>Published</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button>Import Existing Content</button><br />
        <button>Import from Commons</button><br />
        <button>Choose Home Page</button><br />
        <button>View Course Stream</button><br />
        <button>New Announcements</button><br />
        <button>New Analytics</button><br />
        <button>View Course Notifications</button><br />
        <h4>Coming Up</h4>
        <a href="/Kanbas/Courses/Calendar/screen.html">View Calendar</a>
        <ul>
          <li><a href="/Kanbas/Courses/Calendar/screen.html">CS4550 02 SP24</a></li>
          <li><a href="/Kanbas/Courses/Calendar/screen.html">CS4550 01 SP24</a></li>
          <li><a href="/Kanbas/Courses/Calendar/screen.html">CS4550 02 SP24</a></li>
        </ul>
      </div>
    </div>
  );
}
export default Home;