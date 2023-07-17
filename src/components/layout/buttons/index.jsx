import { get } from "lodash";
import { useFetch } from "../../../hook";
import { memo, useEffect, useState } from "react";
import { Button, Input, Loader } from "../../field";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_DATA, LOADER } from "../../../store/actions";

const index = memo(() => {
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const { loader, products } = useSelector((state) => state);

  useEffect(() => {
    const data = useGet({ api: "/categories" }).then((response) => {
      if (get(response, "status") === 200) {
        setCategories(get(response, "data"));
      }
    });
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
    <>
      <div className="section-container-box-buttons-container">
        {loader ? (
          <div className="buttons-loader">
            <Loader />
          </div>
        ) : categories.length > 0 ? (
          categories.map((el) => {
            return (
              <>
                <label className="section-container-box-buttons-container-label">
                  <Input
                    type="checkbox"
                    className="section-container-box-buttons-container-label__input"
                    onChange={(e) =>
                      changeBtn({ type: e, category: el.category })
                    }
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
              </>
            );
          })
        ) : (
          <h1>NOT FOUND</h1>
        )}
      </div>
    </>
  );
});

export default index;
