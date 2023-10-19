import { blogData } from "data";
import { BlogIntro } from "assets/images/svg";

const BlogCards = () => {
  return (
    <div className="blog-cards-container">
      {blogData.length > 0 &&
        blogData.map((el) => {
          return (
            el.hidden && (
              <div className="blog-cards-container-box">
                <img
                  src={el.img}
                  alt="BlogCard1"
                  title="BlogCard1"
                  className="blog-cards-container-box__img"
                />
                <div className="blog-cards-container-box-content">
                  <h4 className="blog-cards-container-box-content__name">
                    {el.name}
                  </h4>
                  <h4 className="blog-cards-container-box-content__title">
                    {el.title}
                  </h4>
                  <div className="blog-cards-container-box-content-date">
                    <div className="blog-cards-container-box-content-date-box">
                      <img
                        src={BlogIntro}
                        alt="BlogIntro"
                        title="BlogIntro"
                        className="blog-cards-container-box-content-date-box__intro"
                      />
                      <h5 className="blog-cards-container-box-content-date-box__name">
                        Statichunt
                      </h5>
                    </div>
                    <div className="blog-cards-container-box-content-date-box">
                      <h5 className="blog-cards-container-box-content-date-box__date">
                        {el.date}
                      </h5>
                    </div>
                  </div>
                  <p className="blog-cards-container-box-content__description">
                    {el.description}
                  </p>
                </div>
              </div>
            )
          );
        })}
    </div>
  );
};

export default BlogCards;
