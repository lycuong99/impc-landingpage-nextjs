import { useEffect, useState } from "react";
import screenTracking from "../lib/screen-tracking";

const ScrollToTopButton = ({ scrollTriggerRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (scrollTriggerRef && screenTracking.isOnLaptop()) {
      let scrollTrigger = scrollTriggerRef.current;
      scrollTrigger.addEventListener("scroll", () => {
        let condition = scrollTrigger.scrollTop > 50;
        setShow(condition);
      });
    } else {
      window.addEventListener("scroll", () => {
        let condition = document.body.scrollTop > 50 || document.documentElement.scrollTop > 50;
        setShow(condition);
      });
    }
  }, []);

  return (
    <button
      id="scrollTopBtn"
      style={{ display: show ? "block" : "none" }}
      onClick={() => {
        if (scrollTriggerRef && screenTracking.isOnLaptop()) {
          scrollTriggerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="img-wrapper">
        <svg
          width="21"
          height="100%"
          viewBox="0 0 21 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.793 38.5117L10.793 3.09708" stroke="white" strokeWidth="2" />
          <path
            d="M1.25586 9.53613L10.7937 1.48735L20.3315 9.53613"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>
    </button>
  );
};
export default ScrollToTopButton;
