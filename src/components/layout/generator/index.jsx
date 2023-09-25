import { get } from "lodash";
import { useFetch } from "hook";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronDown } from "assets/icons";
import { Input, Loader } from "components/field";
import { useDispatch, useSelector } from "react-redux";
import { GET_TECHNOLOGIES, PRODUCT_DATA, LOADER } from "store/actions";

const index = () => {
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [generatorOpen, setGeneratorOpen] = useState(false);
  const { technologies, navbar, loader, products } = useSelector(
    (state) => state
  );

  useEffect(() => {
    const data = useGet({ api: "/technologies", method: "get" })
      .then((response) => {
        if (get(response, "data.status") === 200) {
          dispatch(GET_TECHNOLOGIES(get(response, "data.data")));
          dispatch(LOADER());
        }
      })
      .catch(() => {
        dispatch(LOADER());
      });
  }, []);

  const changeTechnologies = ({ e, name }) => {
    if (e.target.checked === true) {
      const data = useGet({
        method: "get",
        api: `/technologies?name=${name}`,
      }).then((response) => {
        if (get(response, "data.status") === 200) {
          dispatch(PRODUCT_DATA(get(response, "data.data")));
        }
      });
    }
    if (e.target.checked === false) {
      const data = useGet({
        method: "get",
        api: `/products`,
      }).then((response) => {
        if (get(response, "data.status") === 200) {
          dispatch(PRODUCT_DATA(get(response, "data.data")));
        }
      });
    }
  };

  if (navbar) {
    document.body.classList.add("hide");
  } else {
    document.body.classList.remove("hide");
  }

  return (
    <>
      <div className={`wrapper ${navbar && "--active"}`}>
        <div className="generator">
          <div className="container">
            <div className="generator-container">
              <div className="generator-container-box">
                <div
                  data-mdb-toggle="collapse"
                  data-mdb-target="#collapseExample"
                  className="generator-container-box-collapse"
                  onClick={() => setGeneratorOpen((prevState) => !prevState)}
                >
                  <h4 className="generator-container-box-collapse__title">
                    Static Site Generator
                  </h4>
                  <BsChevronDown className="generator-container-box-collapse__icon" />
                </div>
                <ul
                  className="generator-container-box-list"
                  id="collapseExample"
                >
                  {loader ? (
                    <div className="generator-loader">
                      <Loader />
                    </div>
                  ) : technologies.length > 0 ? (
                    technologies.map((el) => {
                      return (
                        <>
                          <li
                            key={el?._id}
                            className="generator-container-box-list-item"
                          >
                            <Input
                              type="checkbox"
                              id={el?._id}
                              className="generator-container-box-list-item__input"
                              onChange={(e) =>
                                changeTechnologies({ e, name: el.name })
                              }
                            />
                            <label
                              className="generator-container-box-list-item-label"
                              htmlFor={el?._id}
                            >
                              <div className="generator-container-box-list-item-label-icons">
                                <img
                                  alt="GeneratorIcon1"
                                  src={el.img_link ? el.img_link : ""}
                                  title="GeneratorIcon1"
                                  className="generator-container-box-list-item-label-icons__language"
                                />
                                <h4 className="generator-container-box-list-item-label-icons__title">
                                  {el.name ? el.name : ""}
                                </h4>
                              </div>
                              <h4 className="generator-container-box-list-item-label__number">
                                {el.count ? el.count : 0}
                              </h4>
                            </label>
                          </li>
                        </>
                      );
                    })
                  ) : (
                    <h1 className="text-center text-light">NOT FOUND</h1>
                  )}
                </ul>
              </div>
            </div>
            <ul className="generator-list">
              <li className="generator-list-item">
                <NavLink className="generator-list-item__link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="generator-list-item">
                <NavLink className="generator-list-item__link" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="generator-list-item">
                <NavLink className="generator-list-item__link" to="/teamByUs">
                  Team By Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
