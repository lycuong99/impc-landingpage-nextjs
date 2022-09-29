import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/index.module.scss";
import pagePilingStyles from "../styles/page-piling.module.scss";
import cn from "classnames";
import Header from "../components/Header";
import gsap, { Power2, Power0, Power1, Power4, Cubic } from "gsap";
import screenTracking from "../lib/screen-tracking";
import { initPagepiling, scrollTo } from "../lib/page-piling";
import Link from "next/link";
import headerStyles from "../components/header.module.scss";
import GlobalContext from "../contexts/GlobalContext";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { TransitionContext } from "../components/PageLoader";

const TOTAL_CULTURES = 3;
const TOTAL_BANNER_IMAGES = 5;
const slideBannerImage = () => {
  // GET CURRENT IMAGE
  let $imgActive = document.querySelector(".banner__image .img-wrapper.active");
  if (!$imgActive) return;
  let indexImg = parseInt($imgActive.dataset.bannerImgIndex);

  // GET NEXT IMAGE
  let nextIndex = indexImg === TOTAL_BANNER_IMAGES - 1 ? 0 : indexImg + 1;
  let nextImg = document.querySelector(
    `.banner__image .img-wrapper[data-banner-img-index="${nextIndex}"]`
  );

  const base_zIndex = 1;

  // MOVE CURRENT IMAGE UP -> dont move

  // MOVE NEXT IMAGE UP
  gsap.fromTo(
    nextImg,
    {
      y: "100%",
      zIndex: base_zIndex + 2,
    },
    {
      y: `${0}%`,
      duration: 0.8,

      ease: Power0.easeIn,
      // delay: 1,

      onComplete: () => {
        gsap.set($imgActive, { zIndex: base_zIndex });
        gsap.set(nextImg, { zIndex: base_zIndex + 1 });

        // update class
        $imgActive.classList.toggle("active");
        nextImg.classList.toggle("active");
      },
    }
  );

  // ANIMATION FOR TEXT

  gsap.fromTo(
    document.querySelectorAll(
      `.banner__img-title .text-overlap-transform[data-banner-img-index="${nextIndex}"] .line span`
    ),
    {
      y: "100%",
      ease: Cubic.easeInOut,
      rotateX: "-90deg",
      transformOrigin: "center top bottom",
      // delay: 0.8,
    },
    {
      opacity: 1,
      y: "0",
      x: 0,
      rotateX: 0,
      stagger: 0.2,
      duration: 0.8,
    }
  );

  gsap.fromTo(
    document.querySelectorAll(
      `.banner__img-title .text-overlap-transform[data-banner-img-index="${indexImg}"] .line span`
    ),
    {
      y: 0,
      ease: Cubic.easeInOut,
      opacity: 1,
      transformOrigin: "center bottom",
    },
    {
      duration: 0.8,
      y: "-100%",
      x: 0,
      stagger: 0.2,
      opacity: 0,
      rotateX: "90deg",
    }
  );

  // ANIAMTION FOR H1
  if (indexImg === 0 || indexImg === TOTAL_BANNER_IMAGES - 1) {
    gsap.fromTo(
      document.querySelectorAll(
        `.banner__title .text-overlap-transform-wrapper .text-overlap-transform[data-banner-img-index="${
          indexImg === 0 ? 0 : 1
        }"] .line span`
      ),
      {
        y: 0,
        ease: Cubic.easeInOut,
        opacity: 1,
        transformOrigin: "center bottom",
      },
      {
        duration: 0.8,
        y: "-100%",
        x: 0,
        stagger: 0.2,
        opacity: 0,
        rotateX: "90deg",
      }
    );

    gsap.fromTo(
      document.querySelectorAll(
        `.banner__title .text-overlap-transform-wrapper .text-overlap-transform[data-banner-img-index="${
          indexImg === 0 ? 1 : 0
        }"] .line span`
      ),
      {
        y: "100%",
        ease: Cubic.easeInOut,
        rotateX: "-90deg",
        transformOrigin: "center top bottom",
        // delay: 0.8,
      },
      {
        opacity: 1,
        y: "0",
        x: 0,
        rotateX: 0,
        stagger: 0.2,
        duration: 0.8,
      }
    );
  }
};

