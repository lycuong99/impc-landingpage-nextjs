import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./header.module.scss";
import gsap, { Power2 } from "gsap";
import { GlobalContext } from "../contexts/GlobalContext";
import { useRouter } from "next/router";

const Header = () => {
  let $header = useRef(null);
  let $hamburgerBtn = null;
  let $navDrawer = null;

  const router = useRouter();

  const { isOpenDrawer, setOpenDrawer } = useContext(GlobalContext);

  const closeDrawer = () => {
    if (!$navDrawer) return;
    $navDrawer.ariaHidden = true;

    gsap.to($navDrawer, {
      duration: 0.8,
      opacity: 0,
      skewX: "30deg",
      x: "-100%",
      y: 0,
      ease: Power2.easeInOut,
    });

    gsap.set($navDrawer, { skewX: 0, delay: 0.8 });
  };

  const openDrawer = () => {
    $navDrawer.ariaHidden = false;

    const tl = gsap.timeline({
      ease: Power2.easeInOut,
      transformOrigin: "left",
    });
    let duration = 0.25;

    if (window.screen.width > 769) {
      tl.set($navDrawer.querySelectorAll("ol > li"), { opacity: 0 });
      tl.set($navDrawer.querySelectorAll("ol > li .sub-menu li"), { opacity: 0 });
      tl.set($navDrawer.querySelector(".drawer__bottom-line"), { opacity: 0 });
      tl.set($navDrawer.querySelector(".slogan .line span"), {
        opacity: 0,
      });
      tl.set($navDrawer.querySelector(".drawer__logo"), { opacity: 0, y: 100 });

      gsap.set($navDrawer.querySelector(".contact span"), {
        opacity: 0,
      });
    }

    if (window.screen.width < 769) {
      tl.fromTo(
        $navDrawer,
        {
          x: "-100%",
        },
        {
          duration: 0.8,
          delay: 0.1,
          opacity: 1,

          x: 0,

          ease: Power2.easeInOut,
        }
      );
    } else {
      tl.fromTo(
        $navDrawer,
        {
          skewX: "30deg",
        },
        {
          duration: 0.8,
          delay: 0.1,
          opacity: 1,
          skewX: "0deg",
          x: 0,
          y: 0,
          ease: Power2.easeInOut,
        }
      );
    }

    if (window.screen.width > 769) {
      tl.fromTo(
        $navDrawer.querySelectorAll(".tt .line span"),
        {
          skewY: "10deg",
          y: 100,
          opacity: 0.3,
        },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: Power2.easeOut,
          skewX: 0,
        }
      );

      tl.fromTo(
        $navDrawer.querySelectorAll("ol > li"),
        {
          opacity: 0,
          y: "100px",
          skewX: "30deg",
        },
        {
          skewX: 0,
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: Power2.easeOut,
        },
        "<"
      );

      tl.fromTo(
        $navDrawer.querySelector(".contact span"),
        {
          skewY: "10deg",
          y: "100%",
          opacity: 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          skewY: "0",
          ease: Power2.easeOut,
          duration: 0.4,
          onComplete: function () {
            gsap.set(this.targets(), { clearProps: "all" });
          },
        }
      );

      tl.from($navDrawer.querySelector(".drawer__bottom-line"), {
        scaleX: 0,
        opacity: 0.1,
        transformOrigin: "left",
        duration: duration,
      });

      tl.to(
        $navDrawer.querySelector(".drawer__logo"),
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: Power2.easeInOut,
        },
        "<"
      );
    }
  };

  const handleHamburgerBtnClick = () => {
    setOpenDrawer(!isOpenDrawer);
  };

  useEffect(() => {
    document.querySelector("#header").classList.add(styles["header--transparent"]);

    window.addEventListener("scroll", () => {
      let condition = document.body.scrollTop > 50 || document.documentElement.scrollTop > 50;
      if (!condition) {
        document.querySelector("#header").classList.add(styles["header--transparent"]);
      } else {
        document.querySelector("#header").classList.remove(styles["header--transparent"]);
      }
    });

    router.events.on("beforeHistoryChange", () => setOpenDrawer(false));

    return () => setOpenDrawer(false);
  }, []);

  useEffect(() => {
    if (!isOpenDrawer) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }, [isOpenDrawer]);

  return (
    <header ref={(el) => ($header = el)} id="header" className={`${styles.header} `}>
      <div className="logo">
        <Link href="/">
          <a className="js-link">
            <svg
              width="162"
              height="48"
              viewBox="0 0 162 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8168 11.572V1.04688H3.10993C1.39396 1.04688 0 2.44398 0 4.17333V11.572H12.8168Z"
                fill="#EC8922"
              />
              <path
                d="M156.471 34.6423C155.412 33.4496 153.636 33.2707 152.34 34.195C151.37 34.8808 150.332 35.4388 149.217 35.869C147.243 36.6315 145.412 37.0148 143.722 37.0148C139.599 37.0148 136.553 35.7625 134.583 33.2537C132.608 30.7449 131.6 27.7718 131.558 24.3258C131.515 20.9268 132.519 17.8855 134.583 15.2021C136.642 12.5186 139.688 11.1811 143.722 11.1811C146.586 11.1811 149.179 11.9862 151.492 13.592C152.7 14.4311 154.34 14.2522 155.386 13.2171L161.348 7.32203C156.365 2.44068 150.488 0 143.722 0C139.599 0 135.905 0.707072 132.634 2.12548C129.359 3.54388 126.744 5.41805 124.795 7.74798C122.842 10.0822 121.359 12.6634 120.338 15.496C119.317 18.3285 118.809 21.2505 118.809 24.2577C118.809 27.4864 119.287 30.4808 120.241 33.2494C121.194 36.0181 122.626 38.5269 124.533 40.7717C126.439 43.0164 129.032 44.7841 132.308 46.0705C135.583 47.3568 139.387 48 143.722 48C151.137 48 157.229 45.6275 162 40.8739L156.471 34.6423Z"
                fill="currentColor"
              />
              <path
                d="M44.8612 16.5428L32.8918 1.04688H19.4268V46.8234H29.0658C30.7818 46.8234 32.1758 45.4221 32.1758 43.697V19.6182L43.5605 33.4146H45.8357L57.4789 19.55V43.6927C57.4789 45.4178 58.8728 46.8192 60.5888 46.8192H70.2279V1.04688H56.8264L44.8612 16.5428Z"
                fill="currentColor"
              />
              <path
                d="M97.2761 1.04688H77.354V23.145C74.8118 25.9818 72.9729 29.2403 71.6807 32.4392C73.4729 30.2413 75.6931 28.0264 78.3835 25.8753C78.4513 25.8242 78.5149 25.7689 78.5827 25.7177C79.0784 25.3259 79.5911 24.934 80.1207 24.5464C80.1715 24.5081 80.2224 24.4697 80.2774 24.4314C80.8367 24.0267 81.4129 23.6221 82.0019 23.2259C82.0315 23.2047 82.0612 23.1834 82.0909 23.1621C82.7179 22.7446 83.3662 22.3272 84.0356 21.9183C86.6117 20.3423 89.4928 18.8387 92.7087 17.4544L86.7981 13.0032C86.6202 12.8712 86.7176 12.5858 86.9379 12.5858L102.882 12.59C103.064 12.59 103.174 12.7902 103.077 12.9436L94.5814 26.5313C94.4628 26.7187 94.1789 26.6506 94.1577 26.4291L93.3951 18.7918C87.4294 22.0589 77.5488 30.6204 77.3624 46.8234H87.1201C88.8361 46.8234 90.2301 45.4221 90.2301 43.697V34.4624H97.2719C103.127 34.4198 107.635 32.8396 110.8 29.7216C113.965 26.608 115.55 22.6041 115.55 17.7227C115.55 12.9734 113.965 9.00357 110.8 5.82174C107.64 2.63566 103.132 1.04688 97.2761 1.04688Z"
                fill="currentColor"
              />
              <path
                d="M0 46.8197H9.70263C11.4228 46.8197 12.8126 45.4184 12.8126 43.6933V14.3711H0V46.8197Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </Link>
      </div>

      <nav className="header-navigation" aria-label="Navigation bar">
        <ul>
          <li className="active">
            <a href="#" className="navigation-text">
              EN
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={`drawer ${isOpenDrawer ? "drawer--open" : ""}`}
        ref={(el) => ($navDrawer = el)}
        id="nav-drawer"
        aria-hidden="true"
        aria-label="Navigation Drawer"
      >
        <ol>
          <li className="active">
            <Link href={"/"}>
              <a className="navigation-text-xl">
                <span>ABOUT US</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <a className="navigation-text-xl js-link">
                {" "}
                <span>WHAT WE DO</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <a className="navigation-text-xl js-link">
                <span>PORTFOLIO</span>
              </a>
            </Link>
          </li>
        </ol>

        <div className="tt">
          <div className="line">
            <span>IMP DESIGN AND TECHNICAL</span>
          </div>
          <div className="line">
            <span>MANAGEMENT CORPORATION</span>
          </div>
        </div>

        <span className="drawer__logo">
          <svg
            width="62"
            height="221"
            viewBox="0 0 62 221"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.3">
              <path
                d="M62.0001 50.7273V0H15.5632C7.35414 0 0.685547 6.73353 0.685547 15.0683V50.7273H62.0001Z"
                fill="white"
              />
              <path
                d="M0.685547 220.619H47.1022C55.3315 220.619 61.9798 213.865 61.9798 205.551V64.2285H0.685547V220.619Z"
                fill="white"
              />
            </g>
          </svg>
        </span>

        <div className="contact">
          <span className="navigation-text-xl js-scroll-to-footer js-close-drawer">CONTACT</span>
          <div className="drawer__bottom-line"></div>
        </div>
      </div>

      <button
        id="hamburger"
        ref={(el) => {
          $hamburgerBtn = el;
        }}
        onClick={() => {
          handleHamburgerBtnClick();
        }}
        className={`hamburger ${isOpenDrawer ? "hamburger--close" : ""}`}
        title="hamburger-btn"
      >
        <span className="top"></span>
        <span className="middle"></span>
        <span className="bot"></span>
      </button>
    </header>
  );
};

export default Header;
