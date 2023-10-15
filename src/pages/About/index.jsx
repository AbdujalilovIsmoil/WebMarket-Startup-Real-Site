import { get } from "lodash";
import { useFetch } from "hook";
import { Link, useParams } from "react-router-dom";
import { LOADER, ABOUT_DATA } from "store/actions";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Loader } from "components/field";

const index = () => {
  const { id } = useParams();
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const { loader } = useSelector((state) => state);
  const { about_data } = useSelector((state) => state);
  useEffect(() => {
    const data = useGet({ api: `/products/${id}` })
      .then((response) => {
        if (get(response, "status") === 200) {
          dispatch(ABOUT_DATA([get(response, "data.data.data")]));
          dispatch(LOADER());
        }
      })
      .catch(() => {
        dispatch(LOADER());
      });
  }, []);

  useEffect(() => {
    const data = useGet({ api: "/products" })
      .then((response) => {
        if (get(response, "status") === 200) {
          dispatch(LOADER());
          setProducts(get(response, "data.data", []).slice(1, 5));
        }
      })
      .catch(() => {
        dispatch(LOADER());
      });
  }, []);

  return (
    <>
      <div className="container">
        <section className="about w-100">
          {loader ? (
            <div className="text-center">
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
                          to={`/liveSite/${el?._id}`}
                          className="about-container-box-buttons__btn"
                        >
                          Live Demo
                        </Link>
                        {el.download ? (
                          <a
                            target="_blank"
                            className="about-container-box-buttons__btn"
                            href={el?.github_link}
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
                              {loader ? (
                                <div className="text-center w-100">
                                  <Loader />
                                </div>
                              ) : el?.technology?.length > 0 ? (
                                el.technology.map((el) => {
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
                                })
                              ) : (
                                <h1
                                  className="text-center text-light"
                                  style={{ fontSize: "17px" }}
                                >
                                  NOT FOUND
                                </h1>
                              )}
                            </div>
                          </li>
                          <li className="about-container-box-information-list-item">
                            <h4 className="about-container-box-information-list-item__key">
                              Create by:
                            </h4>
                            <div className="about-container-box-information-list-item-images w-100">
                              {loader ? (
                                <div className="text-center w-100">
                                  <Loader />
                                </div>
                              ) : el.user.username ? (
                                <h6 className="about-container-box-information-list-item-images__username">
                                  {el.user.username}
                                </h6>
                              ) : (
                                <h6 className="text-center text-light fs-5">
                                  NOT FOUND
                                </h6>
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
            <h1 className="text-center text-light">NOT FOUND</h1>
          )}
          <div className="about-cards">
            {loader ? (
              <>
                <Loader />
              </>
            ) : products.length > 0 ? (
              products.map((el) => {
                return (
                  <>
                    <Card items={el} />
                  </>
                );
              })
            ) : (
              <div className="d-flex justify-content-center">
                <h1 className="text-center text-light">NOT FOUND</h1>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default index;
