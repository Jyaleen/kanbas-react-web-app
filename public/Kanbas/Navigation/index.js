const links = [
    {
        name: "Account",
        url: "/Kanbas/Account/Profile/screen.html",
    },
    {
        name: "Dashboard",
        url: "/Kanbas/Dashboard/screen.html",
    },
    {
        name: "Courses",
        url: "/Kanbas/Courses/Home/screen.html",
    },
    {
        name: "Calendar",
        url: "/Kanbas/Calendar/index.html",
    },
    {
        name: "Inbox",
        url: "/Kanbas/Inbox/index.html",
    },
    {
        name: "History",
        url: "/Kanbas/History/index.html",
    },
    {
        name: "Studio",
        url: "/Kanbas/Studio/index.html",
    },
    {
        name: "Commons",
        url: "/Kanbas/Commons/index.html",
    },
    {
        name: "Help",
        url: "/Kanbas/Help/index.html",
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