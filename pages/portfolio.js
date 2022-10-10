import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/portfolio.module.scss";
import Header from "../components/Header";
import gsap, { Power1, Power2, Sine } from "gsap";
import screenTracking from "../lib/screen-tracking";

import ScrollToTopButton from "../components/ScrollToTopButton";
import { TransitionContext } from "../components/PageLoader";
import { splitTextToLines } from "../lib/utils";

import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import { fetchPortfoliPage, fetchProjects } from "../services";
import { getMediaURL } from "../lib/api";
import { useRouter } from "next/router";
import Seo from "../components/Seo";
import GlobalContext from "../contexts/GlobalContext";

const PLANNING = "planning";
const PERMITTING = "permitting";
const PROJECT = "project";
const INDUSTRIAL = "industrial";

export default function PortfolioPage({ pageContent, projects }) {
  const { query, isReady } = useRouter();

  const services = [
    {
      key: PLANNING,
      title: pageContent.PortfolioPlanningAndDesign.ServiceTitle,
      workTitle: pageContent.PortfolioPlanningAndDesign.ServiceTitle,
    },
    {
      key: PERMITTING,
      title: pageContent.PortfolioPermitting.ServiceTitle,
      workTitle: pageContent.PortfolioPermitting.ServiceTitle,
    },
    {
      key: PROJECT,
      title: pageContent.PortfolioProjectAndConstructionManagement.ServiceTitle,
      workTitle: pageContent.PortfolioProjectAndConstructionManagement.ServiceTitle,
    },
    {
      key: INDUSTRIAL,
      title: pageContent.PortfolioIEM.ServiceTitle,
      workTitle: pageContent.PortfolioIEM.ServiceTitle,
    },
  ];

  const [selectedService, setSelectedService] = useState(services[0]);
  const [isDropdownExpand, setDropdownExpand] = useState(false);
  const { pageTransitionTimeline } = useContext(TransitionContext);
  const { setOpenDrawer } = useContext(GlobalContext);
  const toggleDropdown = () => {
    setDropdownExpand(!isDropdownExpand);
  };

  const scrollToTopContent = () => {
    window.scrollTo({
      top:
        document.querySelector(".banner").scrollHeight -
        document.querySelector("header").scrollHeight,
    });
  };

  const prepareAnimateOnLoad = () => {
    if (!screenTracking.isScreenOnLaptop) return;

    document.querySelector("header").classList.remove("header--transparent");
    // tabs animation
    gsap.set(".tab-panel", {
      opacity: 0,
      y: "200px",
    });
    gsap.set(".outwork", {
      opacity: 0,
      y: "200px",
    });

    gsap.set(".tabs", {
      "--line-width": 0,
      // "--line-color": "#0546b4",
      duration: 1,
      ease: Power1.easeOut,
      stagger: 0.3,
    });

    gsap.set(
      ".tab:not(.tab--last)",
      {
        "--height-line": 0,
        ease: Power2.easeOut,
      },
      ">"
    );

    gsap.set(".tab__text", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: Power2.easeOut,
    });
  };

  const animateOnLoad = () => {
    if (!screenTracking.isScreenOnLaptop) return;

    const tl = gsap.timeline();

    // TABS
    tl.to(".tabs", {
      "--line-width": 100,
      duration: 1,
      ease: Power1.easeOut,
      stagger: 0.3,
    });

    tl.to(
      ".tab:not(.tab--last)",
      {
        "--height-line": 100,
        ease: Power2.easeOut,
      },
      ">"
    );

    tl.to(
      ".tab__text",
      {
        y: 0,
        opacity: 1,
        stagger: {
          each: 0.1,
          from: "edges",
        },
        ease: Power2.easeOut,
      },
      "<"
    );

    // banner
    tl.to(
      ".banner",
      {
        "--overlap-height": 0,

        duration: 1.2,
        ease: Power2.easeOut,
        onComplete: () => {
          document.querySelector("header").classList.add("header--transparent");
          gsap.set("header", { clearProps: "all" });
        },
      },
      "<"
    );

    tl.fromTo(
      ".banner__background img",
      {
        scale: 1.4,
      },
      {
        "--overlap-height": 0,
        scale: 1,

        duration: 1.2,
        ease: Power2.easeOut,
      },
      "<"
    );

    tl.fromTo(
      [document.querySelectorAll(".banner .line span")],
      {
        y: "100px",
        ease: Power2.easeInOut,
        opacity: 0,
        duration: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.2,
      },
      "<"
    );

    tl.fromTo(
      ".middle-line",
      {
        opacity: 0,
        scaleX: 0,
      },
      {
        opacity: 1,
        scaleX: 1,
        delay: 0.2,
        duration: 0.6,
        ease: Sine.easeOut,
      },
      "<"
    );

    tl.to(
      ".tab-panel",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: Power2.easeOut,
      },
      "<"
    );

    tl.to(
      ".outwork",
      {
        opacity: 1,
        duration: 0.6,
        y: 0,
        ease: Power2.easeOut,
      },
      "<"
    );
  };

  useEffect(() => {
    if (!isReady) return;

    let serviceId = parseInt(query?.serviceId);
    serviceId = isNaN(serviceId) ? 0 : serviceId;
    serviceId = serviceId >= services.length || serviceId < 0 ? 0 : serviceId;

    setSelectedService(services[serviceId]);
    // codes using router.query
  }, [isReady]);

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });

    let $scrollToFooterElements = document.querySelectorAll(".js-scroll-to-footer");

    $scrollToFooterElements.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("js-close-drawer")) {
          setOpenDrawer(false);
        }
        document.querySelector("footer").scrollIntoView();
      });
    });

    prepareAnimateOnLoad();

    pageTransitionTimeline.afterEnter = () => {
      animateOnLoad();
    };
  }, []);

  const handleSwitchService = (service) => {
    setSelectedService(service);
    scrollToTopContent();
  };

  const PlanServiceTabContent = ({ ...rest }) => {
    const { Header, Information } = pageContent.PortfolioPlanningAndDesign;
    return (
      <div {...rest}>
        <h2>{Header}</h2>
        <div className="list-infomation-wrapper">
          {Information?.map(({ Title, Content }, index) => (
            <div
              className={`list-information row ${index === Information.length - 1 && "row--last"}`}
              key={Title}
            >
              <h4>{Title} </h4>
              <ul>
                {splitTextToLines(Content).map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PermitServiceTabContent = ({ ...rest }) => {
    const { Header, Information } = pageContent.PortfolioPermitting;
    return (
      <div {...rest}>
        <h2>{Header}</h2>
        <div>
          <h4> {Information?.Title} </h4>
          <ul>
            {splitTextToLines(Information?.Content).map((e, i) => (
              <li className="row" key={i}>
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const ProjectServiceTabContent = ({ ...rest }) => {
    const { CertificateTitle, ChartTitle, Header, CertificateImage, Information } =
      pageContent.PortfolioProjectAndConstructionManagement;
    return (
      <div {...rest}>
        <div className="project-wrapper">
          <h2>{Header}</h2>
          <h4 className="certificate-header">{CertificateTitle}</h4>
          <div className="certificate-img">
            <img src={CertificateImage?.url} loading="lazy" alt="Certificate" />
          </div>
          <div className="bg-top"></div>
          <div className="bg-bot"></div>
          <div className="chart-container">
            <h4> {ChartTitle}</h4>

            <img src="/assets/images/portfolio/chart.svg" loading="lazy" alt="Circle Chart" />

            <ul className="chart-hint">
              <li className="hint">
                <span className="hint__color" style={{ backgroundColor: "var(--blue)" }}></span>
                <span className="hint__text">Master’s Degree</span>
              </li>
              <li className="hint">
                <span className="hint__color" style={{ backgroundColor: "var(--orange)" }}></span>
                <span className="hint__text">Engineer’s Degree</span>
              </li>
              <li className="hint">
                <span className="hint__color" style={{ backgroundColor: "var(--gray02)" }}></span>
                <span className="hint__text">Other</span>
              </li>
            </ul>
          </div>

          <div className="list-information list-information--vertical services">
            <h4> {Information?.Title} </h4>
            <ul>
              {splitTextToLines(Information?.Content).map((e, i) => (
                <li className="row" key={i}>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const IndustrialServiceTabContent = ({ ...rest }) => {
    const { Header, AchivementInfo, Infomation } = pageContent.PortfolioIEM;
    return (
      <div {...rest}>
        <h2>{Header}</h2>
        <ul className="industrial__list-info">
          {AchivementInfo?.map(({ HighlightText, Content }) => (
            <li key={HighlightText}>
              <div className="title">{HighlightText} </div>
              <p>{Content} </p>
            </li>
          ))}
        </ul>

        <div className="bottom">
          <div className="responsibility list-information list-information--vertical">
            <h4>
              {splitTextToLines(Infomation[0]?.Title).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </h4>
            <ul className="list-style-none">
              {splitTextToLines(Infomation[0]?.Content)?.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="service-include list-information list-information--vertical">
            <h4>
              {splitTextToLines(Infomation[1]?.Title).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </h4>
            <ul>
              {splitTextToLines(Infomation[1]?.Content).map((e) => (
                <li key={e} className="row">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <Seo Seo={pageContent.Seo} />

      <div className="">
        <Header />
        <main>
          <section className="banner">
            <div className="banner__background">
              <img
                className="lazy-img"
                src={pageContent.PortfolioBanner.BackgroundImage.url}
                alt="Banner background"
              />
            </div>
            <h1>
              <div className="line">
                <span>{pageContent.PortfolioBanner.Header}</span>
              </div>
            </h1>
            <div className="middle-line"></div>
            <div className="subheader1">
              <div className="line">
                <span>{pageContent.PortfolioBanner.Subheader}</span>
              </div>
            </div>
          </section>

          <section className="general-information">
            <div className="tab-container">
              <div className="tabs-wrapper">
                <div className="tabs">
                  {services.map((service) => (
                    <div
                      className={`tab flex-tab ${
                        selectedService.key === service.key ? "active" : ""
                      }`}
                      key={service.key}
                      onClick={() => handleSwitchService(service)}
                    >
                      <span className="tab__text">{service.title}</span>
                    </div>
                  ))}
                </div>

                <div
                  className={`dropdown ${isDropdownExpand ? "expanded" : ""}`}
                  id="service-dropdown"
                >
                  <div className="dropdown__select" onClick={toggleDropdown}>
                    <span className="dropdown__selected">{selectedService.title}</span>
                    <span className="dropdown__icon">
                      <svg
                        width="18"
                        height="11"
                        viewBox="0 0 18 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1 1L9 9L17 1" stroke="#0546B4" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>

                  <ul className="dropdown__list">
                    {services.map((service) => (
                      <li
                        className={`dropdown__item ${
                          selectedService.key === service.key ? "selected" : ""
                        }`}
                        key={service.key}
                        onClick={() => {
                          handleSwitchService(service);
                          toggleDropdown();
                        }}
                      >
                        <span className="dropdown__text">{service.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="tab-panel">
                <PlanServiceTabContent
                  className={`tab-content planning ${
                    selectedService.key === "planning" ? "active" : ""
                  }`}
                  data-tab-id="0"
                />

                <PermitServiceTabContent
                  className={`tab-content permitting ${
                    selectedService.key === "permitting" ? "active" : ""
                  }`}
                  data-tab-id="1"
                />
                <ProjectServiceTabContent
                  className={`tab-content project ${
                    selectedService.key === "project" ? "active" : ""
                  }`}
                  data-tab-id="2"
                />

                <IndustrialServiceTabContent
                  className={`tab-content industrial ${
                    selectedService.key === "industrial" ? "active" : ""
                  }`}
                  data-tab-id="3"
                />
              </div>

              <section className="outwork">
                <div className="header">
                  <h2>OUR WORK </h2>
                  <h1 id="workHeader">PLANNING AND DESIGN</h1>
                </div>
                <div className="grid" id="workGrid">
                  {projects
                    ?.filter((project) => {
                      if (selectedService.key == PLANNING) {
                        return project.attributes.IsPlanningAndDesign;
                      }
                      if (selectedService.key == PERMITTING) {
                        return project.attributes.IsPermitting;
                      }
                      if (selectedService.key == INDUSTRIAL) {
                        return project.attributes.IsIndustrialEstateManagement;
                      }
                      if (selectedService.key == PROJECT) {
                        return project.attributes.IsProjectAndConstructionManagement;
                      }
                    })
                    .map((project) => (
                      <div className="grid-item" key={project.id}>
                        <div className="grid-item__bg">
                          {project.attributes.Image?.data && (
                            <img
                              src={getMediaURL(project.attributes.Image?.data?.attributes.url)}
                              loading="lazy"
                              alt=""
                            />
                          )}
                        </div>
                        <div className="grid-item__content">
                          <div className="summary">{project.attributes.Name}</div>
                          <ul className="details">
                            {project.attributes.Investor && (
                              <li>{`The Investor: ${project.attributes.Investor}`}</li>
                            )}
                            {project.attributes.Function && selectedService.key == PLANNING && (
                              <li>{`Functions: ${project.attributes.Function}`}</li>
                            )}
                            {project.attributes.LandArea && selectedService.key !== PLANNING && (
                              <li>{`Land Area(sqm): ${Number(
                                project.attributes.LandArea
                              ).toLocaleString()}`}</li>
                            )}
                            {project.attributes.GFA &&
                              (selectedService.key === PROJECT ||
                                selectedService.key === INDUSTRIAL) && (
                                <li>{`GFA(m2): ${Number(
                                  project.attributes.GFA
                                ).toLocaleString()}`}</li>
                              )}
                            {project.attributes.InvesmentCapital &&
                              selectedService.key === PERMITTING && (
                                <li>{`Invesment Capital: ${project.attributes.InvesmentCapital}`}</li>
                              )}
                          </ul>
                        </div>
                      </div>
                    ))}

                  {/* <div className="grid-item">
                    <div className="grid-item__bg">
                      <img
                        src="/assets/images/portfolio/toancau-warehouse.png"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">Toan Cau Warehouse</div>
                      <ul className="details">
                        <li>The Investor: GLOBAL LOGISTICS SERVICE & INVESTMENTS JSC</li>
                        <li> Functions: Ready Built Warehouse</li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </section>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export const getStaticProps = async ({ locale }) => {
  const pageContent = await fetchPortfoliPage(locale);

  const projects = await fetchProjects();

  return {
    props: {
      pageContent: pageContent,
      projects: projects,
    },
    revalidate: 60,
  };
};
