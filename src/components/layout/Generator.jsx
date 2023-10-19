import { get } from "lodash";
import { useFetch } from "hook";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronDown } from "assets/icons";
import { useCollapse } from "react-collapsed";
import { useDispatch, useSelector } from "react-redux";
import { Input, Loader, NoData } from "components/field";
import { GET_TECHNOLOGIES, PRODUCT_DATA } from "store/actions";

const Generator = () => {
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  const { technologies, navbar } = useSelector((state) => state);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  useEffect(() => {
    setIsLoader(true);
    const data = useGet({ api: "/technologies", method: "get" })
      .then((response) => {
        if (get(response, "data.status") === 200) {
          setIsLoader(false);
          dispatch(GET_TECHNOLOGIES(get(response, "data.data")));
        }
      })
      .catch(() => setIsLoader(false));
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
    <div className={`wrapper ${navbar ? "--active" : ""}`}>
      <div className="generator">
        <div className="container">
          <div className="generator-container">
            <div className="generator-container-box">
              <div
                {...getToggleProps({
                  onClick: () => setExpanded((prevExpanded) => !prevExpanded),
                })}
                className="generator-container-box-collapse"
              >
                <h4 className="generator-container-box-collapse__title">
                  Static Site Generator
                </h4>
                <BsChevronDown
                  className={`generator-container-box-collapse__icon ${
                    isExpanded && "--active"
                  }`}
                />
              </div>
              <ul
                id="collapseExample"
                {...getCollapseProps()}
                className="generator-container-box-list"
              >
                {isLoader ? (
                  <div className="generator-loader">
                    <Loader />
                  </div>
                ) : technologies?.length > 0 ? (
                  technologies.map((el) => {
                    return (
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
                    );
                  })
                ) : (
                  <NoData />
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
              <NavLink className="generator-list-item__link" to="/pages/blog">
                Blog
              </NavLink>
            </li>
            <li className="generator-list-item">
              <NavLink className="generator-list-item__link" to="/pages/teamByUs">
                Team By Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Generator;
