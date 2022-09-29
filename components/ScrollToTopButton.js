import Image from "next/image";
import { useEffect, useState } from "react";

const ScrollToTopButton = ({ scrollTriggerRef }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (scrollTriggerRef) {
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
        if (scrollTriggerRef) {
          scrollTriggerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Image src="/assets/icons/arrow-up.svg" alt="arrow up icon" layout="fill" />
    </button>
  );
};
export default ScrollToTopButton;
