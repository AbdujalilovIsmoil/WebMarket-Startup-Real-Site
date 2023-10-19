import { get } from "lodash";
import { useFetch } from "hook";
import { useState } from "react";
import { storage } from "services";
import { toast } from "react-toastify";
import { USERNAME } from "store/actions";
import { useDispatch } from "react-redux";
import { Input, Button } from "components/field";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { usePost } = useFetch;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    const data = usePost({ api: "/users/login", values: userData })
      .then((response) => {
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
      })
      .catch(() => {
        toast.error("Saytga kira olmadingiz", {
          autoClose: 3000,
          draggable: false,
          pauseOnHover: false,
          position: "top-right",
        });
      });
  };

  return (
    <div className="container">
      <section className="login">
        <h4 className="login__title">login</h4>
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
              minLength={6}
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
            <Link className="login-form-box__link" to="/pages/forgotPassword">
              Forgot Password
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
