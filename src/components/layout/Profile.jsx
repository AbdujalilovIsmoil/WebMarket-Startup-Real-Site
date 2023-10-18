import { get } from "lodash";
import { useFetch } from "hook";
import { storage } from "services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Loader } from "components/field";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { useGet } = useFetch;
  const navigate = useNavigate();
  const token = storage.get("token");
  const [user, setUser] = useState([]);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    const data = useGet({ api: "/usersown", token })
      .then((response) => {
        if (get(response, "status") === 200) {
          setIsLoader(false);
          setUser(get(response, "data.data"));
        }
      })
      .catch(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="container">
      {isLoader ? (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      ) : user.length > 0 ? (
        user.map((el) => {
          return (
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
          );
        })
      ) : (
        <h1 className="text-center text-light mt-5">NOT DATA</h1>
      )}
    </div>
  );
};

export default Profile;
