import { get } from "lodash";
import { useFetch } from "../../hook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { storage } from "../../services/storage";
import { useDispatch, useSelector } from "react-redux";
import { GET_TECHNOLOGIES } from "../../store/actions";
import React, { memo, useEffect, useState } from "react";
import { Input, Button, Select, Textarea } from "../../components/field";

const index = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = storage.get("token");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [img_link, setImgLink] = useState("");
  const [category, setCategory] = useState("");
  const [technology, setTechnology] = useState([]);
  const [github_link, setGithubLink] = useState("");
  const { useGet, usePostUpload, usePost } = useFetch;
  const [product_link, setProductLink] = useState("");
  const { technologies } = useSelector((state) => state);
  const [categoryData, setCategoryData] = useState([]);
  useEffect(() => {
    const data = useGet({ api: "/categories" }).then((response) => {
      if (get(response, "status") === 200) {
        setCategoryData(get(response, "data"));
      }
    });
  }, []);

  useEffect(() => {
    const data = useGet({ api: "/technologies" }).then((response) => {
      if (get(response, "status") === 200) {
        dispatch(GET_TECHNOLOGIES(get(response, "data.data")));
      }
    });
  }, []);

  const getTechnologyIdFunction = ({ type, id }) => {
    if (type === true) {
      setTechnology([...technology, id]);
    }
  };

  const postImageLinkFunction = (picsum) => {
    if (picsum.type === "image/jpeg" || picsum.type === "image/png") {
      const data = new FormData();
      data.append("file", picsum);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "roadsidecoder");
      const postData = usePostUpload({ values: data }).then((response) => {
        if (get(response, "status") === 200) {
          setImgLink(get(response, "data.url", ""));
        }
      });
    }
  };

  const sendProductData = (e) => {
    e.preventDefault();
    const productData = {
      name,
      desc,
      price,
      phone,
      category,
      img_link,
      technology,
      github_link,
      product_link,
    };
    const data = usePost({ api: "/products", token, values: productData })
      .then((response) => {
        console.log(response);
        if (get(response, "status") === 200) {
          setName("");
          setDesc("");
          setPrice("");
          setPhone("");
          setImgLink("");
          setCategory("");
          setTechnology([]);
          setGithubLink("");
          setProductLink("");
          navigate("/product");
          toast.success("Product yaratildi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
        }
      })
      .catch(() => {
        toast.error("Product yaratilmadi", {
          autoClose: 3000,
          draggable: false,
          pauseOnHover: false,
          position: "top-right",
        });
      });
  };
  console.log(category);

  return (
    <>
      <div className="container">
        <section className="product-create">
          <form
            action="#"
            className="product-create-form"
            onSubmit={(e) => sendProductData(e)}
          >
            <div className="product-create-form-box">
              <label className="product-create-form-box-label" htmlFor="#">
                <Input
                  required
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  className="product-create-form-box-label__input"
                />
              </label>
              <label className="product-create-form-box-label" htmlFor="#">
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="product-create-form-box-label-select"
                >
                  <option value="" disabled>
                    Select to category
                  </option>
                  {categoryData.length > 0
                    ? categoryData.map((el) => {
                        return (
                          <option
                            className="product-create-form-box-label-select__option"
                            value={el.category}
                          >
                            {el.category}
                          </option>
                        );
                      })
                    : ""}
                </Select>
              </label>
            </div>
            <div className="product-create-form-box">
              <label className="product-create-form-box-label" htmlFor="#">
                <Input
                  required
                  type="text"
                  value={product_link}
                  placeholder="Enter your site demo preview link"
                  className="product-create-form-box-label__input"
                  onChange={(e) => setProductLink(e.target.value)}
                />
              </label>
              <label className="product-create-form-box-label" htmlFor="#">
                <Input
                  required
                  type="text"
                  value={github_link}
                  placeholder="Enter your repo github link"
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="product-create-form-box-label__input"
                />
              </label>
            </div>
            <div className="product-create-form-box">
              <label className="product-create-form-box-label" htmlFor="#">
                <Input
                  required
                  type="number"
                  value={phone}
                  placeholder="Enter your phone"
                  onChange={(e) => setPhone(e.target.value)}
                  className="product-create-form-box-label__input"
                />
              </label>
              <label className="product-create-form-box-label" htmlFor="#">
                <Input
                  required
                  type="number"
                  value={price}
                  placeholder="Enter your price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="product-create-form-box-label__input"
                />
              </label>
            </div>
            <label className="product-create-form-label" htmlFor="file-upload">
              <Input
                hidden
                type="file"
                name="file"
                multiple={true}
                id="file-upload"
                className="product-create-form-label__input"
                onChange={(e) => {
                  postImageLinkFunction(e.target.files[0]);
                }}
              />
              <div
                className={`product-create-form-label-upload ${
                  img_link && "--active"
                }`}
              >
                {img_link ? (
                  <img
                    alt={img_link}
                    src={img_link}
                    className="product-create-form-label-upload__img"
                  />
                ) : (
                  <h2 className="text-light">RASM YUKLANG</h2>
                )}
              </div>
            </label>
            <Textarea
              required
              value={desc}
              placeholder="Enter your description"
              onChange={(e) => setDesc(e.target.value)}
              className="product-create-form-description"
            ></Textarea>
            <div className="product-create-form-technologies">
              {technologies.length > 0
                ? technologies.map((el) => {
                    return (
                      <>
                        <label
                          htmlFor="check"
                          className="product-create-form-technologies-label"
                        >
                          <Input
                            type="checkbox"
                            onChange={(e) => {
                              getTechnologyIdFunction({
                                type: e.target.checked,
                                id: el._id,
                              });
                            }}
                            className="product-create-form-technologies-label__input"
                          />
                          <Button
                            type="button"
                            className="product-create-form-technologies-label-btn"
                          >
                            <h5 className="product-create-form-technologies-label-btn__name">
                              {el.name}
                            </h5>
                            <h5 className="product-create-form-technologies-label-btn__number">
                              {el.count}
                            </h5>
                          </Button>
                        </label>
                      </>
                    );
                  })
                : ""}
            </div>
            <Button className="product-create-form__submit" type="submit">
              Send
            </Button>
          </form>
        </section>
      </div>
    </>
  );
});

export default index;
