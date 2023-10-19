import { get } from "lodash";
import { useFetch } from "hook";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { PRODUCT_DATA } from "store/actions";
import { Button, Input, Loader } from "components/field";

const Buttons = () => {
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsLoader(true);
    const data = useGet({ api: "/categories" })
      .then((response) => {
        if (get(response, "status") === 200) {
          setIsLoader(false);
          setCategories(get(response, "data"));
        }
      })
      .catch(() => setIsLoader(false));
  }, []);

  const changeBtn = ({ category, type }) => {
    if (type.target.checked === true) {
      const data = useGet({ api: `/products?category=${category}` }).then(
        (response) => {
          if (get(response, "status") === 200) {
            dispatch(PRODUCT_DATA(get(response, "data.data")));
          }
        }
      );
    }
    if (type.target.checked === false) {
      const data = useGet({ api: "/products" }).then((response) => {
        if (get(response, "status") === 200) {
          dispatch(PRODUCT_DATA(get(response, "data.data")));
        }
      });
    }
  };

  return (
    <div className="section-container-box-buttons-container">
      {isLoader ? (
        <div className="buttons-loader">
          <Loader />
        </div>
      ) : categories.length > 0 ? (
        categories.map((el) => {
          return (
            <label className="section-container-box-buttons-container-label">
              <Input
                type="checkbox"
                className="section-container-box-buttons-container-label__input"
                onChange={(e) => changeBtn({ type: e, category: el.category })}
              />
              <Button
                type="button"
                className="section-container-box-buttons-container-label-btn"
              >
                <h5 className="section-container-box-buttons-container-label-btn__name">
                  {el.category}
                </h5>
                <h5 className="section-container-box-buttons-container-label-btn__number">
                  {el.count}
                </h5>
              </Button>
            </label>
          );
        })
      ) : (
        <h1 className="text-light text-center w-100">NOT DATA</h1>
      )}
    </div>
  );
};

export default Buttons;
