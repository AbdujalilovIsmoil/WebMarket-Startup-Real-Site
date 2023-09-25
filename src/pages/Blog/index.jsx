import { BlogTitles, BlogCards } from "components/layout";

const index = () => {
  return (
    <>
      <section className="blog">
        <div className="container">
          <BlogTitles />
          <BlogCards />
        </div>
      </section>
    </>
  );
};

export default index;
