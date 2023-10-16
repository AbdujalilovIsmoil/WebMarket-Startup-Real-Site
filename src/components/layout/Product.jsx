import { get } from "lodash";
import { useFetch } from "hook";
import { storage } from "services";
import { toast } from "react-toastify";
import { Pagination } from "components/layout";
import { useNavigate } from "react-router-dom";
import { Button, Loader } from "components/field";
import React, { useEffect, useState } from "react";
import { GET_PRODUCT, LOADER } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "assets/icons";

const Product = () => {
  const allPageCounts = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { useGet, useDelete } = useFetch;
  const [index, setIndex] = useState(10);
  const token = storage.get("token") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const firstOperator = index * currentPage;
  const lastOperator = firstOperator - index;
  const [isLoader, setIsLoader] = useState(false);
  const { get_products = [] } = useSelector((state) => state);
  const sliceProducts = get_products.slice(lastOperator, firstOperator);

  for (let i = 0; i < Math.ceil(get_products.length / index); i++) {
    allPageCounts.push(i);
  }

  const handleClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const getProductsFunction = () => {
    const data = useGet({ api: "/productsmyown", token })
      .then((response) => {
        dispatch(LOADER());
        if (get(response, "status") === 200) {
          setIsLoader(false);
          dispatch(GET_PRODUCT(get(response, "data")));
        }
      })
      .catch(() => {
        setIsLoader(false);
      });
  };

  console.log(sliceProducts);

  useEffect(() => {
    setIsLoader(true);
    getProductsFunction();
  }, []);

  const deleteProductItem = (id) => {
    const data = useDelete({ api: `/products/${id}`, token })
      .then((response) => {
        if (get(response, "data.status") === 200) {
          getProductsFunction();
          toast.success("Product o'chirildi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
        }
      })
      .catch(() => {
        toast.error("Product o'chirilmadi", {
          autoClose: 3000,
          draggable: false,
          pauseOnHover: false,
          position: "top-right",
        });
      });
  };

  return (
    <>
      <div className="container">
        <section className="product">
          <div className="product-buttons">
            <Button
              type="button"
              className="product-buttons__btn"
              onClick={() => navigate("/product-create")}
            >
              Create
            </Button>
          </div>
          <div className="table-responsive">
            <table class="table-bordered w-100 align-middle mt-5 product-table">
              <thead>
                <tr className="product-table-room text-center">
                  <th className="product-table-room__thead">№</th>
                  <th className="product-table-room__thead">img</th>
                  <th className="product-table-room__thead">name</th>
                  <th className="product-table-room__thead">description</th>
                  <th className="product-table-room__thead">price</th>
                  <th className="product-table-room__thead">category</th>
                  <th className="product-table-room__thead">phone</th>
                  <th className="product-table-room__thead">product</th>
                  <th className="product-table-room__thead">github</th>
                  <th className="product-table-room__thead">edit</th>
                  <th className="product-table-room__thead">delete</th>
                </tr>
              </thead>

              <tbody>
                {!isLoader &&
                  sliceProducts.length > 0 &&
                  sliceProducts.map((el, index) => {
                    return (
                      <>
                        <tr
                          className="product-table-room text-center"
                          key={el._id}
                        >
                          <td className="product-table-room__data">
                            {index + 1}
                          </td>
                          <td className="product-table-room-data">
                            <img
                              className="product-table-room-data__img"
                              style={{ width: "45px", height: "45px" }}
                              src={
                                el.img_link
                                  ? el.img_link
                                  : "https://picsum.photos/id/30/30/30"
                              }
                            />
                          </td>
                          <td className="product-table-room__data text-black">
                            {el.name ? el.name : ""}
                          </td>
                          <td className="product-table-room__data text-black">
                            {el.desc ? el.desc : ""}
                          </td>
                          <td className="product-table-room__data text-black">
                            {el.price ? el.price : ""}
                          </td>
                          <td className="product-table-room__data text-black">
                            {el.category ? el.category : ""}
                          </td>
                          <td className="product-table-room__data text-black">
                            {el.phone_number ? el.phone_number : ""}
                          </td>
                          <td className="product-table-room-data">
                            <a
                              target="_blank"
                              className="product-table-room-data__link text-black"
                              href={el.product_link ? el.product_link : "#"}
                            >
                              Product Link
                            </a>
                          </td>
                          <td className="product-table-room-data">
                            <a
                              href={el.github_link ? el.github_link : "#"}
                              className="product-table-room-data__link text-black"
                            >
                              Github Link
                            </a>
                          </td>
                          <td className="product-table-room-data">
                            <AiOutlineEdit
                              onClick={() =>
                                navigate(`/product/product-edit/${el._id}`)
                              }
                              className="product-table-room-data__icon --first text-success"
                            />
                          </td>
                          <td className="product-table-room-data">
                            <AiOutlineDelete
                              className="product-table-room-data__icon --second"
                              onClick={() => deleteProductItem(el._id)}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            {!isLoader && sliceProducts.length === 0 && (
              <div className="table-error-content">
                <h1 className="text-center fs-1 text-light">NOT DATA</h1>
              </div>
            )}
            {isLoader && (
              <div className="section-container__loader">
                <Loader />
              </div>
            )}
          </div>
        </section>
        {get_products.length >= 10 && (
          <Pagination
            onPageChange={handleClick}
            pageCount={allPageCounts?.length}
          />
        )}
      </div>
    </>
  );
};

export default Product;