const CultureSlider = () => {
  //#region DOM REFS
  let $cultureLineProcess = null;
  //#endregion

  const [currentIndex, setCultureCurrentIndex] = useState(1);

  const moveToCultureContent = (currentIndex, targetIndex) => {
    setCultureCurrentIndex(targetIndex);

    gsap.to($cultureLineProcess, {
      "--value": `${(targetIndex / TOTAL_CULTURES) * 100}%`,
    });

    let $cultureSliderContents = document.querySelectorAll(".culture-slider__content");

    $cultureSliderContents.forEach((slide) => {
      if (
        slide.classList.contains("active") ||
        parseInt(slide.dataset.cultureIndex) === targetIndex
      ) {
        slide.classList.toggle("active");
      }
    });
  };

  const handleClickPrevCultureBtn = () => {
    let targetIndex = currentIndex - 1;
    if (currentIndex === 1) {
      targetIndex = TOTAL_CULTURES;
    }
    moveToCultureContent(currentIndex, targetIndex);
  };

  const handleClickNextCultureBtn = () => {
    let targetIndex = currentIndex + 1;
    if (currentIndex === TOTAL_CULTURES) {
      targetIndex = 1;
    }
    moveToCultureContent(currentIndex, targetIndex);
  };

  return (
    <div className="culture-slider">
      <div className="culture-slider__panel">
        <div className="culture-slider__content-wrapper">
          <div className="culture-slider__controller">
            <button className="prev" onClick={handleClickPrevCultureBtn}>
              <span>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11.5" cy="11.5" r="10.5" stroke="#fff" strokeWidth="2" />
                  <path
                    d="M14 7L8 11.3784L14 16"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinejoin="bevel"
                  />
                </svg>
              </span>
            </button>
            <div>
              <span className="culture-current-index">{`0${currentIndex}`}</span>/
              <span className="culture-total">03</span>
            </div>
            <button className="next" onClick={handleClickNextCultureBtn}>
              <span>
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="11.5"
                    cy="11.5"
                    r="10.5"
                    transform="rotate(-180 11.5 11.5)"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 16L15 11.6216L9 7"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinejoin="bevel"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="culture-slider__content active" data-culture-index="1">
            <span className="subtitle--small"></span>
            <div className="content-wrapper">
              <q>A dependable partner for Industrial Investment and Development Investors.</q>
            </div>
          </div>
          <div className="culture-slider__content" data-culture-index="2">
            <span className="subtitle--small">MISSION</span>
            <div className="content-wrapper">
              <q>
                A leading company in Vietnam, we reach out to the region in the planning and
                management of the industrial real estate.
              </q>
            </div>
          </div>
          <div className="culture-slider__content" data-culture-index="3">
            <span className="subtitle--small">CORE VALUES</span>
            <div className="content-wrapper">
              <ul className="quote">
                <li>Loyal</li>
                <li>Honesty</li>
                <li>Devotion</li>
                <li>Decency</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="culture-line-process" ref={(el) => ($cultureLineProcess = el)}></div>
      </div>
    </div>
  );
};

