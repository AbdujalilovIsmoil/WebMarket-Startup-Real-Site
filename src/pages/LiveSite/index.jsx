import { get } from "lodash";
import { useFetch } from "hook";
import { useParams } from "react-router-dom";
import { Button, Input } from "components/field";
import { useEffect, useRef, useState } from "react";
import { RxDesktop, RxMobile, LuTablet } from "assets/icons";

const index = () => {
  const { id } = useParams();
  const { useGet } = useFetch;
  const breakPointRef = useRef();
  const [productLink, setProductLink] = useState("");

  useEffect(() => {
    const data = useGet({ api: `/products/${id}` }).then((response) => {
      if (get(response, "status") === 200) {
        if (
          get(response, "data.data.data.product_link", "").slice(0, 5) ===
            "https" ||
          get(response, "data.data.data.product_link", "").slice(0, 5) ===
            "http"
        ) {
          setProductLink(get(response, "data.data.data.product_link", ""));
        }
      }
    });
  }, []);

  const changeBtn = ({ type, number }) => {
    if (type.target.checked === true) {
      if (Number(number) === 1) {
        return (breakPointRef.current.style.maxWidth = "100%");
      }
      if (Number(number) === 2) {
        return (breakPointRef.current.style.maxWidth = "768px");
      }
      if (Number(number) === 3) {
        return (breakPointRef.current.style.maxWidth = "375px");
      }
    }
  };

  return (
    <>
      <section className="live">
        {productLink.slice(0, 5) === "https" ||
        productLink.slice(0, 5) === "http" ? (
          <div className="live-buttons">
            <label className="live-buttons-label">
              <Input
                type="checkbox"
                className="live-buttons-label__input"
                onChange={(e) => changeBtn({ type: e, number: 1 })}
              />
              <Button type="button" className="live-buttons-label-breakpoint">
                <RxDesktop className="live-buttons-label-breakpoint__icon" />
              </Button>
            </label>
            <label className="live-buttons-label">
              <Input
                type="checkbox"
                className="live-buttons-label__input"
                onChange={(e) => changeBtn({ type: e, number: 2 })}
              />
              <Button type="button" className="live-buttons-label-breakpoint">
                <LuTablet className="live-buttons-label-breakpoint__icon" />
              </Button>
            </label>
            <label className="live-buttons-label">
              <Input
                type="checkbox"
                className="live-buttons-label__input"
                onChange={(e) => changeBtn({ type: e, number: 3 })}
              />
              <Button type="button" className="live-buttons-label-breakpoint">
                <RxMobile className="live-buttons-label-breakpoint__icon" />
              </Button>
            </label>
          </div>
        ) : null}

        {productLink.slice(0, 5) === "https" ||
        productLink.slice(0, 5) === "http" ? (
          <iframe
            src={productLink}
            ref={breakPointRef}
            className="live-iframe"
          ></iframe>
        ) : (
          <h2 className="text-center mt-3">NOT FOUND</h2>
        )}
      </section>
    </>
  );
};

export default index;
