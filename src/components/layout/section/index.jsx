import { get } from "lodash";
import { useFetch } from "hook";
import { Card, Loader } from "components/field";
import { PRODUCT_DATA, LOADER } from "store/actions";
import { Fragment, useEffect, useState } from "react";
import Pagination from "components/layout/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Generator, Content, Buttons, Form } from "components/layout";

const index = () => {
  const allPageCounts = [];
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const [index, setIndex] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const firstOperator = index * currentPage;
  const lastOperator = firstOperator - index;
  const { products = [], loader } = useSelector((state) => state);
  const sliceProducts = products.slice(lastOperator, firstOperator);

  for (let i = 0; i < Math.ceil(products.length / index); i++) {
    allPageCounts.push(currentPage);
  }
  const handleClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  useEffect(() => {
    const data = useGet({ api: "/products" })
      .then((response) => {
        if (get(response, "status") === 200) {
          dispatch(PRODUCT_DATA(get(response, "data.data")));
          dispatch(LOADER());
        }
      })
      .catch(() => {
        dispatch(LOADER());
      });
  }, []);

  return (
    <>
      <section className="section">
        <div className="section-container">
          <div className="section-container-box">
            <Generator />
          </div>
          <div className="container">
            <div className="section-container-box">
              <Content />
              <div className="section-container-box-buttons">
                <Buttons />
                <div className="section-container-box-buttons-form">
                  <Form />
                </div>
              </div>
              <div className="section-container-box-cards">
                {loader ? (
                  <div className="card-loader">
                    <Loader />
                  </div>
                ) : sliceProducts.length > 0 ? (
                  sliceProducts.map((el) => {
                    return (
                      <Fragment>
                        <Card items={el} />
                      </Fragment>
                    );
                  })
                ) : (
                  <h1 className="text-center text-light">NOT FOUND</h1>
                )}
              </div>
              {products.length >= 9 && (
                <Pagination
                  onPageChange={handleClick}
                  pageCount={allPageCounts?.length}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
