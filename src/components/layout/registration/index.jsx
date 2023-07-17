import { get } from "lodash";
import { toast } from "react-toastify";
import { useFetch } from "../../../hook";
import { Input, Button } from "../../field";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import React, { memo, useState } from "react";
import { storage } from "../../../services/storage";
import { USERNAME } from "../../../store/actions";
import { Link, useNavigate } from "react-router-dom";

const index = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { usePost, usePostUpload } = useFetch;
  const [userCode, setUserCode] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmationCode, setIsConfirmationCode] = useState(false);

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
    const postDataObject = {
      email,
      password,
      username,
      imageLink,
      portfolioLink,
      confirmationCode,
    };
    const data = usePost({ api: "/users", values: postDataObject }).then(
      (response) => {
        if (get(response, "data.success") === true) {
          setConfirmationCode(get(response, "data.confirmationCode"));
          setIsConfirmationCode(true);
          isConfirmationCode
            ? null
            : toast.success("Emailingizga kod yuborildi", {
                autoClose: 3000,
                draggable: false,
                pauseOnHover: false,
                position: "top-right",
              });
          if (isConfirmationCode) {
            storage.set("username", get(response, "data.data.username"));
            dispatch(USERNAME(get(response, "data.data.username")));
            setEmail("");
            setPassword("");
            setUserName("");
            setImageLink("");
            setPortfolioLink("");
            setConfirmationCode("");
            storage.set("token", get(response, "data.token"));
            navigate("/");
            isConfirmationCode
              ? toast.success("Emailingiz kiritildi", {
                  autoClose: 3000,
                  draggable: false,
                  pauseOnHover: false,
                  position: "top-right",
                })
              : null;
          }
        }
        if (get(response, "status") === 500) {
          toast.error("Serverda xatolik bo'lib qoldi", {
            autoClose: 3000,
            draggable: false,
            pauseOnHover: false,
            position: "top-right",
          });
        }
        if (get(response, "data.success") != true) {
          toast.error("Emailingiz kiritilmadi", {
            autoClose: 4000,
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
      <h1 className="registration__title">Registration</h1>
      <form className="registration-form" onSubmit={(e) => postData(e)}>
        <label className="registration-form-label" htmlFor="#">
          <Input
            required
            type="text"
            maxLength={20}
            value={username}
            placeholder="Enter your name"
            className="registration-form-label__input"
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label className="registration-form-label" htmlFor="#">
          <Input
            required
            type="email"
            value={email}
            placeholder="Enter your email"
            className="registration-form-label__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="registration-form-label" htmlFor="#">
          <Input
            required
            type="password"
            value={password}
            placeholder="Enter your password"
            className="registration-form-label__input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="registration-form-label" htmlFor="#">
          <Input
            type="text"
            value={portfolioLink}
            placeholder="Enter your site demo preview link"
            className="registration-form-label__input"
            onChange={(e) => setPortfolioLink(e.target.value)}
          />
        </label>
        <label className="registration-form-label" htmlFor="file-upload">
          <Input
            type="file"
            name="file"
            hidden
            id="file-upload"
            multiple={true}
            onChange={(e) => {
              postImageLinkFunction(e.target.files[0]);
            }}
            className="registration-form-label__input"
          />
          {isConfirmationCode ? (
            <label className="registration-form-label" htmlFor="#">
              <OTPInput
                numInputs={6}
                value={userCode}
                renderSeparator={<span>-</span>}
                onChange={(value) => {
                  console.log(value);
                  setUserCode(value);
                  setConfirmationCode(value);
                }}
                renderInput={(props) => {
                  return (
                    <>
                      <input
                        required
                        {...props}
                        className="registration-form-label__code"
                      />
                    </>
                  );
                }}
              />
            </label>
          ) : null}
          <div
            className={`registration-form-label-upload ${
              imageLink ? "active" : ""
            }`}
          >
            {imageLink ? (
              <img
                src={imageLink}
                alt=""
                className="registration-form-label-upload__img"
              />
            ) : (
              <h2 className="registration-form-label-upload__title">
                RASM YUKLANG
              </h2>
            )}
          </div>
        </label>
        <Button
          className={`registration-form__btn ${imageLink ? "active" : ""}`}
          type="submit"
        >
          Send
        </Button>
        <div className="registration-form-box">
          <Link className="registration-form-box__link" to="/login">
            Or Login
          </Link>
        </div>
      </form>
    </>
  );
});

export default index;
