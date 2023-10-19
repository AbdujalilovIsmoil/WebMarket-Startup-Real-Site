import { BlogTitles, BlogCards } from "components/layout";

const Blog = () => {
  return (
    <section className="blog">
      <div className="container">
        <BlogTitles />
        <BlogCards />
      </div>
    </section>
  );
};

export default Blog;
