import { get } from "lodash";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const index = memo(({ ...rest }) => {
  return (
    <>
      <Link
        to={`/About/${get(rest, "items._id", "")}`}
        className="section-container-box-cards-card"
      >
        <div className="section-container-box-cards-card-box">
          <img
            src={get(rest, "items.img_link", "")}
            alt="cardImg"
            title="cardImg"
            className="section-container-box-cards-card-box__img"
          />
          <div className="section-container-box-cards-card-box-content">
            <div className="section-container-box-cards-card-box-content-header">
              <h3 className="section-container-box-cards-card-box-content-header__title">
                {get(rest, "items.name", "")}
              </h3>
              <h5 className="section-container-box-cards-card-box-content-header-price">
                <span className="section-container-box-cards-card-box-content-header-price__number">
                  {get(rest, "items.price", 0)}$
                </span>
              </h5>
            </div>
            <p className="section-container-box-cards-card-box-content-description">
              {get(rest, "items.user.username", "")}
            </p>
          </div>
          <div className="section-container-box-cards-card-box-footer">
            <div className="section-container-box-cards-card-box-footer-box --first">
              {get(rest, "items.technology", []).length > 0
                ? get(rest, "items.technology", []).map((el) => {
                    return (
                      <React.Fragment key={el._id}>
                        <img
                          src={el.img_link}
                          alt="Lang1"
                          title="Lang1"
                          className="section-container-box-cards-card-box-footer-box__icon"
                        />
                      </React.Fragment>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
});

export default index;
