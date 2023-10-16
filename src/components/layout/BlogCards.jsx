import { BlogIntro } from "assets/images/svg";
import { BlogCard1, BlogCard2 } from "assets/images/jpg";

const BlogCards = () => {
  return (
    <>
      <div className="blog-cards-container">
        <div className="blog-cards-container-box">
          <img
            src={BlogCard1}
            alt="BlogCard1"
            title="BlogCard1"
            className="blog-cards-container-box__img"
          />
          <div className="blog-cards-container-box-content">
            <h4 className="blog-cards-container-box-content__name">
              Boilerplate
            </h4>
            <h4 className="blog-cards-container-box-content__title">
              8 Awesomes Boilerplates For Static Site Generators
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
                  02 Jun 2023
                </h5>
              </div>
            </div>
            <p className="blog-cards-container-box-content__description">
              Static site generators have become popular for creating fast,
              secure, and maintainable websites. Starting a project from scratch
              can be time-consuming, which is where boilerplates come in. These
              pre-...
            </p>
          </div>
        </div>
        <div className="blog-cards-container-box">
          <img
            src={BlogCard2}
            alt="BlogCard2"
            title="BlogCard2"
            className="blog-cards-container-box__img"
          />
          <div className="blog-cards-container-box-content">
            <h4 className="blog-cards-container-box-content__name">
              Static site generators
            </h4>
            <h4 className="blog-cards-container-box-content__title">
              Want a Blazing-Fast Website? Try These 7 Static Site Generators
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
                  04 Apr 2023
                </h5>
              </div>
            </div>
            <p className="blog-cards-container-box-content__description">
              In the world of website development, static site generators have
              gained immense popularity in recent years. With their easy setup
              and low maintenance, they have become a favorite among developers
              and...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCards;
