import { get } from "lodash";
import { useFetch } from "hook";
import { ABOUT_DATA } from "store/actions";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Loader, NoData } from "components/field";

const About = () => {
  const { id } = useParams();
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const { about_data } = useSelector((state) => state);

  useEffect(() => {
    setIsLoader(true);
    const data1 = useGet({ api: `/products/${id}` })
      .then((response) => {
        if (get(response, "status") === 200) {
          setIsLoader(false);
          dispatch(ABOUT_DATA([get(response, "data.data.data")]));
        }
      })
      .catch(() => setIsLoader(false));

    const data2 = useGet({ api: "/products" })
      .then((response) => {
        if (get(response, "status") === 200) {
          setIsLoader(false);
          setProducts(get(response, "data.data", []).slice(1, 5));
        }
      })
      .catch(() => setIsLoader(false));
  }, []);

  return (
    <div className="container">
      <section className="about w-100">
        {isLoader ? (
          <div className="section-container__loader">
            <Loader />
          </div>
        ) : about_data?.length > 0 ? (
          about_data.map((el) => {
            return (
              <>
                <div className="about-container" key={el?._id}>
                  <div className="about-container-box">
                    <img
                      src={el?.img_link}
                      alt="BreakPoint"
                      title="BreakPoint"
                      className="about-container-box__img"
                    />
                    <h2 className="about-container-box__title">
                      Key Features :
                    </h2>
                    <p className="about-container-box__description">
                      {el?.desc}
                    </p>
                  </div>
                  <div className="about-container-box">
                    <h3 className="about-container-box__title">{el?.name}</h3>
                    <p className="about-container-box__description">
                      {el?.desc}
                    </p>
                    <div className="about-container-box-buttons">
                      <Link
                        to={`/pages/liveSite/${el?._id}`}
                        className="about-container-box-buttons__btn"
                      >
                        Live Demo
                      </Link>
                      {el.download ? (
                        <a
                          target="_blank"
                          href={el?.github_link}
                          className="about-container-box-buttons__btn"
                        >
                          Download
                        </a>
                      ) : (
                        <Button
                          type="button"
                          disabled={el.download}
                          className="about-container-box-buttons__btn"
                        >
                          Don't Download
                        </Button>
                      )}
                    </div>
                    <div className="about-container-box-information">
                      <h2 className="about-container-box-information__title">
                        Theme Information:
                      </h2>
                      <ul className="about-container-box-information-list w-100">
                        {!el.download ? (
                          <li className="about-container-box-information-list-item">
                            <h4 className="about-container-box-information-list-item__key">
                              Price :
                            </h4>
                            <h4 className="about-container-box-information-list-item__value">
                              {el?.price}$
                            </h4>
                          </li>
                        ) : null}

                        <li className="about-container-box-information-list-item">
                          <h4 className="about-container-box-information-list-item__key">
                            Types:
                          </h4>
                          <div className="about-container-box-information-list-item-images w-100">
                            {isLoader && (
                              <div className="section-container__loader">
                                <Loader />
                              </div>
                            )}
                            {!isLoader &&
                              el?.technologies?.length > 0 &&
                              el?.technologies.map((el) => {
                                return (
                                  <Fragment key={el._id}>
                                    <img
                                      src={el.img_link}
                                      alt="Lang1"
                                      title="Lang1"
                                      className="about-container-box-information-list-item-images__icon"
                                    />
                                  </Fragment>
                                );
                              })}
                          </div>
                        </li>
                        <li className="about-container-box-information-list-item">
                          <h4 className="about-container-box-information-list-item__key">
                            Create by:
                          </h4>
                          <div className="about-container-box-information-list-item-images w-100">
                            {isLoader ? (
                              <div className="section-container__loader">
                                <Loader />
                              </div>
                            ) : el.user.username ? (
                              <h6 className="about-container-box-information-list-item-images__username">
                                {el.user.username}
                              </h6>
                            ) : (
                              <NoData />
                            )}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <NoData />
        )}
        <div className="about-cards">
          {isLoader ? (
            <div className="section-container__loader">
              <Loader />
            </div>
          ) : (
            products.length > 0 &&
            products.map((el) => {
              return <Card items={el} />;
            })
          )}
        </div>
        {!isLoader && products.length === 0 && (
          <div className="d-flex justify-content-center">
            <NoData />
          </div>
        )}
      </section>
    </div>
  );
};

export default About;
