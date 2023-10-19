import { BlogCard1, BlogCard2 } from "assets/images/jpg";

export const blogData = [
  {
    id: 1,
    hidden: true,
    img: BlogCard1,
    name: "Boilerplate",
    date: "02 Jun 2023",
    description: `
        Static site generators have become popular for creating fast,
        secure, and maintainable websites. Starting a project from scratch
        can be time-consuming, which is where boilerplates come in. These
        pre-...  
      `,
    title: "8 Awesomes Boilerplates For Static Site Generators",
  },
  {
    id: 2,
    hidden: true,
    img: BlogCard2,
    name: "Static site generators",
    date: "04 Apr 2023",
    description: `
        In the world of website development, static site generators have
        gained immense popularity in recent years. With their easy setup and
        low maintenance, they have become a favorite among developers and...  
      `,
    title: "Want a Blazing-Fast Website? Try These 7 Static Site Generators",
  },
];

export const links = [
  {
    id: 1,
    link: "/",
    title: "Home",
  },
  {
    id: 2,
    link: "pages/blog",
    title: "Blog",
  },
  {
    id: 3,
    link: "pages/teamByUs",
    title: "Team By Us",
  },
];