const SectionAnimations = {
  Banner: {
    index: 0,
    destroyIntervalSlide: null,
    preAnimate: () => {
      console.log("pre animatie");
      document.getElementById("header").classList.add(headerStyles["header--transparent"]);

      gsap.set(document.querySelector(".banner .button"), { opacity: 0, x: "-100%" });
      gsap.set(document.querySelector(".banner .button--link"), { opacity: 0, x: "-100%" });
      gsap.set(document.querySelectorAll(".banner .line span"), { clearProps: "all" });
      gsap.set(document.querySelectorAll(".banner .line span"), { opacity: 0 });
      gsap.set(".banner__hero", { opacity: 0 });
    },
    animate: () => {
      console.log("PAGE IN");
      const tl = gsap.timeline();

      tl.fromTo(
        [
          document.querySelectorAll(".banner .banner__title h3 .line span"),
          document.querySelectorAll(
            ".banner__title h1.text-overlap-transform-wrapper .text-overlap-transform--base .line span"
          ),
        ],
        {
          y: "100%",
          ease: Power0.easeInOut,
          opacity: 0,
          duration: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
        }
      );

      gsap.from(".banner__img-title", {
        "--bottom-line-width": 0,
        delay: 0.4,
      });

      tl.fromTo(
        document.querySelector(".banner .button--link"),
        {
          opacity: 0,
          x: "-100%",
          "--bottom-line-width": 0,
        },
        {
          opacity: 1,
          "--bottom-line-width": "100%",
          duration: 0.2,
          x: 0,
        },
        "<"
      );

      tl.to(
        ".banner__actions .button",
        {
          x: 0,
          opacity: 1,
          ease: Power4.easeInOut,
          duration: 0.2,
        },
        "<"
      );

      gsap.fromTo(
        ".banner__hero",
        {
          x: "20%",
          opacity: 0,
          transformOrigin: "top left",
          delay: -1,
        },
        {
          x: "0",
          opacity: 1,
          duration: 0.8,
        }
      );

      let timeoutSlider = setTimeout(() => {
        if (SectionAnimations.Banner.destroyIntervalSlide) {
          clearInterval(SectionAnimations.Banner.destroyIntervalSlide);
          console.log("set interval img", SectionAnimations.Banner.destroyIntervalSlide);
        }

        SectionAnimations.Banner.destroyIntervalSlide = setInterval(() => {
          slideBannerImage();
        }, 2500);
        console.log("set interval img", SectionAnimations.Banner.destroyIntervalSlide);
        window.addEventListener(
          "pagetranstion:unload",
          () => {
            clearInterval(SectionAnimations.Banner.destroyIntervalSlide);
            SectionAnimations.Banner.destroyIntervalSlide = null;
          },
          { once: true }
        );
      }, 2000);
    },
    out: () => {
      document.getElementById("header").classList.remove(headerStyles["header--transparent"]);
      console.log("Remove slider");
      if (SectionAnimations.Banner.destroyIntervalSlide) {
        clearInterval(SectionAnimations.Banner.destroyIntervalSlide);
        SectionAnimations.Banner.destroyIntervalSlide = null;
      }
    },
  },
  Achivement: {
    index: 1,
    preAnimate: () => {
      gsap.set(".achievement .achievement__quote", {
        opacity: 0,
        x: "-100%",
      });

      gsap.set(".achievement .achievement__items .achievement__item", {
        opacity: 0,
        x: "100%",
      });

      gsap.set(".achievement .achievement__bottom", {
        opacity: 0,
        x: "100%",
      });
    },

    animate: () => {
      gsap.to(".achievement .achievement__quote", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: Power0.easeInOut,
      });

      gsap.to(".achievement .achievement__items .achievement__item", {
        x: "0",
        opacity: 1,
        stagger: 0.2,
      });

      gsap.to(".achievement .achievement__bottom", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: Power0.easeInOut,
      });

      // COUNT NUMBER
      let arrNum = document.querySelectorAll(".achievement .achievement__item .js-count-number");

      arrNum.forEach(($numberElement) => {
        try {
          let origin = parseInt($numberElement.textContent);

          $numberElement.textContent = 0;
          setTimeout(() => {
            let count = 0;
            let counterRepeat = 1000 / origin + 1;
            let currentCount = 0;

            let cancelCount = setInterval(() => {
              if (count > origin) {
                clearInterval(cancelCount);
                requestAnimationFrame(() => {
                  $numberElement.textContent = origin;
                });
                return;
              }

              requestAnimationFrame(() => {
                $numberElement.textContent = count++;
              });
            }, counterRepeat);
          }, 800);
        } catch (error) {}
      });
    },
    out: () => {},
  },
  Overview: {
    index: 2,
    preAnimate: () => {
      gsap.set(".overview .img-container", {
        "--overlap-width": "100%",
        visibility: "hidden",
      });
      gsap.set(".overview .img-container img", {
        scale: 1.6,
      });

      gsap.set(".overview .right h1", {
        x: "100%",
        opacity: 0,
      });

      gsap.set(".overview .right h2", {
        x: "100%",
        opacity: 0,
      });

      gsap.set(".overview .right p", {
        x: "100%",
        opacity: 0,
      });
    },
    animate: () => {
      gsap.to(".overview .img-container", {
        "--overlap-width": "0",
        visibility: "visible",
        duration: 1.4,
        ease: Power2.easeInOut,
      });
      gsap.to(".overview .img-container img", {
        scale: 1,
        duration: 1.4,
        delay: 0.3,
        ease: Power2.easeInOut,
      });

      gsap.to(".overview .right h1", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: Power2.easeInOut,
      });

      gsap.to(".overview .right h2", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: Power2.easeInOut,
      });

      gsap.to(".overview .right p", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: Power2.easeInOut,
        stagger: 0.2,
      });
    },
  },
  Culture: {
    index: 3,
    preAnimate: () => {
      gsap.set("#culture-svg", {
        drawSVG: 0,
        y: "100%",
        opacity: 0,
      });

      gsap.set(".culture .culture__title", {
        opacity: 0,
        y: "100%",
      });

      gsap.set(".culture .culture__description", {
        opacity: 0,
        y: "100%",
      });

      gsap.set(".culture .culture-slider", {
        opacity: 0,
        y: "100%",
      });
    },
    animate: () => {
      gsap.to("#culture-svg", {
        drawSVG: 1,
        ease: Power1.easeInOut,
        duration: 0.8,
        opacity: 1,
        y: 0,
        fillOpacity: 1,
      });

      gsap.to(".culture .culture__title", {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut,
        duration: 0.8,
      });

      gsap.to(".culture .culture__description", {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut,
        duration: 0.8,
      });

      gsap.to(".culture .culture-slider", {
        opacity: 1,
        y: 0,
        ease: Power1.easeInOut,
        duration: 0.8,
      });
    },
  },
  Team: {
    index: 4,
    preAnimate: () => {
      gsap.set(".team .team__text h1", { opacity: 0, z: -100, transformStyle: "preserve-3d" });
      gsap.set(".team .team__text h2", { opacity: 0, z: -100, transformStyle: "preserve-3d" });
      gsap.set(".team .team__text p", { opacity: 0, z: -100, transformStyle: "preserve-3d" });

      gsap.set(".team .team__image figure", {
        x: "100%",
        scale: 0.6,
        transformStyle: "preserve-3d",
        transformOrigin: "left",
        opacity: 0,
      });
    },
    animate: () => {
      let tl = gsap.timeline();

      gsap.to([".team .team__text h1", ".team .team__text h2", ".team .team__text p"], {
        opacity: 1,
        z: 0,
        stagger: 0.2,
        ease: Power2.easeInOut,
      });
      tl.to(".team .team__image figure", {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: Power2.easeInOut,
      });
      tl.to(".team .team__image figure", {
        scale: 1,
        duration: 0.6,
        transformOrigin: "left",
        ease: Power2.easeInOut,
      });
    },
  },
  Partner: {
    index: 5,
    preAnimate: () => {
      gsap.set(".partner .partner__item", {
        opacity: 0,
        y: "100%",
        x: "100%",
        scale: 0.8,
      });

      gsap.set(".partner h1", {
        opacity: 0,
        y: "100%",
      });
    },
    animate: () => {
      const tl = gsap.timeline();
      tl.to(".partner .partner__item", {
        stagger: 0.1,
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
        ease: Power2.easeInOut,
      });

      gsap.to(".partner h1", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: Power2.easeInOut,
      });
    },
  },
  Footer: {
    index: 6,
    preAnimate: () => {
      document.getElementById("header").classList.add(headerStyles["header--footer-transparent"]);
      gsap.set("footer .naviation-list li", {
        opacity: 0,
        y: "100%",
      });

      gsap.set("footer nav .slogan", {
        opacity: 0,
        y: "100%",
      });

      gsap.set("footer .footer__infomations section", {
        opacity: 0,
        y: "100%",
      });

      gsap.set("footer .map", {
        opacity: 0,
        y: "100%",
      });

      gsap.set(".footer__bottom-line", {
        scaleX: 0,
      });
    },
    animate: () => {
      const tl2 = gsap.timeline();
      gsap.to("footer .naviation-list li", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: Power2.easeInOut,
        stagger: 0.2,
      });

      gsap.to("footer nav .slogan", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: Power2.easeInOut,
      });

      tl2.to("footer .footer__infomations section", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: Power2.easeInOut,
      });

      tl2.to(
        ".footer__bottom-line",
        {
          scaleX: 1,
          duration: 0.8,
          ease: Power2.easeInOut,
        },
        "<"
      );
      tl2.to("footer .map", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: Power2.easeInOut,
      });
    },
    out: () => {
      document
        .getElementById("header")
        .classList.remove(headerStyles["header--footer-transparent"]);
    },
  },
  getSection: (index) => {
    switch (index) {
      case SectionAnimations.Banner.index:
        return SectionAnimations.Banner;
      case SectionAnimations.Achivement.index:
        return SectionAnimations.Achivement;
      case SectionAnimations.Overview.index:
        return SectionAnimations.Overview;
      case SectionAnimations.Partner.index:
        return SectionAnimations.Partner;
      case SectionAnimations.Team.index:
        return SectionAnimations.Team;
      case SectionAnimations.Culture.index:
        return SectionAnimations.Culture;
      case SectionAnimations.Footer.index:
        return SectionAnimations.Footer;
      default:
        return null;
    }
  },
};

