import { get } from "lodash";
import { useFetch } from "../../../hook";
import { Button, Loader } from "../../field";
import { LOADER } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../services/storage";
import { useDispatch, useSelector } from "react-redux";
import React, { memo, useEffect, useState } from "react";

const index = memo(() => {
  const { useGet } = useFetch;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = storage.get("token");
  const [user, setUser] = useState([]);
  const { loader } = useSelector((state) => state);

  useEffect(() => {
    const data = useGet({ api: "/usersown", token }).then((response) => {
      if (get(response, "status") === 200) {
        dispatch(LOADER());
        setUser(get(response, "data.data"));
      }
    }).catch(() => {
      dispatch(LOADER());
    })
  }, []);

  return (
    <>
      {loader ? (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      ) : user.length > 0 ? (
        user.map((el) => {
          return (
            <>
              <section className="profile">
                <div className="profile-box">
                  <Button
                    className="profile-box__btn"
                    type="button"
                    onClick={() => navigate("/profile-edit")}
                  >
                    Edit
                  </Button>
                </div>
                <div className="profile-container">
                  <img
                    alt={el.username}
                    src={el.imageLink}
                    title={el.username}
                    className="profile-container__img"
                  />
                  <h4 className="profile-container__name">{el.username}</h4>
                  <h4 className="profile-container__email">{el.email}</h4>
                  <a
                    target="_blank"
                    href={el.portfolioLink}
                    className="profile-container__portfolio"
                  >
                    {el.portfolioLink}
                  </a>
                </div>
              </section>
            </>
          );
        })
      ) : (
        <h1 className="text-center text-light mt-5">NOT FOUND</h1>
      )}
    </>
  );
});

export default index;
