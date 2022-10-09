import { useContext, useRef } from "react";
import Footer from "../components/Footer";
import styles from "../styles/service.module.scss";

import Header from "../components/Header";
import gsap, { Power2, Power3, Power0 } from "gsap";

import ScreenTracking from "../lib/screen-tracking";

import Link from "next/link";
import headerStyles from "../components/header.module.scss";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { TransitionContext } from "../components/PageLoader";
import { splitTextToLines } from "../lib/utils";
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import { fetchServicePage } from "../services";
import Seo from "../components/Seo";




const scroller = ".panel-wrapper";

const ServiceSlider = ({ sliderItems }) => {
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
        {sliderItems.map((item, i) => {
    
          return (
            <div
              key={item.Subheader}
              className={`slider__image ${i === 0 ? "active" : ""}`}
              data-slider-index={i + 1}
            >
              <img src={item.Image?.url} loading="lazy" alt="" />
              <div className="slider__image-overlap"></div>
            </div>
          );
        })}
      </div>

      <div className="slider__wrapper-content">
        <div className="slider__controller">
          <div className="slider__counter">
            <span className="counter-index">1</span>
            <span>/</span>
            <span>{sliderItems.length}</span>
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
          {sliderItems.map((item, i) => (
            <div
              key={item.Subheader}
              className={`slider__content ${i == 0 ? "active" : 1}`}
              data-slider-index={i + 1}
            >
              <div className="sub-header2">{item.Subheader}</div>
              <h2>{item.Header}</h2>
              <p>{item.Description}</p>
            </div>
          ))}
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

const SectionHeader = ({ headerText, portfolioLink }) => {
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
ServiceSection.Header = SectionHeader;

const SectionBody = ({ children, className }) => {
  return <div className={`service-section__body ${className}`}>{children}</div>;
};

ServiceSection.Body = SectionBody;
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function ServicesPage({ pageContent }) {
  const { pageTransitionTimeline } = useContext(TransitionContext);
  let scrollTriggerRef = useRef(null);
  const handleScroll = () => {
    let condition = scrollTriggerRef?.current.scrollTop > 50;
    if (!condition) {
      document.querySelector("#header").classList.add(headerStyles["header--transparent"]);
    } else {
      document.querySelector("#header").classList.remove(headerStyles["header--transparent"]);
    }
  };

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });

    if (ScreenTracking.isOnLaptop()) {
      prepareAnimation();
      pageTransitionTimeline.beforeEnter = () => {
        prepareAnimation();
      };
      pageTransitionTimeline.afterEnter = () => {
        if (ScreenTracking.isOnLaptop()) {
          animateForBannerSection();
          animateForPlanSection();
          animateforPermittingSection();
          animateForProjectSection();
          animateForIndustrialSection();
          animateForFooter();
        }
      };

      let scrollTween;

      function goToSection(i) {
        if (!window) return;
        scrollTween = gsap.to(window, {
          scrollTo: { y: i * innerHeight, autoKill: false },
          duration: 0.2,
          onComplete: () => (scrollTween = null),
          overwrite: true,
        });
      }

      let $panelWrapper = document.querySelector(".panel-wrapper");

      $panelWrapper.addEventListener("scroll", handleScroll);

      gsap.utils.toArray(".scroll-panel").forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top bottom",
          end: "+=200%",
          scroller: scroller,
          onToggle: (self) => self.isActive && !scrollTween && goToSection(i),
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        snap: 1 / 5,
        duration: 0.5,
        ease: Power0.easeIn,
        scroller: ".panel-wrapper",
      });

      ScrollTrigger.refresh();
    }

    return () => {
      scrollTriggerRef?.current.removeEventListener("scroll", handleScroll);
      if (ScreenTracking.isOnLaptop()) {
        let triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          trigger.kill(true);
        });
        ScrollTrigger.refresh();
      }
    };
  }, []);

  const animateForSectionHeader = (sectionClassName) => {
    gsap.set(`.${sectionClassName} .service-section__header`, {
      // opacity: 0,
      "--bottom-line-width": 0,
      // x: "-100%",
    });
    gsap.set(`.${sectionClassName} .service-section__header svg path`, {
      strokeDasharray: "1000",
      strokeDashoffset: "1000",
      transformOrigin: "bottom",
    });

    const tl = gsap.timeline({
      delay: 0.2,
      scrollTrigger: {
        trigger: `.${sectionClassName}`,
        scroller,
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

    tl.to(
      `.${sectionClassName} .service-section__header svg path`,

      {
        strokeDashoffset: 0,
        ease: Power2.easeInOut,
      }
    );

    tl.to(
      `.${sectionClassName} .service-section__header`,
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
    if (!ScreenTracking.isOnLaptop()) return;
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
          scroller,
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
          scroller,
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
        y: "-5%",
        ease: Power0.easeInOut,
        scrollTrigger: {
          trigger: ".banner",
          scroller,
          scrub: true,
          start: "top top",
        },
      }
    );
  };

  // have 2 types section is slider and other
  const animateForSliderAppear = (sectionClassName) => {
    const trigger = {
      scroller: ".panel-wrapper",
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
      scroller: ".panel-wrapper",
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

    gsap.fromTo(
      [
        `.${sectionClassName} .service-section__content .sub-header2`,
        `.${sectionClassName} .service-section__content h2`,
        `.${sectionClassName} .service-section__content p`,
      ],
      {
        x: 100,
        opacity: 0,
      },
      {
        opacity: 1,
        x: 0,
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

  const animateForFooter = () => {
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
      scale: 0.8,
      y: "100%",
    });

    gsap.set(".footer__bottom-line", {
      scaleX: 0,
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: `footer`,
        scroller: scroller,
        start: "top center",
      },
      delay: 0.2,
    });
    gsap.to("footer .naviation-list li", {
      opacity: 1,
      scrollTrigger: {
        trigger: `footer`,
        scroller,
        start: "top center",
      },
      y: 0,
      duration: 0.8,
      ease: Power3.easeInOut,
      stagger: 0.2,
    });

    gsap.to("footer nav .slogan", {
      opacity: 1,
      scrollTrigger: {
        trigger: `footer`,
        scroller,
        start: "top center",
      },
      y: 0,
      duration: 0.8,
      ease: Power3.easeInOut,
    });

    tl2.to("footer .footer__infomations section", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: Power3.easeInOut,
    });

    tl2.to(
      ".footer__bottom-line",
      {
        scaleX: 1,
        duration: 0.8,
        ease: Power3.easeInOut,
      },
      "<"
    );
    tl2.to("footer .map", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: Power3.easeInOut,
    });
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

  const content = {
    banner: {
      paragraph:
        "Given the dramatic increase in Industrial Development Investors, we understand the opportunities, as well as the great demand and concerns of these potential clients in consulting and providing services during the planning and development phase of their projects.",
      backgroudImgURL: "/assets/images/services/service-banner.webp",
    },
    planAndDesign: {
      header: "PLANNING AND DESIGN",
      sliderItems: [
        {
          imgUrl: "/assets/images/services/plan.webp",
          subHeader: "PLANNING",
          header:
            "A team of elite planners, architects, economists, and former policymakers provides our top-notch planning service.",
          paragraph: `IMPC provides a holistic and integrated approach to economic growth, climate adaptation, infrastructure investment, and land use management as a specialized and
innovative planning agency.`,
        },
        {
          imgUrl: "/assets/images/services/design.webp",
          subHeader: "DESIGN",
          header:
            "A team of elite planners, architects, economists, and former policymakers provides our top-notch planning service.",
          paragraph: `A team of architects and engineers with extensive experience in architecture,
infrastructure, structures, M&E, and fire protection. Deep experience in the legal
aspects of industrial construction projects, and always up to date on national laws
and local regulations.`,
        },
      ],
    },
    permitting: {
      header: "PERMITTING",
      header2:
        "Construction-related permitting services are initiated at an early stage of the project.",
      paragraph:
        "IMPC is an Industrial Estate Management service provider with experience in managing facility services that can drive and demonstrate a significant reduction in the cost of operating the facility while maintaining or improving the quality and level of Investor service.",
      imgURL: "/assets/images/services/permitting.webp",
    },
    projectAndConstruct: {
      header: "PROJECT AND CONSTRUCTION MANAGEMENT",
      sliderITems: [
        {
          imgUrl: "/assets/images/services/project.webp",
          subHeader: "PROJECT MANAGEMENT",
          header: "IMPC work closely with our customers.",
          paragraph: `Throughout the project planning and development phase, we work closely with our
            customers to deliver projects of cost and quality efficiency.`,
        },
        {
          imgUrl: "/assets/images/services/construction.webp",
          subHeader: "CONSTRUCTION MANAGEMENT",
          header: "Construction quality control and supervision.",
          paragraph: `IMPC provides hands-on construction project management services to our customers
            by deploying quality resources to meet the demands of each customer to deliver
            quality buildings and properties. We focus on controlling the project’s time,
            cost, and quality.`,
        },
      ],
    },
    industrial: {
      header: "INDUSTRIAL ESTATE MANAGEMENT",
      header2: `Experience in \n managing facility services`,
      paragraph:
        "IMPC is an Industrial Estate Management service provider with experience in managing facility services that can drive and demonstrate a significant reduction in the cost of  the facility while maintaining or improving the quality and level of Investor service.",
      imgURL: "/assets/images/services/industrial.webp",
    },
  };

  let BannerHeader = `OUR **SERVICES**
**SOLUTION** FOR
YOUR BUSINESS`;

  let HeaderRender = ({ header }) => {
    let isContinuteToNextLine = false;
    const FORMAT_CHAR = "**";

    let result = splitTextToLines(header).map((line) => {
      let start = 0;
      start = line.indexOf(FORMAT_CHAR);

      let newLine = line;

      if (isContinuteToNextLine) {
        newLine = `<span class="secondary-color">` + newLine;
      }
      while (start >= 0) {
        if (isContinuteToNextLine) {
          newLine = newLine.replace(FORMAT_CHAR, "</span>");
          isContinuteToNextLine = false;

          start = line.indexOf(FORMAT_CHAR, start + 1);

          if (start < 0) break;
          continue;
        } else {
          newLine = newLine.replace(FORMAT_CHAR, `<span class="secondary-color">`);
        }

        let end = line.indexOf(FORMAT_CHAR, start + 1);
        if (end < 0) {
          newLine = newLine + "</span>";
          isContinuteToNextLine = true;
          break;
        } else {
          isContinuteToNextLine = false;
          newLine = newLine.replace(FORMAT_CHAR, "</span>");
          start = line.indexOf(FORMAT_CHAR, end + 1);
        }
      }

      return `<div class="line">${newLine}</div>`;
    });

    return <div dangerouslySetInnerHTML={{ __html: result.join("") }}></div>;
  };

  return (
    <div
      className={styles.page}
      // className="smooth-scroll"
      data-scroll-container
    >
      <Seo Seo={pageContent.Seo} />

      <Header />

      <main className="panel-wrapper" ref={scrollTriggerRef}>
        <section className="banner scroll-panel">
          <div className="banner__background">
            <img
              className="lazy-img"
              // src="/assets/images/services/service-banner_lazy.webp"
              src={pageContent.ServiceBanner.BackgroundImage.url}
              alt="Banner background"
            />
          </div>
          <div className="section__wrapper">
            <div className="banner__title">
              <h1>
                <HeaderRender header={pageContent.ServiceBanner.Header} />
                {/* <div>
                  OUR <span className="secondary-color">SERVICES</span>
                </div>
                <div>
                  <span className="secondary-color">SOLUTION</span> FOR
                </div>
                <div>YOUR BUSINESS</div> */}
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
                <p>{pageContent.ServiceBanner.Description}</p>
              </div>
            </div>
          </div>
        </section>

        <ServiceSection id="planAndDesign" className="plan-and-design scroll-panel">
          <ServiceSection.Header
            headerText={pageContent.PlanningAndDesign.Header}
            portfolioLink={"/portfolio/?serviceId=0"}
          ></ServiceSection.Header>
          <ServiceSection.Body>
            <ServiceSlider sliderItems={pageContent.PlanningAndDesign.SliderItems}></ServiceSlider>
          </ServiceSection.Body>
        </ServiceSection>

        <ServiceSection id="permitting" className="permitting scroll-panel">
          <ServiceSection.Header
            headerText={pageContent.Permitting.Header}
            portfolioLink={"/portfolio/?serviceId=1"}
          ></ServiceSection.Header>
          <ServiceSection.Body className="service-section__container">
            <div className="service__image left">
              <img
                src={pageContent.Permitting.Content.Image?.url}
                loading="lazy"
                alt="permitting"
              />
            </div>
            <div className="service-section__content">
              <div className="background bg-lazy"></div>
              <div className="sub-header2">{pageContent.Permitting.Content.Subheader}</div>
              <h2>
                {splitTextToLines(pageContent.Permitting.Content.Header).map((line) => (
                  <div className="line" key={line}>
                    <span>{line}</span>
                  </div>
                ))}
              </h2>

              <p>{pageContent.Permitting.Content.Description}</p>
            </div>
          </ServiceSection.Body>
        </ServiceSection>

        <ServiceSection className="project scroll-panel">
          <ServiceSection.Header
            headerText={pageContent.ProjectAndConstructionManagement.Header}
            portfolioLink={"/portfolio/?serviceId=2"}
          ></ServiceSection.Header>
          <ServiceSection.Body>
            <ServiceSlider
              sliderItems={pageContent.ProjectAndConstructionManagement.SliderItems}
            ></ServiceSlider>
          </ServiceSection.Body>
        </ServiceSection>

        <ServiceSection id="industrial" className="industrial scroll-panel">
          <ServiceSection.Header
            headerText={pageContent.IndustrialEstateManagement.Header}
            portfolioLink={"/portfolio/?serviceId=3"}
          ></ServiceSection.Header>
          <ServiceSection.Body>
            <div className="service-section__container service-section__container--reverse">
              <div className="service__image">
                <img
                  src={pageContent.IndustrialEstateManagement.Content.Image?.url}
                  loading="lazy"
                  height="100%"
                  width="100%"
                  alt="industrial"
                />
              </div>
              <div className="service-section__content">
                <div className="background bg-lazy"></div>
                <div className="sub-header2">{content.industrial.header}</div>
                <h2>
                  {splitTextToLines(pageContent.IndustrialEstateManagement.Content.Header).map(
                    (line) => (
                      <div className="line" key={line}>
                        <span>{line}</span>
                      </div>
                    )
                  )}
                </h2>

                <p>{pageContent.IndustrialEstateManagement.Content.Description}</p>
              </div>
            </div>
          </ServiceSection.Body>
        </ServiceSection>

        <Footer className="scroll-panel" />
      </main>

      <ScrollToTopButton scrollTriggerRef={scrollTriggerRef} />
    </div>
  );
}

export const getStaticProps = async ({ locale }) => {
  const pageContent = await fetchServicePage(locale);

  return {
    props: {
      pageContent,
    },
    revalidate: 1,
  };
};
