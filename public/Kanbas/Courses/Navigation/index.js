const links = [
    {
        name: "Home",
        url: "/Kanbas/Courses/Home/screen.html",
    },
    {
        name: "Modules",
        url: "/Kanbas/Courses/Modules/screen.html",
    },
    {
        name: "Piazza",
        url: "/Kanbas/Courses/Piazza/index.html",
    },
    {
        name: "Zoom Meetings",
        url: "/Kanbas/Courses/Zoom Meetings/index.html",
    },
    {
        name: "Assignments",
        url: "/Kanbas/Courses/Assignments/screen.html",
    },
    {
        name: "Quizzes",
        url: "/Kanbas/Courses/Quizzes/index.html",
    },
    {
        name: "Grades",
        url: "/Kanbas/Courses/Grades/screen.html",
    },
    {
        name: "People",
        url: "/Kanbas/Courses/People/index.html",
    },
    {
        name: "Panopto Video",
        url: "/Kanbas/Courses/Panopto Video/index.html",
    },
    {
        name: "Discussions",
        url: "/Kanbas/Courses/Discussions/index.html",
    },
    {
        name: "Announcements",
        url: "/Kanbas/Courses/Announcements/index.html",
    },
    {
        name: "Pages",
        url: "/Kanbas/Courses/Pages/index.html",
    },
    {
        name: "Files",
        url: "/Kanbas/Courses/Files/index.html",
    },
    {
        name: "Rubrics",
        url: "/Kanbas/Courses/Rubrics/index.html",
    },
    {
        name: "Outcomes",
        url: "/Kanbas/Courses/Outcomes/index.html",
    },
    {
        name: "Collaboration",
        url: "/Kanbas/Courses/Collaboration/index.html",
    },
    {
        name: "Syllabus",
        url: "/Kanbas/Courses/Syllabus/index.html",
    },
    {
        name: "Settings",
        url: "/Kanbas/Courses/Settings/index.html",
    },
];
document.write(`
    <ul>
      ${links
        .map((link) => {
            return `<li><a href="${link.url}">${link.name}</a></li>`;
        })
        .join("")}
  </ul>     
    `);