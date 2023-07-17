import { get } from "lodash";
import { toast } from "react-toastify";
import { useFetch } from "../../../hook";
import { Input, Button } from "../../field";
import React, { memo, useState } from "react";
import { storage } from "../../../services/storage";
import { USERNAME } from "../../../store/actions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const index = memo(() => {
  const { usePost } = useFetch;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const state = useSelector((state) => state);
  const [password, setPassword] = useState("");

  const postData = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    const data = usePost({ api: "/users/login", values: userData }).then(
      (response) => {
        if (get(response, "data.success") === true) {
          storage.set("token", get(response, "data.token"));
          storage.set("username", get(response, "data.data.username"));
          dispatch(USERNAME(get(response, "data.data.username")));
          toast.success("Emailingiz kiritildi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
          navigate("/");
        }
        if (get(response, "success") == false) {
          toast.error("Emailingiz kiritilmadi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
        }
      }
    );
  };

  return (
    <>
      <h1 className="login__title">login</h1>
      <form className="login-form" onSubmit={(e) => postData(e)}>
        <label className="login-form-label" htmlFor="#">
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="login-form-label__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="login-form-label" htmlFor="#">
          <Input
            type="password"
            value={password}
            placeholder="Enter your password"
            className="login-form-label__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button className="login-form__btn" type="submit">
          Send
        </Button>
        <div className="login-form-box">
          <Link className="login-form-box__link" to="/forgotPassword">
            Forgot Password
          </Link>
        </div>
      </form>
    </>
  );
});

export default index;
