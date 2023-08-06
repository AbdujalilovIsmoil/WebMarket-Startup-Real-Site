import { get } from "lodash";
import { toast } from "react-toastify";
import { useFetch } from "../../../hook";
import { Input, Button } from "../../field";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../services/storage";
import { USERNAME } from "../../../store/actions";
import React, { memo, useEffect, useState } from "react";

const index = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = storage.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [imageLink, setImageLink] = useState("");
  const { useGet, usePostUpload, usePut } = useFetch;
  const [portfolioLink, setPortfolioLink] = useState("");

  useEffect(() => {
    const data = useGet({ api: "/usersown", token }).then((response) => {
      if (get(response, "status") === 200) {
        setEmail(get(response, "data.data[0].email"));
        setUsername(get(response, "data.data[0].username"));
        setPassword(get(response, "data.data[0].password"));
        setImageLink(get(response, "data.data[0].imageLink"));
        setPortfolioLink(get(response, "data.data[0].portfolioLink"));
      }
    });
  }, []);

  const postImageLinkFunction = (picsum) => {
    if (picsum.type === "image/jpeg" || picsum.type === "image/png") {
      const data = new FormData();
      data.append("file", picsum);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "roadsidecoder");
      const postData = usePostUpload({ values: data }).then((response) => {
        if (get(response, "status") === 200) {
          setImageLink(get(response, "data.url", ""));
        }
      });
    }
  };

  const postData = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      username,
      imageLink,
      portfolioLink,
    };
    const updateData = usePut({ api: "/users", token, values: data })
      .then((response) => {
        if (get(response, "status") === 200) {
          storage.set("username", get(response, "data.data.username"));
          dispatch(USERNAME(get(response, "data.data.username")));
          setEmail("");
          setPassword("");
          setUsername("");
          setImageLink("");
          setPortfolioLink("");
          navigate("/profile");
          toast.success("User ma'lumoti o'zgartirildi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
        }
        if (get(response, "status") !== 200) {
          toast.error("User ma'lumoti o'zgartirilmadi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
        }
      })
      .catch(() => {
        toast.error("User ma'lumoti o'zgartirilmadi", {
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
        <form className="product-form" onSubmit={(e) => postData(e)}>
          <label className="product-form-label" htmlFor="#">
            <Input
              required
              type="text"
              value={username}
              placeholder="Enter your name"
              className="product-form-label__input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="product-form-label" htmlFor="#">
            <Input
              disabled
              required
              type="email"
              value={email}
              placeholder="Enter your email"
              className="product-form-label__input --active"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="product-form-label" htmlFor="#">
            <Input
              required
              type="password"
              value={password}
              placeholder="Enter your password"
              className="product-form-label__input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="product-form-label" htmlFor="#">
            <Input
              type="text"
              value={portfolioLink}
              className="product-form-label__input"
              placeholder="Enter your site demo preview link"
              onChange={(e) => setPortfolioLink(e.target.value)}
            />
          </label>
          <label className="product-form-label" htmlFor="file-upload">
            <Input
              hidden
              type="file"
              name="file"
              id="file-upload"
              multiple={true}
              className="product-form-label__input"
              onChange={(e) => {
                postImageLinkFunction(e.target.files[0]);
              }}
            />
            <div
              className={`product-form-label-upload ${
                imageLink ? "active" : ""
              }`}
            >
              {imageLink ? (
                <img
                  src={imageLink}
                  alt=""
                  className="product-form-label-upload__img"
                />
              ) : (
                <h2 className="text-light">RASM YUKLANG</h2>
              )}
            </div>
          </label>
          <Button className="product-form__btn" type="submit">
            Send
          </Button>
        </form>
      </div>
    </>
  );
});

export default index;