const bannerServicesSlider = [
  {
    title: "PLANNING & DESIGN",
    imgURL: "/assets/images/banner/planning-and-desgin.webp",
  },
  {
    title: "PERMITTING",
    imgURL: "/assets/images/banner/permitting.webp",
  },
  {
    title: "PROJECT AND CONSTRUCTION MANAGEMENT",
    imgURL: "/assets/images/banner/project.webp",
  },
  {
    title: "INDUSTRIAL ESTATE MANAGEMENT",
    imgURL: "/assets/images/banner/industrial.webp",
  },
];

export default function Home() {
  const { setOpenDrawer } = useContext(GlobalContext);
  const [sliderInterval, setSliderInterval] = useState(null);
  const { pageTransitionTimeline } = useContext(TransitionContext);

  const partners = [
    {
      url: "/assets/images/partners-and-customers/partner-01.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-02.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-03.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-04.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-05.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-06.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-07.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-08.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-09.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-10.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-11.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-12.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-13.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-14.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-15.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-16.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-17.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-18.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-19.webp",
    },
    {
      url: "/assets/images/partners-and-customers/partner-20.webp",
    },
  ];

  useEffect(() => {
    let $scrollToFooterElements = document.querySelectorAll(".js-scroll-to-footer");

    $scrollToFooterElements.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("js-close-drawer")) {
          setOpenDrawer(false);
        }

        if (screenTracking.isOnLaptop()) {
          scrollTo(SectionAnimations.Footer.index);
        } else {
          document.querySelector("footer").scrollIntoView();
        }
      });
    });

    requestAnimationFrame(() => {
      document.querySelector(".bg-lazy").classList.add("visible");
    });

    initPagepiling(SectionAnimations);

    const body = document.querySelector("body");
    document.body.classList.add("fix-screen-laptop");

    return () => {
      body.classList.remove("fix-screen-laptop");
      SectionAnimations.Banner.out();
    };
  }, []);

  useLayoutEffect(() => {
    console.log("set up animate");
    SectionAnimations.Banner.preAnimate();
    // pageTransitionTimeline.beforeEnter = SectionAnimations.Banner.preAnimate;
    pageTransitionTimeline.afterEnter = SectionAnimations.Banner.animate;
  }, []);

  return (
    <div className={styles.page}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" name="keywords" content="IMPC" />
        <title>IMPC - Homepage</title>
        <meta name="title" content="IMP Design and Technical Management Corporation" />
        <meta
          name="description"
          content="IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide."
        />
        <meta
          name="keywords"
          content="impc, Project and Construction Management, quản lý dự án, quản lí hạ tầng"
        />
        <meta name="robots" content="index, archive" />
        {/* OG */}
        <meta property="og:title" content="IMP Design and Technical Management Corporation" />
        <meta property="og:url" content="https://impc.netlify.app/" />
        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="IMPC" />
        <meta
          property="og:description"
          content="IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide."
        />
        <meta property="og:image:url" content="https://impc.netlify.app/og-img.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="300" />
        <link
          rel="sitemap"
          type="application/xml"
          title="sitemap"
          href="https://impc.netlify.app/sitemap.xml"
        />
      </Head>

      <div className="">
        <Header />
        <main id="page-piling" className={`${pagePilingStyles["page-piling"]} page-content`}>
          <section className={"banner section section--active"} id="banner">
            <div className="banner__background bg-lazy"></div>
            <div className="banner__title">
              <h3>
                <div className="line">
                  <span>YOUR EXPERT</span>
                </div>
              </h3>
              <h1 className="text-overlap-transform-wrapper">
                <div
                  className="text-overlap-transform text-overlap-transform--base"
                  data-banner-img-index="0"
                >
                  <div className="line">
                    <span>In the field of</span>{" "}
                  </div>
                  <div className="line">
                    <span>industrial development</span>{" "}
                  </div>
                  <div className="line">
                    <span>and management</span>{" "}
                  </div>
                  <div className="line">
                    <span></span>{" "}
                  </div>
                </div>
                <div
                  className="text-overlap-transform text-overlap-transform--other"
                  data-banner-img-index="1"
                >
                  <div className="line">
                    <span>We provide </span>{" "}
                  </div>
                  <div className="line">
                    <span>solutions</span>{" "}
                  </div>
                  <div className="line">
                    <span>and services</span>{" "}
                  </div>
                  <div className="line">
                    <span>in this area</span>{" "}
                  </div>
                </div>
              </h1>
            </div>

            <div className="banner__services--mobile">
              <ul>
                <li className="subtitle">PLANNING & DESIGN</li>
                <li className="subtitle">PERMITTING</li>
                <li className="subtitle">PROJECT AND CONSTRUCTION MANAGEMENT</li>
                <li className="subtitle">INDUSTRIAL ESTATE MANAGEMENT</li>
              </ul>
            </div>

            <div className="banner__actions">
              <Link href="/services">
                <a className="button--link js-link">
                  DISCOVER MORE
                  <span>
                    <svg
                      className="icon"
                      width="22"
                      height="12"
                      viewBox="0 0 22 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 6L21 6" stroke="currentColor" />
                      <path d="M16 1L21 6L16 11" stroke="currentColor" />
                    </svg>{" "}
                  </span>
                </a>
              </Link>
              <a href="#" className="button js-scroll-to-footer">
                {" "}
                CONTACT US
              </a>
            </div>

            <div className="banner__hero">
              <div className="img-overlap"></div>
              <div className="banner__img-title sub-header2">
                <div
                  className="text-overlap-transform text-overlap-transform--base"
                  data-banner-img-index="0"
                >
                  <div className="line">
                    <span></span>
                  </div>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <div className="text-overlap-transform" data-banner-img-index="1">
                  <div className="line">
                    <span>Planning</span>
                  </div>
                  <div className="line">
                    <span>and Design</span>
                  </div>
                </div>
                <div className="text-overlap-transform" data-banner-img-index="2">
                  <div className="line">
                    <span>PERMITTING </span>
                  </div>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <div className="text-overlap-transform" data-banner-img-index="3">
                  <div className="line">
                    <span>PROJECT AND </span>
                  </div>
                  <div className="line">
                    <span>CONSTRUCTION MANAGEMENT</span>
                  </div>
                </div>
                <div className="text-overlap-transform" data-banner-img-index="4">
                  <div className="line">
                    <span>INDUSTRIAL ESTATE</span>
                  </div>
                  <div className="line">
                    <span>MANAGEMENT</span>
                  </div>
                </div>
              </div>
              <figure className="banner__image">
                <div className="img-wrapper active" data-banner-img-index="0">
                  <Image
                    src="/assets/images/banner.webp"
                    // src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    className="slider__img lazy-img "
                    alt="banner"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
                {bannerServicesSlider.map((serviceImg, index) => (
                  <div
                    className="img-wrapper"
                    key={serviceImg.title}
                    data-banner-img-index={index + 1}
                  >
                    <Image
                      objectFit="cover"
                      className="slider__img lazy-img"
                      // src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                      src={serviceImg.imgURL}
                      alt="planning-and-desgin"
                      layout="fill"
                      loading="eager"
                    />
                  </div>
                ))}
              </figure>
            </div>
          </section>

          <section className="section achievement">
            <div className="achievement__quote">
              <div className="quote-icon-wrapper">
                <div className="left-line"></div>
                <span>
                  <svg
                    className="quote-icon"
                    viewBox="0 0 50 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41.6274 32H24.6462L35.1415 0H50L41.6274 32ZM16.8632 32H0L10.7311 0H25.5896L16.8632 32Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div className="right-line"></div>
              </div>
              <div className="quote-large">
                <span> Quality projects That </span> <span>Create long term Growth</span>
              </div>
            </div>
            <div className="achievement__items">
              <div className="achievement__item">
                <h2>TOTAL PROJECT</h2>
                <div className="value">
                  <span className="large-number js-count-number">75</span>
                  <span className="sub-header2">projects</span>
                </div>
              </div>

              <div className="achievement__item">
                <h2>PARTNERS & CUSTOMERS</h2>
                <div className="value">
                  <span className="large-number js-count-number">20</span>
                  <span className="sub-header2">companies</span>
                </div>
              </div>

              <div className="achievement__item">
                <h2>TOTAL EMPLOYEES</h2>
                <div className="value">
                  <span className="large-number js-count-number">282</span>
                  <span className="sub-header2">employees</span>
                </div>
              </div>
            </div>

            <div className="achievement__bottom">
              <p>
                Together with our Business Partners and Customers, we deliver quality projects that
                create long-term growth and higher value creation across the country.
              </p>
              <div className="action">
                <div className="left-line"></div>
                <Link href="/portfolio">
                  <a className="button js-link">
                    <span>PORTFOLIO</span>
                    <img
                      src="/assets/icons/arrow-right.svg"
                      loading="lazy"
                      alt="right arrow icon"
                      layout="fill"
                    />
                  </a>
                </Link>
              </div>
            </div>
          </section>

          <section className="section overview">
            <div className="container">
              <div className="left img-container">
                <Image
                  src="/assets/images/overview.webp"
                  loading="lazy"
                  alt="overview"
                  layout="fill"
                />
              </div>

              <div className="right">
                <h1>
                  <div>Company</div>
                  Overview
                </h1>
                <h2>Established in 2016,</h2>
                <p className="first-paragraph">
                  IMP Design and Technical Management Corporation (IMPC) were established in 2016
                </p>
                <p className="seconed-paragraph">
                  We deliver professional services provision systems and accompanying enterprises in
                  order to answer inquiries in a timely manner during consulting and operating
                  works.
                </p>
              </div>
            </div>
          </section>

          {/* <!-- CULTURE --> */}
          <section className="section culture">
            <h1 className="culture__title">
              <span>Our </span>
              <span>Culture</span>
            </h1>
            <p className="culture__description">
              The fundamental development of IMP Design and Technical Management Corporation is
              always rooted in smart investment, sustainable development, learning, and creating for
              the benefit of the community, customers, partners, and company.
            </p>
            <div className="culture__logo">
              <svg
                id="culture-svg"
                viewBox="0 0 140 502"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.2">
                  <path
                    d="M33.7525 5.71191H134.102V111.748H5V35.18C5 18.781 17.9842 5.71191 33.7525 5.71191Z"
                    stroke="white"
                    strokeWidth="10"
                  />
                  <path
                    d="M105.339 496.797H5V152.264H134.102V467.637C134.102 483.784 121.194 496.797 105.339 496.797Z"
                    stroke="white"
                    strokeWidth="10"
                  />
                </g>
              </svg>
            </div>
            <CultureSlider />
          </section>

          <section className="section team">
            <div className="team__text">
              <h1>
                <div className="line">
                  <span>Our team</span>
                </div>
              </h1>
              <h2>
                IMPC is not only focusing on developing and providing services to our customers.
              </h2>
              <p>
                Our Company also heading to enhance the teams and people, non-stop in the
                development of skills, abilities, and ethics to enhance our team
              </p>
            </div>
            <div className="team__image">
              <figure>
                <img
                  className="main-img"
                  src="/assets/images/out-team.webp"
                  alt="Out team"
                  loading="lazy"
                  layout="fill"
                />
              </figure>
            </div>
          </section>

          <section className="section partner last-section">
            <h1>Trusted by customers, partners and the industry</h1>
            <ul className="partner__grid-logo">
              {partners.map((partner) => (
                <li key={partner.url}>
                  <div className="partner__item">
                    <img
                      className="img"
                      src={partner.url}
                      layout="fill"
                      // height={"100%"}
                      // width={"100%"}
                      alt=""
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <Footer className="section" />

          <div className="controller">
            <ul></ul>
          </div>
        </main>
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export const getStaticProps = async (context) => {
  const pageContent = [
    // Section
    {
      key: "banner",
      contents: [
        { key: "background", value: "", type: "imgUrl" },
        { key: "subtitle", value: "your expert", locale: "vi" },
        { key: "subtitle", value: "your expert", locale: "en" },
      ],
    },
    {
      key: "achievement",
    },
    {
      key: "overview",
    },
    {
      key: "culture",
    },
    {
      key: "team",
    },
    {
      key: "partner",
    },
  ];

  const header = {
    logo: {
      imgUrl: "",
    },
    navigators: [
      {
        key: "home",
        content: {
          vi: "ABOUT US",
          en: "ABOUT US",
        },
      },
      {
        key: "services",
        content: {
          vi: "WHAT WE DO",
          en: "WHAT WE DO",
        },
      },
      {
        key: "porfolio",
        content: {
          vi: "porfolio",
          en: "porfolio",
        },
      },
    ],
    contact: {
      vi: "CONTACT",
      en: "CONTACT",
    },
    slogan: {
      vi: "IMP DESIGN AND TECHNICAL MANAGEMENT CORPORATION",
      en: "IMP DESIGN AND TECHNICAL MANAGEMENT CORPORATION",
    },
  };

  const partners = [];
  const footer = {
    navigators: [
      {
        key: "home",
        content: {
          vi: "ABOUT US",
          en: "ABOUT US",
        },
      },
      {
        key: "services",
        content: {
          vi: "WHAT WE DO",
          en: "WHAT WE DO",
        },
      },
      {
        key: "porfolio",
        content: {
          vi: "porfolio",
          en: "porfolio",
        },
      },
    ],
    slogan: {
      vi: "IMP DESIGN AND TECHNICAL MANAGEMENT CORPORATION",
      en: "IMP DESIGN AND TECHNICAL MANAGEMENT CORPORATION",
    },
    contact: {
      phone: "+84 28 77703399",
      email: "contact@impc.vn",
    },
  };
  return {
    props: {},
  };
};
