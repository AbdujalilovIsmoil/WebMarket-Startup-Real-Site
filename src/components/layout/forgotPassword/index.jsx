import { get } from "lodash";
import { toast } from "react-toastify";
import { useFetch } from "../../../hook";
import { Input, Button } from "../../field";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../services/storage";
import { USERNAME } from "../../../store/actions";

const index = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCode, setUserCode] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isConfirmationCode, setIsConfirmationCode] = useState(false);

  const postData = (e) => {
    e.preventDefault();
    const { usePost } = useFetch;
    const forgetData = {
      email,
      password,
      confirmationCode: userCode,
    };
    const data = usePost({ api: "/users/forget", values: forgetData }).then(
      (response) => {
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
        storage.set("token", get(response, "data.token"));
        if (isConfirmationCode) {
          dispatch(USERNAME(get(response, "data.data.username")));
          storage.set("username", get(response, "data.data.username"));
          setEmail("");
          setPassword("");
          setConfirmationCode("");
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
    );
  };

  return (
    <>
      <h1 className="forgotPassword__title">update</h1>
      <form className="forgotPassword-form" onSubmit={(e) => postData(e)}>
        <label className="forgotPassword-form-label" htmlFor="#">
          <Input
            type="email"
            value={email}
            placeholder="Enter your email"
            className="forgotPassword-form-label__input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {isConfirmationCode && (
          <>
            <label className="forgotPassword-form-label" htmlFor="#">
              <Input
                minLength={6}
                type="password"
                value={password}
                placeholder="Enter your new password"
                className="forgotPassword-form-label__input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {isConfirmationCode ? (
              <label className="forgotPassword-form-label" htmlFor="#">
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
                          className="forgotPassword-form-label__code"
                        />
                      </>
                    );
                  }}
                />
              </label>
            ) : null}
          </>
        )}
        <Button className="forgotPassword-form__btn" type="submit">
          Send
        </Button>
      </form>
    </>
  );
});

export default index;
