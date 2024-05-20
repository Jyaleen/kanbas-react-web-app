const links = [
    {
        name: "Account",
        url: "#",
    },
    {
        name: "Dashboard",
        url: "#",
    },
    {
        name: "Courses",
        url: "#",
    },
    {
        name: "Calendar",
        url: "#",
    },
    {
        name: "Inbox",
        url: "#",
    },
    {
        name: "History",
        url: "#",
    },
    {
        name: "Studio",
        url: "#",
    },
    {
        name: "Commons",
        url: "#",
    },
    {
        name: "Help",
        url: "#",
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