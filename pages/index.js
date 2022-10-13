import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/index.module.scss";
import pagePilingStyles from "../styles/page-piling.module.scss";
import Header from "../components/Header";
import gsap, { Power2, Power0, Power1, Power4, Cubic } from "gsap";
import screenTracking from "../lib/screen-tracking";
import { initPagepiling, scrollTo } from "../lib/page-piling";
import Link from "next/link";
import headerStyles from "../components/header.module.scss";
import GlobalContext from "../contexts/GlobalContext";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { TransitionContext } from "../components/PageLoader";
import { splitTextToLines } from "../lib/utils";
import { fetchHomepage } from "../services";
import { useRouter } from "next/router";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import Seo from "../components/Seo";

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

const SectionAnimations = {
  Banner: {
    index: 0,
    destroyIntervalSlide: null,
    preAnimate: () => {
      document.getElementById("header").classList.add(headerStyles["header--transparent"]);

      gsap.set(document.querySelector(".banner .button"), { opacity: 0, x: "-100%" });
      gsap.set(document.querySelector(".banner .button--link"), { opacity: 0, x: "-100%" });
      gsap.set(document.querySelectorAll(".banner .line span"), { clearProps: "all" });
      gsap.set(document.querySelectorAll(".banner .line span"), { opacity: 0 });
      gsap.set(".banner__hero", { opacity: 0 });
    },
    animate: () => {
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
          // console.log("set interval img", SectionAnimations.Banner.destroyIntervalSlide);
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
      // console.log("Remove slider");
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
      gsap.set(".partner", {
        scrollTop: 0,
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

const AchievementSection = ({ pageContent }) => {
  const {
    Quote,
    TotalProjectTitle,
    TotalProjectValue,
    TotalProjectUnit,
    TotalPartnerAndCustomerTitle,
    TotalPartnerAndCustomerValue,
    TotalPartnerAndCustomerUnit,
    TotalEmployeeTitle,
    TotalEmployeeValue,
    TotalEmployeeUnit,
    PortfolioBtn,
    Description,
  } = pageContent.HomeAchivement;
  return (
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
          {splitTextToLines(Quote).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
      <div className="achievement__items">
        <div className="achievement__item">
          <h2>{TotalProjectTitle}</h2>
          <div className="value">
            <span className="large-number js-count-number">{TotalProjectValue}</span>
            <span className="sub-header2">{TotalProjectUnit}</span>
          </div>
        </div>

        <div className="achievement__item">
          <h2>{TotalPartnerAndCustomerTitle}</h2>
          <div className="value">
            <span className="large-number js-count-number">{TotalPartnerAndCustomerValue}</span>
            <span className="sub-header2">{TotalPartnerAndCustomerUnit}</span>
          </div>
        </div>

        <div className="achievement__item">
          <h2>{TotalEmployeeTitle}</h2>
          <div className="value">
            <span className="large-number js-count-number">{TotalEmployeeValue}</span>
            <span className="sub-header2">{TotalEmployeeUnit}</span>
          </div>
        </div>
      </div>

      <div className="achievement__bottom">
        <p>{Description}</p>
        <div className="action">
          <div className="left-line"></div>
          <Link href="/portfolio">
            <a className="button js-link">
              <span>{PortfolioBtn}</span>
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
  );
};

const CultureSection = ({ content }) => {
  const { Description, Header, CultureSlider: CultureSliderContent } = content;

  const TOTAL_CULTURES = CultureSliderContent.length;
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

            {CultureSliderContent.map((data, index) => {
              return (
                <div
                  className={`culture-slider__content ${index === 0 ? "active" : ""}`}
                  data-culture-index={index + 1}
                  key={data.id}
                >
                  <span className="subtitle--small">{data?.Title}</span>
                  <div className="content-wrapper">
                    {splitTextToLines(data.Statement).length <= 1 ? (
                      <q>{data.Statement}</q>
                    ) : (
                      <ul className="quote">
                        {splitTextToLines(data.Statement).map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
            {/* 
            <div className="culture-slider__content active" data-culture-index="1">
              <span className="subtitle--small">1</span>
              <div className="content-wrapper">
                <q>1</q>
              </div>
            </div>

            <div className="culture-slider__content" data-culture-index="2">
              <span className="subtitle--small">2</span>
              <div className="content-wrapper">
                <q>2</q>
              </div>
            </div>

            <div className="culture-slider__content" data-culture-index="3">
              <span className="subtitle--small">3</span>
              <div className="content-wrapper">
                <ul className="quote">2</ul>
              </div>
            </div> */}
          </div>

          <div className="culture-line-process" ref={(el) => ($cultureLineProcess = el)}></div>
        </div>
      </div>
    );
  };

  return (
    <section className="section culture">
      <h1 className="culture__title">
        {splitTextToLines(Header).map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <p className="culture__description">{Description}</p>
      <div className="culture__logo">
        <svg id="culture-svg" viewBox="0 0 140 502" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  );
};

const OverviewSection = ({ content }) => {
  return (
    <section className="section overview">
      <div className="container">
        <div className="left img-container">
          <Image src={content.Image.url} loading="lazy" alt="overview" layout="fill" />
        </div>

        <div className="right">
          <h1>
            {splitTextToLines(content.Header).map((line) => (
              <div key={line}>{line}</div>
            ))}
          </h1>
          <h2 style={{ fontWeight: 600 }}>{content.HighlightText}</h2>
          <p className="first-paragraph">{content.FirstDescription}</p>
          <p className="seconed-paragraph">{content.SecondDescription}</p>
        </div>
      </div>
    </section>
  );
};

const TeamSection = ({ content }) => {
  // const content = {
  //   title: ,
  //   subtitle: "IMPC is not only focusing on developing and providing services to our customers.",
  //   paragraph:
  //     "Our Company also heading to enhance the teams and people, non-stop in the development of skills, abilities, and ethics to enhance our team",
  //   imgURL: "/assets/images/out-team.webp",
  // };

  const { Header, HighlightText, Description, Image: TeamImage } = content;

  return (
    <section className="section team">
      <div className="team__text">
        <h1>{Header}</h1>
        <h2 style={{ fontWeight: 600 }}>{HighlightText}</h2>
        <p>{Description}</p>
      </div>
      <div className="team__image">
        <figure>
          <img
            className="main-img"
            style={{ height: "100%" }}
            height="200px"
            src={TeamImage.url}
            alt="Out team"
            layout="fill"
          />
        </figure>
      </div>
    </section>
  );
};

const PartnerSection = ({ content }) => {
  const { Header, CustomersPartnersList } = content;

  return (
    <section className="section partner last-section" style={{ overflowY: "scroll" }}>
      <h1>{Header}</h1>
      <ul className="partner__grid-logo" style={{ overscrollBehavior: "contain" }}>
        {CustomersPartnersList.map((partner) => (
          <li key={partner.imageUrl}>
            <div className="partner__item">
              <img
                className="img"
                src={partner.imageUrl}
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
  );
};

const BannerSection = ({ pageContent }) => {
  const locale = useRouter().locale;
  const {
    Subheader,
    Header1,
    Header2,
    ContactButton,
    BackgroundImage,
    ServiceLinkTitle,
    HomeBannerServiceSliders,
    DefaultSlideImage,
  } = pageContent.HomeBanner;

  return (
    <section className={"banner section section--active"} id="banner">
      <div
        className="banner__background bg-lazy"
        style={{ backgroundImage: `url("${BackgroundImage.url}")` }}
      ></div>
      <div className="banner__title">
        <h3>
          <div className="line">
            <span>{Subheader}</span>
          </div>
        </h3>
        <h1
          className="text-overlap-transform-wrapper"
          style={locale === "vi" ? { "--lh-xs": 1.5 } : undefined}
        >
          <div
            className="text-overlap-transform text-overlap-transform--base"
            data-banner-img-index="0"
          >
            {splitTextToLines(Header1).map((line) => (
              <div className="line" key={line}>
                <span>{line}</span>
              </div>
            ))}
          </div>
          <div
            className="text-overlap-transform text-overlap-transform--other"
            data-banner-img-index="1"
          >
            {splitTextToLines(Header2).map((line) => (
              <div className="line" key={line}>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </h1>
      </div>

      <div className="banner__services--mobile">
        <ul>
          {HomeBannerServiceSliders.map((service) => (
            <li className="subtitle" key={service.name}>
              {service.Title}
            </li>
          ))}
        </ul>
      </div>

      <div className="banner__actions">
        <Link href="/services">
          <a className="button--link js-link">
            {ServiceLinkTitle}
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
          {ContactButton}
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
          {HomeBannerServiceSliders.map(({ Title }, index) => {
            return (
              <div key={Title} className="text-overlap-transform" data-banner-img-index={index + 1}>
                {splitTextToLines(Title).map((line) => (
                  <div className="line" key={line}>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        <figure className="banner__image">
          <div className="img-wrapper active" data-banner-img-index="0">
            <Image
              // src="/assets/images/banner.webp"
              src={DefaultSlideImage.url}
              // src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              className="slider__img lazy-img "
              alt="banner"
              objectFit="cover"
              layout="fill"
            />
          </div>
          {HomeBannerServiceSliders.map(({ ImageURL, Title }, index) => {
            return (
              <div className="img-wrapper" key={index} data-banner-img-index={index + 1}>
                <Image
                  objectFit="cover"
                  className="slider__img lazy-img"
                  placeholder="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                  src={ImageURL?.url}
                  alt={Title}
                  layout="fill"
                  loading="eager"
                  height={"100%"}
                  width={"100%"}
                />
              </div>
            );
          })}
        </figure>
      </div>
    </section>
  );
};

export default function Home({ pageContent }) {
  const { setOpenDrawer } = useContext(GlobalContext);

  const { pageTransitionTimeline } = useContext(TransitionContext);

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

    initPagepiling(SectionAnimations);

    const body = document.querySelector("body");
    document.body.classList.add("fix-screen-laptop");

    return () => {
      body.classList.remove("fix-screen-laptop");
      SectionAnimations.Banner.out();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    SectionAnimations.Banner.preAnimate();

    pageTransitionTimeline.afterEnter = SectionAnimations.Banner.animate;
  }, []);

  return (
    <div className={styles.page}>
      <Seo Seo={pageContent.Seo} />

      <div className="">
        <Header />
        <main id="page-piling" className={`${pagePilingStyles["page-piling"]} page-content`}>
          <BannerSection pageContent={pageContent} />

          <AchievementSection pageContent={pageContent} />

          <OverviewSection content={pageContent.CompanyOverview} />

          <CultureSection content={pageContent.HomeCulture} />

          <TeamSection content={pageContent.HomeOurTeam} />

          <PartnerSection content={pageContent.HomePartnerCustomer} />

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

export const getStaticProps = async ({ locale }) => {
  const pageContent = await fetchHomepage(locale);

  return {
    props: {
      pageContent,
    },
    revalidate: 60,
  };
};
