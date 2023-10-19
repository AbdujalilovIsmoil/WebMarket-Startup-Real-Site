import { get } from "lodash";
import { useFetch } from "hook";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { ABOUT_DATA } from "store/actions";
import { useNavigate } from "react-router-dom";

const Card = ({ ...rest }) => {
  const { useGet } = useFetch;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    navigate(`/pages/about/${get(rest, "items._id", "")}`);
    const data = useGet({
      api: `/products/${get(rest, "items._id", "")}`,
    }).then((response) =>
      dispatch(ABOUT_DATA([get(response, "data.data.data")]))
    );
  };

  return (
    <div
      onClick={() => clickHandler()}
      className="section-container-box-cards-card"
    >
      <div className="section-container-box-cards-card-box">
        <img
          alt="cardImg"
          title="cardImg"
          src={get(rest, "items.img_link", "")}
          className="section-container-box-cards-card-box__img"
        />
        <div className="section-container-box-cards-card-box-content">
          <div className="section-container-box-cards-card-box-content-header">
            <h3 className="section-container-box-cards-card-box-content-header__title">
              {get(rest, "items.name", "")}
            </h3>
            <h5 className="section-container-box-cards-card-box-content-header-price">
              <span className="section-container-box-cards-card-box-content-header-price__number">
                {get(rest, "items.price", 0) ? (
                  <Fragment>{get(rest, "items.price", 0)}$</Fragment>
                ) : (
                  "Free"
                )}
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
                    <Fragment key={el._id}>
                      <img
                        alt="Lang1"
                        title="Lang1"
                        src={el.img_link}
                        className="section-container-box-cards-card-box-footer-box__icon"
                      />
                    </Fragment>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
