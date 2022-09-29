import Head from "next/head";
import Image from "next/image";
import { Children, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/service.module.scss";

import cn from "classnames";
import Header from "../components/Header";
import gsap, { Power2, Power3, Power0 } from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import ScreenTracking from "../lib/screen-tracking";

import Link from "next/link";
import headerStyles from "../components/header.module.scss";
import GlobalContext from "../contexts/GlobalContext";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { TransitionContext } from "../components/PageLoader";

// import LocomotiveScroll from "locomotive-scroll";

// const isMoving = () => {
//   let currentTime = new Date().getTime();
//   return currentTime - lastAnimation < 1000;
// };
// const updateLastAnimationTime = () => {
//   let currentTime = new Date().getTime();
//   lastAnimation = currentTime;
// };
// let lastAnimation = 0;

const ScrollPanel = ({ children }) => {
  return <div className="scroll-panel">{children}</div>;
};

const ServiceSlider = () => {
  let $slidersElementRef = useRef(null);
  let lastAnimation = 0;
  const TOTAL_PLAN_SLIDER = 2;
  gsap.defaults({
    ease: Power3.easeInOut,
    duration: 1.2,
  });

  const isMoving = () => {
    let currentTime = new Date().getTime();
    return currentTime - lastAnimation < 1000;
  };
  const updateLastAnimationTime = () => {
    let currentTime = new Date().getTime();
    lastAnimation = currentTime;
  };

  const handlePrevClick = () => {
    if (isMoving()) return;
    let $slidersElement = $slidersElementRef.current;
    let $currentSlider = $slidersElement.querySelector(".slider__content.active");
    let currentSliderIndex = parseInt($currentSlider.dataset.sliderIndex);
    let nextSliderIndex = currentSliderIndex === TOTAL_PLAN_SLIDER ? 1 : currentSliderIndex + 1;
    let $nextSliderElement = $slidersElement.querySelector(
      `.slider__content[data-slider-index="${nextSliderIndex}"]`
    );
    let $currentImageElement = $slidersElement.querySelector(".slider__image.active");

    let $nextImageWrapper = $slidersElement.querySelector(
      `.slider__image[data-slider-index="${nextSliderIndex}"]`
    );
    let $nextImage = $slidersElement.querySelector(
      `.slider__image[data-slider-index="${nextSliderIndex}"] img`
    );
    let $nextImageOverlap = $slidersElement.querySelector(
      `.slider__image[data-slider-index="${nextSliderIndex}"] .slider__image-overlap`
    );

    // ANIMATE CONTENT
    gsap.fromTo(
      $nextSliderElement,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    );

    gsap.fromTo(
      $currentSlider.querySelectorAll(".sub-header2, h2, p"),
      {
        x: 0,
        opacity: 1,
      },
      {
        x: "-100%",
        opacity: 0,
        stagger: 0.1,
      }
    );

    gsap.fromTo(
      $nextSliderElement.querySelectorAll(".sub-header2, h2, p"),
      {
        x: "100%",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        delay: 0.2,
        stagger: 0.1,
      }
    );

    // ANIMATE IMAGE
    gsap.set($currentImageElement, { zIndex: 1 });
    gsap.set($nextImageWrapper, { zIndex: 2, x: "100%" });

    gsap.set($nextImage, { zIndex: 2, x: "-50%" });
    gsap.set($nextImageOverlap, { zIndex: 3, x: "100%" });

    gsap.to($nextImageWrapper, {
      x: 0,
      duration: 1.2,
      ease: Power2.easeInOut,
    });
    gsap.to($nextImage, {
      x: 0,
      duration: 1.2,
      ease: Power2.easeInOut,
      onComplete: () => {
        $currentSlider.classList.toggle("active");
        $nextSliderElement.classList.toggle("active");
        $currentImageElement.classList.toggle("active");
        $nextImageWrapper.classList.toggle("active");
      },
    });

    $slidersElement.querySelector(".counter-index").textContent = nextSliderIndex;
    updateLastAnimationTime();
  };

  const handleNextClick = () => {
    if (isMoving()) return;
    let $slidersElement = $slidersElementRef.current;
    // content
    let $currentSlider = $slidersElement.querySelector(".slider__content.active");
    let currentSliderIndex = parseInt($currentSlider.dataset.sliderIndex);
    let prevSliderIndex = currentSliderIndex === 1 ? TOTAL_PLAN_SLIDER : currentSliderIndex - 1;
    let $prevSliderElement = $slidersElement.querySelector(
      `.slider__content[data-slider-index="${prevSliderIndex}"]`
    );

    // CURRENT IMAGE
    let $currentImageWrapper = $slidersElement.querySelector(".slider__image.active");
    let $currentImage = $currentImageWrapper.querySelector(`img`);

    // PREV IMG
    let $prevImageElement = $slidersElement.querySelector(
      `.slider__image[data-slider-index="${prevSliderIndex}"]`
    );

    // ANIMATE CONTENT
    gsap.fromTo(
      $prevSliderElement,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      }
    );

    gsap.fromTo(
      $currentSlider.querySelectorAll(".sub-header2, h2, p"),
      {
        x: 0,
        opacity: 1,
      },
      {
        x: "100%",
        opacity: 0,
        stagger: 0.1,
      }
    );

    gsap.fromTo(
      $prevSliderElement.querySelectorAll(".sub-header2, h2, p"),
      {
        x: "-100%",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        delay: 0.2,
        stagger: 0.1,
      }
    );

    // ANIMATE IMAGE
    gsap.set($prevImageElement, { zIndex: 1, x: 0 });

    gsap.set($currentImage, { zIndex: 2, x: 0 });

    gsap.fromTo(
      $currentImageWrapper,
      { zIndex: 2, x: 0 },
      {
        x: "100%",
        duration: 1.2,
        ease: Power2.easeInOut,
      }
    );

    gsap.fromTo(
      $currentImage,
      { x: 0 },
      {
        x: "-50%",
        duration: 1.2,
        ease: Power2.easeInOut,
        onComplete: () => {
          gsap.set($currentImage, { x: 0 });
          $currentSlider.classList.toggle("active");
          $prevSliderElement.classList.toggle("active");

          $prevImageElement.classList.toggle("active");
          $currentImageWrapper.classList.toggle("active");
        },
      }
    );

    $slidersElement.querySelector(".counter-index").textContent = prevSliderIndex;

    updateLastAnimationTime();
  };

  return (
    <div className="slider" ref={$slidersElementRef}>
      <div className="slider__images">
        <div className="slider__image active" data-slider-index="1">
          <img src="/assets/images/services/plan.webp" loading="lazy" alt="" />
          <div className="slider__image-overlap"></div>
        </div>

        <div className="slider__image" data-slider-index="2">
          <img src="/assets/images/services/design.webp" loading="lazy" alt="" />
          <div className="slider__image-overlap"></div>
        </div>
      </div>

      <div className="slider__wrapper-content">
        <div className="slider__controller">
          <div className="slider__counter">
            <span className="counter-index">1</span>
            <span>/</span>
            <span>2</span>
          </div>
          <div className="slider__nav">
            <button className="prev" onClick={handlePrevClick}>
              <svg
                width="33"
                height="14"
                viewBox="0 0 33 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M32.5 7.65479L2.55336 7.65478" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8.10156 13.2007L2.00132 7.65501L8.10156 1.0002"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button className="next" onClick={handleNextClick}>
              <svg
                width="32"
                height="14"
                viewBox="0 0 32 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 7.65479L29.9466 7.65478" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M24.3984 13.2007L30.4987 7.65501L24.3984 1.0002"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="slider__contents">
          <div className="slider__content active" data-slider-index="1">
            <div className="sub-header2">PLANNING</div>
            <h2>
              A team of elite planners, architects, economists, and former policymakers provides our
              top-notch planning service.
            </h2>
            <p>
              IMPC provides a holistic and integrated approach to economic growth, climate
              adaptation, infrastructure investment, and land use management as a specialized and
              innovative planning agency.
            </p>
          </div>

          <div className="slider__content" data-slider-index="2">
            <div className="sub-header2">DESIGN</div>
            <h2>
              Extensive and detailed experience as an operator who understands the needs of the
              end-user for each specific industrial project.
            </h2>
            <div className="paragraphs">
              <p>
                A team of architects and engineers with extensive experience in architecture,
                infrastructure, structures, M&E, and fire protection. Deep experience in the legal
                aspects of industrial construction projects, and always up to date on national laws
                and local regulations.
              </p>
              {/* <!-- <p>
                        Deep experience in the legal aspects of industrial construction projects, and
                        always up to date on national laws and local regulations.
                      </p> --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = ({ id, className, children }) => {
  return (
    <section id={id} className={`service-section ${className}`}>
      {children}
    </section>
  );
};

ServiceSection.Header = ({ headerText, portfolioLink }) => {
  return (
    <div className="service-section__header">
      <h2>{headerText}</h2>
      <Link href={portfolioLink}>
        <a className="portfolio-navigation js-link">
          <h2>PORTFOLIO</h2>
          <span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 23.4357L23 1.8623M23 1.8623H12.9429M23 1.8623V10.6083"
                stroke="#EC8922"
                strokeWidth="2"
              />
            </svg>
          </span>
        </a>
      </Link>
    </div>
  );
};

ServiceSection.Body = ({ children, className }) => {
  return <div className={`service-section__body ${className}`}>{children}</div>;
};
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ServicesPage() {
  const { pageTransitionTimeline } = useContext(TransitionContext);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });

    pageTransitionTimeline.beforeEnter = () => {
      if (ScreenTracking.isOnLaptop()) {
        prepareAnimation();
      }
    };
    pageTransitionTimeline.afterEnter = () => {
      if (ScreenTracking.isOnLaptop()) {
        // animateForBannerSection();
        // animateForPlanSection();
        // animateforPermittingSection();
        // animateForProjectSection();
        // animateForIndustrialSection();
        // animateForFooter();
      }
    };

    let scroller = undefined;

    let panels = gsap.utils.toArray(".scroll-panel"),
      scrollTween;

    function goToSection(i) {
      if (!window) return;
      scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        duration: 1,
        onComplete: () => (scrollTween = null),
        overwrite: true,
      });
    }

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=200%",
        scroller: ".panel-wrapper",
        onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
      });
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: 1 / 5,
      scroller: ".panel-wrapper",
    });

    ScrollTrigger.refresh();
    return () => {
      let triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        trigger.kill(true);
      });
    };
  }, []);

  const animateForSectionHeader = (sectionClassName) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${sectionClassName}`,
        // scroller: "main",
      },
    });

    tl.from(
      `.${sectionClassName} .service-section__header h2`,
      {
        y: 100,
        opacity: 0,
        ease: Power2.easeInOut,
      },
      "<"
    );

    tl.fromTo(
      `.${sectionClassName} .service-section__header svg path`,
      {
        strokeDasharray: "1000",
        strokeDashoffset: "1000",
      },
      {
        strokeDashoffset: 0,
        ease: Power2.easeInOut,
      }
    );

    tl.fromTo(
      `.${sectionClassName} .service-section__header`,
      {
        // opacity: 0,
        "--bottom-line-width": 0,
        // x: "-100%",
      },
      {
        x: 0,
        opacity: 1,
        "--bottom-line-width": 100,
        duration: 0.8,
        ease: Power3.easeInOut,
      },
      "<-0.2"
    );
  };

  const prepareAnimation = () => {
    gsap.set(".banner h1", {
      y: 100,
      opacity: 0,
    });

    gsap.set(".banner .banner__content", {
      y: 100,
      opacity: 0,
    });
  };
  const animateForBannerSection = () => {
    gsap.to(".banner h1", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: Power2.easeOut,
    });

    gsap.to(".banner .banner__content", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: Power2.easeInOut,
    });

    gsap.fromTo(
      ".banner .banner__title",
      {
        y: 0,
      },
      {
        y: "80%",
        scrollTrigger: {
          trigger: ".banner .banner__title",
          // scroller: "main",
          scrub: true,

          start: "center center",
        },
        ease: Power0.easeInOut,
      }
    );

    gsap.fromTo(
      ".banner .banner__content",
      {
        y: 0,
      },
      {
        y: `${
          document.querySelector(".banner .banner__content").clientHeight -
          document.querySelector(".banner .banner__paragraphs").clientHeight -
          40
        }px`,
        scrollTrigger: {
          trigger: ".banner .banner__title",
          // scroller: "main",
          scrub: true,
          start: "center center",
        },
        ease: Power0.easeInOut,
      }
    );

    gsap.fromTo(
      ".banner .banner__background",
      {
        y: 0,
      },
      {
        y: "30%",
        ease: Power0.easeInOut,
        scrollTrigger: {
          trigger: ".banner",
          // scroller: "main",
          scrub: true,
          start: "top top",
        },
      }
    );
  };

  // have 2 types section is slider and other
  const animateForSliderAppear = (sectionClassName) => {
    const trigger = {
      // scroller: "main",
      // scrub: true,
      trigger: `.${sectionClassName}`,
      start: "top center",
    };

    gsap.from(`.${sectionClassName} .slider__images`, {
      "--overlap-width": "100%",
      scrollTrigger: trigger,
      duration: 1.2,
      ease: Power2.easeInOut,
    });

    gsap.from(`.${sectionClassName} .slider__wrapper-content`, {
      "--overlap-width": "100%",
      scrollTrigger: trigger,
      duration: 1.2,

      ease: Power2.easeInOut,
    });
  };

  const animateForContentAppear = (sectionClassName) => {
    let duration = 1.2;
    let ease = Power2.easeInOut;

    const scrollTrigger = {
      // scroller: "main",
      trigger: `.${sectionClassName} .service__image`,
      start: "top center",
    };

    gsap.from(`.${sectionClassName} .service__image`, {
      "--overlap-width": "100%",
      scrollTrigger: scrollTrigger,
      duration: duration,
      ease: ease,
    });

    gsap.from(`.${sectionClassName} .service-section__content`, {
      "--overlap-width": "100%",
      scrollTrigger: scrollTrigger,
      duration: duration,
      delay: 0.4,
      ease: ease,
    });

    gsap.from(
      [
        `.${sectionClassName} .service-section__content .sub-header2`,
        `.${sectionClassName} .service-section__content h2`,
        `.${sectionClassName} .service-section__content p`,
      ],
      {
        x: 100,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: scrollTrigger,
        duration: duration,
        delay: 0.4,
        ease: ease,
      }
    );
  };

  const animateForPlanSection = () => {
    animateForSectionHeader("plan-and-design");
    animateForSliderAppear("plan-and-design");
  };

  const animateforPermittingSection = () => {
    animateForSectionHeader("permitting");
    animateForContentAppear("permitting");
  };

  const animateForProjectSection = () => {
    animateForSectionHeader("project");
    animateForSliderAppear("project");
  };

  const animateForIndustrialSection = () => {
    animateForSectionHeader("industrial");
    animateForContentAppear("industrial");
  };
  return (
    <div
      className={styles.page}
      // className="smooth-scroll"
      data-scroll-container
    >
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

      <Header />
      <main className="panel-wrapper">
        <ScrollPanel>
          <section className="banner panel">
            <div className="banner__background">
              <img
                className="lazy-img"
                // src="/assets/images/services/service-banner_lazy.webp"
                src="/assets/images/services/service-banner.webp"
                alt="Banner background"
              />
            </div>
            <div className="section__wrapper">
              <div className="banner__title">
                <h1>
                  <div>
                    OUR <span className="secondary-color">SERVICES</span>
                  </div>
                  <div>
                    <span className="secondary-color">SOLUTION</span> FOR
                  </div>
                  <div>YOUR BUSINESS</div>
                </h1>
              </div>
              <div className="banner__content">
                <div className="quote-icon">
                  <svg
                    width="73"
                    height="58"
                    viewBox="0 0 73 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 33.6195L17.1269 0H31.4462L19.6538 30.7965H29.7615V58H0V33.6195ZM41.5538 33.6195L58.6808 0H73L61.2077 30.7965H71.3154V58H41.5538V33.6195Z"
                      fill="#0546B4"
                    />
                  </svg>
                </div>
                <div className="banner__paragraphs">
                  <p>
                    Given the dramatic increase in Industrial Development Investors, we understand
                    the opportunities, as well as the great demand and concerns of these potential
                    clients in consulting and providing services during the planning and development
                    phase of their projects.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ScrollPanel>

        <ScrollPanel>
          <ServiceSection id="planAndDesign" className="plan-and-design panel">
            <ServiceSection.Header
              headerText={"PLANNING AND DESIGN"}
              portfolioLink={"/portfolio/?serviceId=0"}
            ></ServiceSection.Header>
            <ServiceSection.Body>
              <ServiceSlider></ServiceSlider>
            </ServiceSection.Body>
          </ServiceSection>
        </ScrollPanel>

        <ScrollPanel>
          <ServiceSection id="permitting" className="permitting panel">
            <ServiceSection.Header
              headerText={"PERMITTING"}
              portfolioLink={"/portfolio/?serviceId=1"}
            ></ServiceSection.Header>
            <ServiceSection.Body className="service-section__container">
              <div className="service__image left">
                <img
                  src="/assets/images/services/permitting.webp"
                  loading="lazy"
                  alt="permitting"
                />
              </div>
              <div className="service-section__content">
                <div className="background bg-lazy"></div>
                <div className="sub-header2">PERMITTING</div>
                <h2>
                  Construction-related permitting services are initiated at an early stage of the
                  project.
                </h2>

                <p>
                  IMPC permitting services will provide investors with a big picture of all related
                  works and effects to their projects, allowing them to recognize and plan a good
                  arrangement for their projects.
                </p>
              </div>
            </ServiceSection.Body>
          </ServiceSection>
        </ScrollPanel>

        <ScrollPanel>
          {" "}
          <section className="project service-section panel">
            <div className="service-section__header">
              <h2>PROJECT AND CONSTRUCTION MANAGEMENT</h2>
              <Link href="/portfolio/?serviceId=2">
                <a className="portfolio-navigation js-link">
                  <h2>PORTFOLIO</h2>
                  <span>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 23.4357L23 1.8623M23 1.8623H12.9429M23 1.8623V10.6083"
                        stroke="#EC8922"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                </a>
              </Link>
            </div>
            <div className="slider service-section__body">
              <div className="slider__images">
                <div className="slider__image active" data-slider-index="1">
                  <img src="/assets/images/services/project.webp" loading="lazy" alt="" />
                  <div className="slider__image-overlap"></div>
                </div>
                <div className="slider__image" data-slider-index="2">
                  <img src="/assets/images/services/construction.webp" loading="lazy" alt="" />
                  <div className="slider__image-overlap"></div>
                </div>
              </div>

              <div className="slider__wrapper-content">
                <div className="slider__controller">
                  <div className="slider__counter">
                    <span className="counter-index">1</span>
                    <span>/</span>
                    <span>2</span>
                  </div>
                  <div className="slider__nav">
                    <button className="prev">
                      <svg
                        width="33"
                        height="14"
                        viewBox="0 0 33 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.5 7.65479L2.55336 7.65478"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M8.10156 13.2007L2.00132 7.65501L8.10156 1.0002"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                    <button className="next">
                      <svg
                        width="32"
                        height="14"
                        viewBox="0 0 32 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 7.65479L29.9466 7.65478"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M24.3984 13.2007L30.4987 7.65501L24.3984 1.0002"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="slider__contents">
                  <div className="slider__content active" data-slider-index="1">
                    <div className="sub-header2">PROJECT MANAGEMENT</div>
                    <h2>IMPC work closely with our customers </h2>
                    <p>
                      Throughout the project planning and development phase, we work closely with
                      our customers to deliver projects of cost and quality efficiency.
                    </p>
                    <p></p>
                  </div>

                  <div className="slider__content" data-slider-index="2">
                    <div className="sub-header2">CONSTRUCTION MANAGEMENT</div>
                    <h2> Construction quality control and supervision. </h2>
                    <p>
                      IMPC provides hands-on construction project management services to our
                      customers by deploying quality resources to meet the demands of each customer
                      to deliver quality buildings and properties. We focus on controlling the
                      project’s time, cost, and quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollPanel>

        <ScrollPanel>
          <ServiceSection id="industrial" className="industrial panel">
            <ServiceSection.Header
              headerText={"INDUSTRIAL ESTATE MANAGEMENT"}
              portfolioLink={"/portfolio/?serviceId=3"}
            ></ServiceSection.Header>
            <ServiceSection.Body>
              <div className="service-section__container service-section__container--reverse">
                <div className="service__image">
                  <img
                    src="/assets/images/services/industrial.webp"
                    loading="lazy"
                    height="100%"
                    width="100%"
                    alt="industrial"
                  />
                </div>
                <div className="service-section__content">
                  <div className="background bg-lazy"></div>
                  <div className="sub-header2">INDUSTRIAL ESTATE MANAGEMENT</div>
                  <h2>
                    <div className="line">
                      <span>Experience in </span>
                    </div>
                    <div className="line">
                      <span> managing facility services </span>
                    </div>
                  </h2>

                  <p>
                    IMPC is an Industrial Estate Management service provider with experience in
                    managing facility services that can drive and demonstrate a significant
                    reduction in the cost of operating the facility while maintaining or improving
                    the quality and level of Investor service.
                  </p>
                </div>
              </div>
            </ServiceSection.Body>
          </ServiceSection>
        </ScrollPanel>

        {/* <section className="industrial service-section">
            <div className="service-section__header">
              <h2>INDUSTRIAL ESTATE MANAGEMENT</h2>
              <a href="/portfolio/?serviceId=3" className="portfolio-navigation js-link">
                <h2>PORTFOLIO</h2>
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 23.4357L23 1.8623M23 1.8623H12.9429M23 1.8623V10.6083"
                      stroke="#EC8922"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div className="service-section__body">
              <div className="service-section__container service-section__container--reverse">
                <div className="service__image">
                  <img
                    src="/assets/images/services/industrial.webp"
                    loading="lazy"
                    height="100%"
                    width="100%"
                    alt="industrial"
                  />
                </div>
                <div className="service-section__content">
                  <div className="background bg-lazy"></div>
                  <div className="sub-header2">INDUSTRIAL ESTATE MANAGEMENT</div>
                  <h2>
                    <div className="line">
                      <span>Experience in </span>
                    </div>
                    <div className="line">
                      <span> managing facility services </span>
                    </div>
                  </h2>

                  <p>
                    IMPC is an Industrial Estate Management service provider with experience in
                    managing facility services that can drive and demonstrate a significant
                    reduction in the cost of operating the facility while maintaining or improving
                    the quality and level of Investor service.
                  </p>
                </div>
              </div>
            </div>
          </section> */}
        <ScrollPanel>
          <Footer className="panel" />
        </ScrollPanel>
      </main>

      <ScrollToTopButton />
    </div>
  );
}
