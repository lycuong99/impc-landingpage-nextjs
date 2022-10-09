import cmsAPI, { getMediaURL } from "../lib/api";

const DEFAULT_FOOTER_DATA = {
  CompanyName: "IMP DESIGN AND TECHNCIAL\nMANAGEMENT CORPORATION",
  ContactTitle: "Contact",
  Email: "contact@impc.vn",
  Phone: "+84 28 77703399",
  Navigation: {
    id: 3,
    HomepageTitle: "Home",
    HomepageURL: "/",
    ServiceTitle: "What we do",
    ServiceURL: "/services",
    PortfolioTitle: "Portfolio",
    PortfolioURL: "/portfolio",
  },
  CompanyLocations: [
    {
      id: 1,
      LocationURL:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1958.7590491075152!2d106.71690150058227!3d10.924181399312445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d762036ffedd%3A0x3771a8ff3909ee89!2sParkview%20Office%20Building!5e0!3m2!1sen!2s!4v1572244221288!5m2!1sen!2s",
      OfficeName: "Binh Duong Office",
      Address:
        "F6, Partview Tower, No. 5A Huu Nghi Boulevard, Vsip II, Binh Hoa W., Thuan An Town, Binh Duong",
    },
    {
      id: 2,
      locationURL:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d244.95445589293462!2d106.7183955!3d10.7905215!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a9d54b99bb%3A0xd10e519488eed2cf!2sAVIVA%20SAIGON%20PEARL!5e0!3m2!1sen!2s!4v1630056414578!5m2!1sen!2s",
      OfficeName: "Headquarters - Ho Chi Minh City",
      Address:
        "No.15, D2 Street, Saigon Pearl Complex,Ward 22, Binh Thanh District, Ho Chi Minh City",
    },
    {
      id: 3,
      locationURL:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7445.335295959954!2d105.96474100000002!3d21.083279999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a806ad0bad3d%3A0x7edf83bb25d6aebb!2zMSDEkMaw4budbmcgSOG7r3UgTmdo4buLLCBQaMO5IENo4bqpbiwgVOG7qyBTxqFuLCBC4bqvYyBOaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2sus!4v1564376314103!5m2!1sen!2sus",
      OfficeName: "Bac Ninh Office",
      Address: "SH03 Catalyst, No. 1, Huu Nghi road, VSIP Bac Ninh, Phu Chan , Tu Son, Bac Ninh",
    },
  ],
};
const DEFAULT_HEADER_DATA = {
  CompanyName: "IMP DESIGN AND TECHNCIAL\nMANAGEMENT CORPORATION",
  ContactTitle: "Contact",
  Navigation: {
    HomepageTitle: "About us",
    HomepageURL: "/",
    ServiceTitle: "What we do",
    ServiceURL: "/services",
    PortfolioTitle: "Portfolio",
    PortfolioURL: "/portfolio",
  },
};

const DEFAULT_HOMEPAGE_DATA = {
  locale: "en",
  Seo: {
    PageTitle: "IMPC - Homepage",
    MetaTitle: "IMP Design and Technical Management Corporation",
    MetaKeyWords:
      "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
    MetaDescription:
      "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
    MetaImage: {
      url: "/og-img.png",
    },
  },
  HomeBanner: {
    id: 1,
    Subheader: "YOUR EXPERT",
    ServiceLinkTitle: "Discover more",
    ContactButton: "CONTACT US",
    Header1: "In the field of \nindustrial development\nand management",
    Header2: "We Provide\nSolutions\nAnd Services\nIn This Area",
    BackgroundImage: {
      url: "/assets/images/banner-bg.webp",
    },
    HomeBannerServiceSliders: [
      {
        id: 14,
        Title: "Planning \nAnd Desgin",
        name: "Planning And Desgin",
        ImageURL: {
          url: "/assets/images/banner/planning-and-desgin.webp",
        },
      },
      {
        id: 15,
        Title: "PERMITTING",
        name: "Permitting",
        ImageURL: {
          url: "/assets/images/banner/permitting.webp",
        },
      },
      {
        id: 16,
        Title: "PROJECT AND \nCONSTRUCTION MANAGEMENT",
        name: "Project and construction management",
        ImageURL: {
          url: "/assets/images/banner/project.webp",
        },
      },
      {
        id: 17,
        Title: "INDUSTRIAL ESTATE\nMANAGEMENT",
        name: "Industrial Estate Management",
        ImageURL: {
          url: "/assets/images/banner/industrial.webp",
        },
      },
    ],
    DefaultSlideImage: {
      url: "/assets/images/banner.webp",
    },
  },
  HomeAchivement: {
    id: 1,
    Quote: "Quality projects \nThat \nCreate long term \nGrowth",
    TotalProjectTitle: "TOTAL PROJECT",
    TotalProjectValue: "75",
    TotalProjectUnit: "projects",
    TotalPartnerAndCustomerTitle: "PARTNERS & CUSTOMERS",
    TotalPartnerAndCustomerValue: "20",
    TotalPartnerAndCustomerUnit: "companies",
    TotalEmployeeTitle: "TOTAL EMPLOYEES",
    TotalEmployeeValue: "282",
    TotalEmployeeUnit: "employees",
    PortfolioBtn: "PORTFOLIO",
    Description:
      "Together with our Business Partners and Customers, we deliver quality projects that create long-term growth and higher value creation across the country",
  },
  HomeCulture: {
    id: 1,
    Header: "Our Culture",
    Description:
      "The fundamental development of IMP Design and Technical Management Corporation is always rooted in smart investment, sustainable development, learning, and creating for the benefit of the community, customers, partners, and company.",
    CultureSlider: [
      {
        id: 1,
        Title: "MISSION",
        Statement:
          "A leading company in Vietnam, we reach out to the region in the planning and management of the industrial real estate.",
      },
      {
        id: 2,
        Title: "VISION",
        Statement: "A dependable partner for Industrial Investment and Development Investors.",
      },
      {
        id: 3,
        Title: "CORE VALUED",
        Statement: "Loyal\nHonesty\nDevotion\nDecency",
      },
    ],
  },
  CompanyOverview: {
    id: 1,
    Header: "Company\nOverview",
    HighlightText: "Established in 2016,",
    FirstDescription:
      "IMP Design and Technical Management \nCorporation (IMPC) were established in 2016",
    SecondDescription:
      "We deliver professional services provision systems and accompanying enterprises in order to answer inquiries in a timely manner during consulting and operating works.",
    Image: { url: "/assets/images/overview.webp" },
  },
  HomeOurTeam: {
    id: 1,
    Header: "Our Team",
    HighlightText:
      "IMPC is not only focusing on developing and providing services to our customers.",
    Description:
      "Our Company also heading to enhance the teams and people, non-stop in the development of skills, abilities, and ethics to enhance our team",
    Image: {
      url: "/assets/images/out-team.webp",
    },
  },
  HomePartnerCustomer: {
    id: 2,
    Header: "Trusted by customers, partners and the industry",
    CustomersPartnersList: [
      {
        imageUrl: "/assets/images/partners-and-customers/partner-01.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-02.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-03.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-04.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-05.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-06.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-07.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-08.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-09.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-10.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-11.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-12.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-13.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-14.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-15.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-16.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-17.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-18.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-19.webp",
      },
      {
        imageUrl: "/assets/images/partners-and-customers/partner-20.webp",
      },
    ],
  },
};

const DEFAUL_SERVICEPAGE_DATA = {
  createdAt: "2022-10-05T10:08:34.892Z",
  updatedAt: "2022-10-07T15:52:28.291Z",
  publishedAt: "2022-10-05T10:08:55.373Z",
  locale: "en",
  Seo: {
    PageTitle: "IMPC - Service page",
    MetaTitle: "IMP Design and Technical Management Corporation",
    MetaKeyWords:
      "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
    MetaDescription:
      "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
    MetaImage: {
      url: "/og-img.png",
    },
  },
  ServiceBanner: {
    id: 1,
    Description:
      "Given the dramatic increase in Industrial Development Investors, we understand the opportunities, as well as the great demand and concerns of these potential clients in consulting and providing services during the planning and development phase of their projects.",
    Header: "OUR **SERVICES** \n**SOLUTION** FOR\nYOUR BUSINESS",
    BackgroundImage: {
      url: "/assets/images/services/service-banner.webp",
    },
  },
  PlanningAndDesign: {
    id: 1,
    Header: "PLANNING AND DESIGN",
    PortfolioLinkButton: "PORTFOLIO",
    SliderItems: [
      {
        id: 1,
        Subheader: "PLANNING",
        Header:
          "A team of elite planners, architects, economists, and former policymakers provides our top-notch planning service.",
        Description:
          "A team of architects and engineers with extensive experience in architecture,\ninfrastructure, structures, M&E, and fire protection. Deep experience in the legal\naspects of industrial construction projects, and always up to date on national laws\nand local regulations.",
        Image: {
          url: "/assets/images/services/plan.webp",
        },
      },
      {
        id: 2,
        Subheader: "DESIGN",
        Header:
          "Extensive and detailed experience as an operator who understands the needs of the end-user for each specific industrial project.",
        Description:
          "A team of architects and engineers with extensive experience in architecture, infrastructure, structures, M&E, and fire protection. Deep experience in the legal aspects of industrial construction projects, and always up to date on national laws and local regulations.",
        Image: {
          url: "/assets/images/services/design.webp",
        },
      },
    ],
  },
  Permitting: {
    id: 1,
    Header: "PERMITTING",
    PortfolioLinkButton: "PORTFOLIO",
    Content: {
      id: 1,
      Subheader: "PERMITTING",
      Header:
        "Construction-related permitting services are initiated at an early stage of the project.",
      Description:
        "IMPC permitting services will provide investors with a big picture of all related works and effects to their projects, allowing them to recognize and plan a good arrangement for their projects.",
      Image: {
        url: "/assets/images/services/permitting.webp",
      },
    },
  },
  ProjectAndConstructionManagement: {
    id: 5,
    Header: "PROJECT AND CONSTRUCTION MANAGEMENT",
    PortfolioLinkButton: "PORTFOLIO",
    SliderItems: [
      {
        id: 9,
        Subheader: "PROJECT MANAGEMENT",
        Header: "IMPC work closely with our customers.",
        Description:
          "Throughout the project planning and development phase, we work closely with our\n              customers to deliver projects of cost and quality efficiency.",
        Image: {
          url: "/assets/images/services/project.webp",
        },
      },
      {
        id: 10,
        Subheader: "CONSTRUCTION MANAGEMENT",
        Header: "Construction quality control and supervision.",
        Description:
          "IMPC provides hands-on construction project management services to our customers\n              by deploying quality resources to meet the demands of each customer to deliver\n              quality buildings and properties. We focus on controlling the project’s time,\n              cost, and quality.",
        Image: {
          url: "/assets/images/services/construction.webp",
        },
      },
    ],
  },
  IndustrialEstateManagement: {
    id: 2,
    Header: "INDUSTRIAL ESTATE MANAGEMENT",
    PortfolioLinkButton: "PORTFOLIO",
    Content: {
      id: 2,
      Subheader: "INDUSTRIAL ESTATE MANAGEMENT",
      Header: "Experience in\nmanaging facility services",
      Description:
        "IMPC is an Industrial Estate Management service provider with experience in managing facility services that can drive and demonstrate a significant reduction in the cost of  the facility while maintaining or improving the quality and level of Investor service.",
      Image: {
        url: "/assets/images/services/industrial.webp",
      },
    },
  },
  localizations: {
    data: [
      {
        id: 2,
        attributes: {
          createdAt: "2022-10-06T05:18:31.653Z",
          updatedAt: "2022-10-07T02:43:30.411Z",
          publishedAt: "2022-10-06T13:51:57.229Z",
          locale: "vi",
          ServiceBanner: {
            id: 2,
            Description:
              "Với sự gia tăng mạnh mẽ của các Nhà đầu tư Phát triển Công nghiệp, chúng tôi hiểu cơ hội cũng như nhu cầu và mối quan tâm lớn của những khách hàng tiềm năng này trong việc tư vấn và cung cấp dịch vụ trong giai đoạn lập kế hoạch và phát triển các dự án của họ.",
            Header: "DỊCH VỤ CỦA CHÚNG TÔI\nGIẢI PHÁP CHO DOANH NGHIỆP \nCỦA BẠN",
            BackgroundImage: {
              data: {
                id: 33,
                attributes: {
                  name: "service-banner.webp",
                  alternativeText: "service-banner.webp",
                  caption: "service-banner.webp",
                  width: 1440,
                  height: 761,
                  formats: {
                    thumbnail: {
                      name: "thumbnail_service-banner.webp",
                      hash: "thumbnail_service_banner_d06db9704f",
                      ext: ".webp",
                      mime: "image/webp",
                      path: null,
                      width: 245,
                      height: 129,
                      size: 1.25,
                      url: "/uploads/thumbnail_service_banner_d06db9704f.webp",
                    },
                    large: {
                      name: "large_service-banner.webp",
                      hash: "large_service_banner_d06db9704f",
                      ext: ".webp",
                      mime: "image/webp",
                      path: null,
                      width: 1000,
                      height: 528,
                      size: 6.68,
                      url: "/uploads/large_service_banner_d06db9704f.webp",
                    },
                    medium: {
                      name: "medium_service-banner.webp",
                      hash: "medium_service_banner_d06db9704f",
                      ext: ".webp",
                      mime: "image/webp",
                      path: null,
                      width: 750,
                      height: 396,
                      size: 4.55,
                      url: "/uploads/medium_service_banner_d06db9704f.webp",
                    },
                    small: {
                      name: "small_service-banner.webp",
                      hash: "small_service_banner_d06db9704f",
                      ext: ".webp",
                      mime: "image/webp",
                      path: null,
                      width: 500,
                      height: 264,
                      size: 2.82,
                      url: "/uploads/small_service_banner_d06db9704f.webp",
                    },
                  },
                  hash: "service_banner_d06db9704f",
                  ext: ".webp",
                  mime: "image/webp",
                  size: 11.4,
                  url: "/uploads/service_banner_d06db9704f.webp",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2022-10-06T04:11:56.857Z",
                  updatedAt: "2022-10-06T04:11:56.857Z",
                  placeholder:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAl0lEQVQImWMQExORl5X2cHbavX+fmJjIi9evj148raWloaQsr66uyqCurpqVnHBo24bXLx57erg1tTWVVpYqKctDpeXkZbYtn/3/z9dHV060tDTKycuIiYkoKcvLyctoaWkw8PFxGenrtJfn9tYXKSvK8/HxCQnxy8nLyMnLgHQLCfGzsrKKCPBLS0kwMDAoK0hDpCHmAwBI9CjbZvW+FgAAAABJRU5ErkJggg==",
                },
              },
            },
          },
          PlanningAndDesign: {
            id: 3,
            Header: "QUY HOẠCH VÀ THIẾT KẾ",
            PortfolioLinkButton: "PORTFOLIO",
            SliderItems: [
              {
                id: 5,
                Subheader: "QUY HOẠCH",
                Header:
                  "Một nhóm các nhà lập kế hoạch ưu tú, kiến trúc sư, nhà kinh tế và nhà hoạch định chính sách cũ cung cấp dịch vụ lập kế hoạch hàng đầu của chúng tôi.",
                Description:
                  "IMPC cung cấp cách tiếp cận tổng thể và tích hợp để tăng trưởng kinh tế, thích ứng với khí hậu, đầu tư cơ sở hạ tầng và quản lý sử dụng đất với tư cách là một cơ quan lập kế hoạch chuyên biệt và sáng tạo.",
                Image: {
                  data: {
                    id: 34,
                    attributes: {
                      name: "plan.webp",
                      alternativeText: "plan.webp",
                      caption: "plan.webp",
                      width: 833,
                      height: 548,
                      formats: {
                        thumbnail: {
                          name: "thumbnail_plan.webp",
                          hash: "thumbnail_plan_2d55b51800",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 237,
                          height: 156,
                          size: 7.71,
                          url: "/uploads/thumbnail_plan_2d55b51800.webp",
                        },
                        small: {
                          name: "small_plan.webp",
                          hash: "small_plan_2d55b51800",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 500,
                          height: 329,
                          size: 19.48,
                          url: "/uploads/small_plan_2d55b51800.webp",
                        },
                        medium: {
                          name: "medium_plan.webp",
                          hash: "medium_plan_2d55b51800",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 750,
                          height: 493,
                          size: 30.16,
                          url: "/uploads/medium_plan_2d55b51800.webp",
                        },
                      },
                      hash: "plan_2d55b51800",
                      ext: ".webp",
                      mime: "image/webp",
                      size: 34.01,
                      url: "/uploads/plan_2d55b51800.webp",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: "2022-10-06T04:12:53.458Z",
                      updatedAt: "2022-10-06T04:12:53.458Z",
                      placeholder:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA5ElEQVQImQHZACb/AIKTqYSXrnKEmjM6KiUyEBceADMvFiAnCxYaAAAEAABDSiFHTjYzOiC4gQNNQQAGEAAyLx0hJw8ABAAUGQAAd2tZs6yQfGtpa2VEW14xWWYxZltPbmlVDBUACBgAAIx9eY2eQbjTOvv/aaGtVktRGEY0IL3EWsTRYzNKDwB1amhyY2ZxiBvB2jzJz35iWE1bWDjk54Wvu1bk5JIAcmNqcmJteIc8tMNdp71EemxreHtOsbliepkE/P9gAGhYYWtcZoqlKd/2O4ylFYF3aFZaOFpUWGNyK4ybQzffUBvTK8vRAAAAAElFTkSuQmCC",
                    },
                  },
                },
              },
              {
                id: 6,
                Subheader: "THIẾT KẾ",
                Header:
                  "Kinh nghiệm sâu rộng và chi tiết với tư cách là nhà điều hành hiểu nhu cầu của người dùng cuối đối với từng dự án công nghiệp cụ thể.",
                Description:
                  "Đội ngũ kiến trúc sư và kỹ sư có nhiều kinh nghiệm trong lĩnh vực kiến trúc, hạ tầng, kết cấu, cơ điện, phòng cháy chữa cháy. Có kinh nghiệm sâu sắc trong các khía cạnh pháp lý của các dự án xây dựng công nghiệp, và luôn cập nhật luật pháp quốc gia và các quy định của địa phương.",
                Image: {
                  data: {
                    id: 35,
                    attributes: {
                      name: "design.webp",
                      alternativeText: "design.webp",
                      caption: "design.webp",
                      width: 833,
                      height: 548,
                      formats: {
                        thumbnail: {
                          name: "thumbnail_design.webp",
                          hash: "thumbnail_design_e6bd09a7b2",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 237,
                          height: 156,
                          size: 6.86,
                          url: "/uploads/thumbnail_design_e6bd09a7b2.webp",
                        },
                        small: {
                          name: "small_design.webp",
                          hash: "small_design_e6bd09a7b2",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 500,
                          height: 329,
                          size: 19.55,
                          url: "/uploads/small_design_e6bd09a7b2.webp",
                        },
                        medium: {
                          name: "medium_design.webp",
                          hash: "medium_design_e6bd09a7b2",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 750,
                          height: 493,
                          size: 29.76,
                          url: "/uploads/medium_design_e6bd09a7b2.webp",
                        },
                      },
                      hash: "design_e6bd09a7b2",
                      ext: ".webp",
                      mime: "image/webp",
                      size: 34.21,
                      url: "/uploads/design_e6bd09a7b2.webp",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: "2022-10-06T04:52:16.180Z",
                      updatedAt: "2022-10-06T04:52:16.180Z",
                      placeholder:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA5ElEQVQImQHZACb/AGxPPHNVOUM9Ky0YABwAAEkjFBYAAIh8Z6m2yImcsgCCWDKdbk+Vc0pJIgBZLwk7GAA0LxyqtsB3goyAjpoAQiUAcUEua1A94dXItaujf1tLsZh1pJmSgHRldHZ2AF9bVjcmIIyIgd3b1tjU0I1tV7SAW6lzS56Ba6u5wgDX19Wqqqno5uT9+/nKu7JLLyCpkIO7qp+fprGNl6EA+fv38/Px9vbzu7m04dzWzcC92NTO5+Xj5OTm2NjYAPzUl/728P/+/+Xg3/fx8fDs6vbv7ujj4vTw8PTw8EUdfEsDZX+jAAAAAElFTkSuQmCC",
                    },
                  },
                },
              },
            ],
          },
          Permitting: {
            id: 3,
            Header: "GIẤY PHÉP",
            PortfolioLinkButton: "PORTFOLIO",
            Content: {
              id: 3,
              Subheader: "GIẤY PHÉP",
              Header:
                "Các dịch vụ xin phép liên quan đến xây dựng được thực hiện ở giai đoạn đầu của dự án.",
              Description:
                "Dịch vụ cấp phép của IMPC sẽ cung cấp cho các nhà đầu tư một bức tranh toàn cảnh về tất cả các công việc liên quan và ảnh hưởng đến dự án của họ, cho phép họ nhận ra và lên kế hoạch sắp xếp tốt cho các dự án của mình.",
              Image: {
                data: {
                  id: 36,
                  attributes: {
                    name: "permitting.jpg",
                    alternativeText: "permitting.jpg",
                    caption: "permitting.jpg",
                    width: 756,
                    height: 580,
                    formats: {
                      thumbnail: {
                        name: "thumbnail_permitting.jpg",
                        hash: "thumbnail_permitting_172db6b11e",
                        ext: ".jpg",
                        mime: "image/jpeg",
                        path: null,
                        width: 203,
                        height: 156,
                        size: 8.02,
                        url: "/uploads/thumbnail_permitting_172db6b11e.jpg",
                      },
                      small: {
                        name: "small_permitting.jpg",
                        hash: "small_permitting_172db6b11e",
                        ext: ".jpg",
                        mime: "image/jpeg",
                        path: null,
                        width: 500,
                        height: 384,
                        size: 29.25,
                        url: "/uploads/small_permitting_172db6b11e.jpg",
                      },
                      medium: {
                        name: "medium_permitting.jpg",
                        hash: "medium_permitting_172db6b11e",
                        ext: ".jpg",
                        mime: "image/jpeg",
                        path: null,
                        width: 750,
                        height: 575,
                        size: 50.17,
                        url: "/uploads/medium_permitting_172db6b11e.jpg",
                      },
                    },
                    hash: "permitting_172db6b11e",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 47.5,
                    url: "/uploads/permitting_172db6b11e.jpg",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    createdAt: "2022-10-06T04:53:31.904Z",
                    updatedAt: "2022-10-06T04:53:31.904Z",
                    placeholder:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVQImQH4AAf/AENKVkhvSHi+Koe0TUdHUZ2twXAsKb09EaVHEGlUWQA8KiJFTVV2dVaCeFyDen/AqKDUwbzEk4h6UVVsTEwASjQlVz8Qaj0l6LlBwa+NvqOj+Onm28W5qHZuRioqAFI/MWJSP5JlFP/bOpp0S7GGgfLz/+DU3qp5ck9AQABkUkiIh4q5rpy+rpOpiH3jy87s7//c1OWljYxPTFEATEUskpGMtrbRY11mlI2U/P7/3d/y3trseHF0AAABAFRKOpaZn5iWpRcVHExNX9zc8sXF2a2jr4FvazwqKABJPT1+Y10yKTAHBg6bmqvb2++8ucuQgYhpXFhiRkJ8bng1+kyF8QAAAABJRU5ErkJggg==",
                  },
                },
              },
            },
          },
          ProjectAndConstructionManagement: {
            id: 6,
            Header: "PROJECT AND CONSTRUCTION MANAGEMENT",
            PortfolioLinkButton: "PORTFOLIO",
            SliderItems: [
              {
                id: 11,
                Subheader: "PROJECT MANAGEMENT",
                Header: "IMPC work closely with our customers.",
                Description:
                  "Throughout the project planning and development phase, we work closely with our\n              customers to deliver projects of cost and quality efficiency.",
                Image: {
                  data: {
                    id: 37,
                    attributes: {
                      name: "project.webp",
                      alternativeText: "project.webp",
                      caption: "project.webp",
                      width: 741,
                      height: 548,
                      formats: {
                        thumbnail: {
                          name: "thumbnail_project.webp",
                          hash: "thumbnail_project_a8426417a5",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 211,
                          height: 156,
                          size: 7.88,
                          url: "/uploads/thumbnail_project_a8426417a5.webp",
                        },
                        small: {
                          name: "small_project.webp",
                          hash: "small_project_a8426417a5",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 500,
                          height: 370,
                          size: 27.93,
                          url: "/uploads/small_project_a8426417a5.webp",
                        },
                      },
                      hash: "project_a8426417a5",
                      ext: ".webp",
                      mime: "image/webp",
                      size: 43.59,
                      url: "/uploads/project_a8426417a5.webp",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: "2022-10-06T04:55:08.857Z",
                      updatedAt: "2022-10-06T04:55:08.857Z",
                      placeholder:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA5ElEQVQImQHZACb/AOClZ/a6f//ChPvBe+6sZuG3hr6miGGn2Fx3l4B9ggDZo2nprGrys2v2xZX648j56NC5u7s5iMo9PUJLSlIA0J9t36py9M+S/+Zl/+ei+vr88/Pz297eVUpBGhgWAMGZavTtrfvmgvjEHfvkufDq6e7v9PD294uHggABAADGtHj9/7L3/5rj3pn19Pfn0Mbf2tWbcGWsWU1fQjoA3Oun9v+r9P+bxtup6uXh3ber0YZ+tFpSoU1IaEI7AM/rnsXliKa+OIKLepuIfJyTg2lNPqdVUJNKQ3I2LvmliH9c8j01AAAAAElFTkSuQmCC",
                    },
                  },
                },
              },
              {
                id: 12,
                Subheader: "CONSTRUCTION MANAGEMENT",
                Header: "Construction quality control and supervision.",
                Description:
                  "IMPC provides hands-on construction project management services to our customers\n              by deploying quality resources to meet the demands of each customer to deliver\n              quality buildings and properties. We focus on controlling the project’s time,\n              cost, and quality.",
                Image: {
                  data: {
                    id: 38,
                    attributes: {
                      name: "construction.webp",
                      alternativeText: "construction.webp",
                      caption: "construction.webp",
                      width: 833,
                      height: 548,
                      formats: {
                        thumbnail: {
                          name: "thumbnail_construction.webp",
                          hash: "thumbnail_construction_e0edab69c6",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 237,
                          height: 156,
                          size: 9.79,
                          url: "/uploads/thumbnail_construction_e0edab69c6.webp",
                        },
                        medium: {
                          name: "medium_construction.webp",
                          hash: "medium_construction_e0edab69c6",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 750,
                          height: 493,
                          size: 38.13,
                          url: "/uploads/medium_construction_e0edab69c6.webp",
                        },
                        small: {
                          name: "small_construction.webp",
                          hash: "small_construction_e0edab69c6",
                          ext: ".webp",
                          mime: "image/webp",
                          path: null,
                          width: 500,
                          height: 329,
                          size: 25.91,
                          url: "/uploads/small_construction_e0edab69c6.webp",
                        },
                      },
                      hash: "construction_e0edab69c6",
                      ext: ".webp",
                      mime: "image/webp",
                      size: 42.05,
                      url: "/uploads/construction_e0edab69c6.webp",
                      previewUrl: null,
                      provider: "local",
                      provider_metadata: null,
                      createdAt: "2022-10-06T04:56:34.910Z",
                      updatedAt: "2022-10-06T04:56:34.910Z",
                      placeholder:
                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAA5ElEQVQImQHZACb/AN3d393b2+Hh5PTz9/Lx9v3////4+N/Hxd/T0pOCgACjo6bXzcnXzcnb0cvQw7zNxcKqjoeZc2CEWwBHNR4A0s7Q5eLi6t/V/+3HxsjJUE1QckVBj29mNyklCQAAANLIx7Sjm6ajom9SP319fTo8QY2AdXtfVKmkSmxtMADSxL3Tw7Dc2YvHv2qAkJKEkJAGKRyVfGDE1FV3kwAAxLKqt71/z9iRn6iKgnmBjZBoo7pHuc1OdpEAMEkJAKOUjqileKm1ZXeET2JsdWV4cDtFOJKfTEtqAEhqAOXxeXNJwfTlAAAAAElFTkSuQmCC",
                    },
                  },
                },
              },
            ],
          },
          IndustrialEstateManagement: {
            id: 4,
            Header: "QUẢN LÝ BẤT ĐỘNG SẢN CÔNG NGHIỆP",
            PortfolioLinkButton: "PORTFOLIO",
            Content: {
              id: 4,
              Subheader: "QUẢN LÝ BẤT ĐỘNG SẢN CÔNG NGHIỆP",
              Header: "Kinh nghiệm trong\nquản lý các dịch vụ cơ sở hạ tầng",
              Description:
                "IMPC là nhà cung cấp dịch vụ Quản lý Bất động sản Công nghiệp có kinh nghiệm quản lý các dịch vụ cơ sở vật chất có thể thúc đẩy và chứng minh việc giảm đáng kể chi phí vận hành cơ sở vật chất trong khi duy trì hoặc nâng cao chất lượng và mức độ dịch vụ của Chủ đầu tư.",
              Image: {
                data: {
                  id: 39,
                  attributes: {
                    name: "industrial.webp",
                    alternativeText: "industrial.webp",
                    caption: "industrial.webp",
                    width: 1650,
                    height: 1274,
                    formats: {
                      thumbnail: {
                        name: "thumbnail_industrial.webp",
                        hash: "thumbnail_industrial_f9c73b7330",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 202,
                        height: 156,
                        size: 4.52,
                        url: "/uploads/thumbnail_industrial_f9c73b7330.webp",
                      },
                      small: {
                        name: "small_industrial.webp",
                        hash: "small_industrial_f9c73b7330",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 500,
                        height: 386,
                        size: 14.17,
                        url: "/uploads/small_industrial_f9c73b7330.webp",
                      },
                      large: {
                        name: "large_industrial.webp",
                        hash: "large_industrial_f9c73b7330",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 1000,
                        height: 772,
                        size: 31.3,
                        url: "/uploads/large_industrial_f9c73b7330.webp",
                      },
                      medium: {
                        name: "medium_industrial.webp",
                        hash: "medium_industrial_f9c73b7330",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 750,
                        height: 579,
                        size: 22.4,
                        url: "/uploads/medium_industrial_f9c73b7330.webp",
                      },
                    },
                    hash: "industrial_f9c73b7330",
                    ext: ".webp",
                    mime: "image/webp",
                    size: 52.93,
                    url: "/uploads/industrial_f9c73b7330.webp",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    createdAt: "2022-10-06T05:00:52.661Z",
                    updatedAt: "2022-10-06T05:00:52.661Z",
                    placeholder:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAACXBIWXMAAAPoAAAD6AG1e1JrAAABA0lEQVQImQH4AAf/ALe8sLy+sru7sLm4r769r769r769ssC+tMLAtcLAtQDExLXIxbrLx7vIxbbOzLzOzLzNyrvRy73Szr/SzsEAKTw5pqiX0cy30866086639vD6OPO8OvU+PLS///yABQvLjpHQWlqX6+ijszHsNzex9XRub20faycJeLr1gDa2cjF1G9LbBNudGDFuKTV0bnOw622sZ05VTa5u5oA6ubWtMhAAA8AJjw9397DYHFU5N/FtLajABIYwtZ3AOvp1LzQS1t9JS1FRe/vzq28g/bzz77HpQBHLKrCaQD09tvC202mwUMxSUbU4ZjN3JTl6rGhsJ0ARiiZvT1Sa5ryGQahGwAAAABJRU5ErkJggg==",
                  },
                },
              },
            },
          },
          Seo: {
            id: 6,
            PageTitle: "IMPC - Homepage",
            MetaTitle: "IMP Design and Technical Management Corporation",
            MetaKeyWords:
              "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
            MetaDescription:
              "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
            MetaImage: {
              data: null,
            },
          },
          localizations: {
            data: [
              {
                id: 1,
                attributes: {
                  createdAt: "2022-10-05T10:08:34.892Z",
                  updatedAt: "2022-10-07T15:52:28.291Z",
                  publishedAt: "2022-10-05T10:08:55.373Z",
                  locale: "en",
                  ServiceBanner: {
                    id: 1,
                    Description:
                      "Given the dramatic increase in Industrial Development Investors, we understand the opportunities, as well as the great demand and concerns of these potential clients in consulting and providing services during the planning and development phase of their projects.",
                    Header: "OUR **SERVICES** \n**SOLUTION** FOR\nYOUR BUSINESS",
                    BackgroundImage: {
                      data: {
                        id: 33,
                        attributes: {
                          name: "service-banner.webp",
                          alternativeText: "service-banner.webp",
                          caption: "service-banner.webp",
                          width: 1440,
                          height: 761,
                          formats: {
                            thumbnail: {
                              name: "thumbnail_service-banner.webp",
                              hash: "thumbnail_service_banner_d06db9704f",
                              ext: ".webp",
                              mime: "image/webp",
                              path: null,
                              width: 245,
                              height: 129,
                              size: 1.25,
                              url: "/uploads/thumbnail_service_banner_d06db9704f.webp",
                            },
                            large: {
                              name: "large_service-banner.webp",
                              hash: "large_service_banner_d06db9704f",
                              ext: ".webp",
                              mime: "image/webp",
                              path: null,
                              width: 1000,
                              height: 528,
                              size: 6.68,
                              url: "/uploads/large_service_banner_d06db9704f.webp",
                            },
                            medium: {
                              name: "medium_service-banner.webp",
                              hash: "medium_service_banner_d06db9704f",
                              ext: ".webp",
                              mime: "image/webp",
                              path: null,
                              width: 750,
                              height: 396,
                              size: 4.55,
                              url: "/uploads/medium_service_banner_d06db9704f.webp",
                            },
                            small: {
                              name: "small_service-banner.webp",
                              hash: "small_service_banner_d06db9704f",
                              ext: ".webp",
                              mime: "image/webp",
                              path: null,
                              width: 500,
                              height: 264,
                              size: 2.82,
                              url: "/uploads/small_service_banner_d06db9704f.webp",
                            },
                          },
                          hash: "service_banner_d06db9704f",
                          ext: ".webp",
                          mime: "image/webp",
                          size: 11.4,
                          url: "/uploads/service_banner_d06db9704f.webp",
                          previewUrl: null,
                          provider: "local",
                          provider_metadata: null,
                          createdAt: "2022-10-06T04:11:56.857Z",
                          updatedAt: "2022-10-06T04:11:56.857Z",
                          placeholder:
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAl0lEQVQImWMQExORl5X2cHbavX+fmJjIi9evj148raWloaQsr66uyqCurpqVnHBo24bXLx57erg1tTWVVpYqKctDpeXkZbYtn/3/z9dHV060tDTKycuIiYkoKcvLyctoaWkw8PFxGenrtJfn9tYXKSvK8/HxCQnxy8nLyMnLgHQLCfGzsrKKCPBLS0kwMDAoK0hDpCHmAwBI9CjbZvW+FgAAAABJRU5ErkJggg==",
                        },
                      },
                    },
                  },
                  PlanningAndDesign: {
                    id: 1,
                    Header: "PLANNING AND DESIGN",
                    PortfolioLinkButton: "PORTFOLIO",
                    SliderItems: [
                      {
                        id: 1,
                        Subheader: "PLANNING",
                        Header:
                          "A team of elite planners, architects, economists, and former policymakers provides our top-notch planning service.",
                        Description:
                          "A team of architects and engineers with extensive experience in architecture,\ninfrastructure, structures, M&E, and fire protection. Deep experience in the legal\naspects of industrial construction projects, and always up to date on national laws\nand local regulations.",
                      },
                      {
                        id: 2,
                        Subheader: "DESIGN",
                        Header:
                          "Extensive and detailed experience as an operator who understands the needs of the end-user for each specific industrial project.",
                        Description:
                          "A team of architects and engineers with extensive experience in architecture, infrastructure, structures, M&E, and fire protection. Deep experience in the legal aspects of industrial construction projects, and always up to date on national laws and local regulations.",
                      },
                    ],
                  },
                  Permitting: {
                    id: 1,
                    Header: "PERMITTING",
                    PortfolioLinkButton: "PORTFOLIO",
                    Content: {
                      id: 1,
                      Subheader: "PERMITTING",
                      Header:
                        "Construction-related permitting services are initiated at an early stage of the project.",
                      Description:
                        "IMPC permitting services will provide investors with a big picture of all related works and effects to their projects, allowing them to recognize and plan a good arrangement for their projects.",
                    },
                  },
                  ProjectAndConstructionManagement: {
                    id: 5,
                    Header: "PROJECT AND CONSTRUCTION MANAGEMENT",
                    PortfolioLinkButton: "PORTFOLIO",
                    SliderItems: [
                      {
                        id: 9,
                        Subheader: "PROJECT MANAGEMENT",
                        Header: "IMPC work closely with our customers.",
                        Description:
                          "Throughout the project planning and development phase, we work closely with our\n              customers to deliver projects of cost and quality efficiency.",
                      },
                      {
                        id: 10,
                        Subheader: "CONSTRUCTION MANAGEMENT",
                        Header: "Construction quality control and supervision.",
                        Description:
                          "IMPC provides hands-on construction project management services to our customers\n              by deploying quality resources to meet the demands of each customer to deliver\n              quality buildings and properties. We focus on controlling the project’s time,\n              cost, and quality.",
                      },
                    ],
                  },
                  IndustrialEstateManagement: {
                    id: 2,
                    Header: "INDUSTRIAL ESTATE MANAGEMENT",
                    PortfolioLinkButton: "PORTFOLIO",
                    Content: {
                      id: 2,
                      Subheader: "INDUSTRIAL ESTATE MANAGEMENT",
                      Header: "Experience in\nmanaging facility services",
                      Description:
                        "IMPC is an Industrial Estate Management service provider with experience in managing facility services that can drive and demonstrate a significant reduction in the cost of  the facility while maintaining or improving the quality and level of Investor service.",
                    },
                  },
                  Seo: {
                    id: 5,
                    PageTitle: "IMPC - Homepage",
                    MetaTitle: "IMP Design and Technical Management Corporation",
                    MetaKeyWords:
                      "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
                    MetaDescription:
                      "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
                    MetaImage: {
                      data: null,
                    },
                  },
                  localizations: {
                    data: [
                      {
                        id: 2,
                        attributes: {
                          createdAt: "2022-10-06T05:18:31.653Z",
                          updatedAt: "2022-10-07T02:43:30.411Z",
                          publishedAt: "2022-10-06T13:51:57.229Z",
                          locale: "vi",
                          ServiceBanner: {
                            id: 2,
                            Description:
                              "Với sự gia tăng mạnh mẽ của các Nhà đầu tư Phát triển Công nghiệp, chúng tôi hiểu cơ hội cũng như nhu cầu và mối quan tâm lớn của những khách hàng tiềm năng này trong việc tư vấn và cung cấp dịch vụ trong giai đoạn lập kế hoạch và phát triển các dự án của họ.",
                            Header: "DỊCH VỤ CỦA CHÚNG TÔI\nGIẢI PHÁP CHO DOANH NGHIỆP \nCỦA BẠN",
                          },
                          PlanningAndDesign: {
                            id: 3,
                            Header: "QUY HOẠCH VÀ THIẾT KẾ",
                            PortfolioLinkButton: "PORTFOLIO",
                          },
                          Permitting: {
                            id: 3,
                            Header: "GIẤY PHÉP",
                            PortfolioLinkButton: "PORTFOLIO",
                          },
                          ProjectAndConstructionManagement: {
                            id: 6,
                            Header: "PROJECT AND CONSTRUCTION MANAGEMENT",
                            PortfolioLinkButton: "PORTFOLIO",
                          },
                          IndustrialEstateManagement: {
                            id: 4,
                            Header: "QUẢN LÝ BẤT ĐỘNG SẢN CÔNG NGHIỆP",
                            PortfolioLinkButton: "PORTFOLIO",
                          },
                          Seo: {
                            id: 6,
                            PageTitle: "IMPC - Homepage",
                            MetaTitle: "IMP Design and Technical Management Corporation",
                            MetaKeyWords:
                              "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
                            MetaDescription:
                              "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
                          },
                          localizations: {
                            data: [
                              {
                                id: 1,
                                attributes: {
                                  createdAt: "2022-10-05T10:08:34.892Z",
                                  updatedAt: "2022-10-07T15:52:28.291Z",
                                  publishedAt: "2022-10-05T10:08:55.373Z",
                                  locale: "en",
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
};
const DEFAULT_PORTFOLIOPAGE_DATA = {
  createdAt: "2022-10-06T08:13:42.181Z",
  updatedAt: "2022-10-07T08:25:32.396Z",
  publishedAt: "2022-10-07T02:59:12.813Z",
  locale: "en",
  Seo: {
    PageTitle: "IMPC - Portfolio page",
    MetaTitle: "IMP Design and Technical Management Corporation",
    MetaKeyWords:
      "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
    MetaDescription:
      "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
    MetaImage: {
      url: "/og-img.png",
    },
  },
  ProjectTitle: "OUR WORK",
  PortfolioBanner: {
    id: 1,
    Header: "PORTFOLIO",
    Subheader: "Our experiences define our identity",
    BackgroundImage: {
      url: "/assets/images/portfolio/porfolio-banner-bg.webp",
      data: {
        id: 40,
        attributes: {
          name: "porfolio-banner-bg.jpg",
          alternativeText: "porfolio-banner-bg.jpg",
          caption: "porfolio-banner-bg.jpg",
          width: 2560,
          height: 1249,
          formats: {
            thumbnail: {
              name: "thumbnail_porfolio-banner-bg.jpg",
              hash: "thumbnail_porfolio_banner_bg_d57eec790c",
              ext: ".jpg",
              mime: "image/jpeg",
              path: null,
              width: 245,
              height: 119,
              size: 6.23,
              url: "/uploads/thumbnail_porfolio_banner_bg_d57eec790c.jpg",
            },
            large: {
              name: "large_porfolio-banner-bg.jpg",
              hash: "large_porfolio_banner_bg_d57eec790c",
              ext: ".jpg",
              mime: "image/jpeg",
              path: null,
              width: 1000,
              height: 488,
              size: 63.62,
              url: "/uploads/large_porfolio_banner_bg_d57eec790c.jpg",
            },
            medium: {
              name: "medium_porfolio-banner-bg.jpg",
              hash: "medium_porfolio_banner_bg_d57eec790c",
              ext: ".jpg",
              mime: "image/jpeg",
              path: null,
              width: 750,
              height: 366,
              size: 39.32,
              url: "/uploads/medium_porfolio_banner_bg_d57eec790c.jpg",
            },
            small: {
              name: "small_porfolio-banner-bg.jpg",
              hash: "small_porfolio_banner_bg_d57eec790c",
              ext: ".jpg",
              mime: "image/jpeg",
              path: null,
              width: 500,
              height: 244,
              size: 19.96,
              url: "/uploads/small_porfolio_banner_bg_d57eec790c.jpg",
            },
          },
          hash: "porfolio_banner_bg_d57eec790c",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 231,
          url: "/uploads/porfolio_banner_bg_d57eec790c.jpg",
          previewUrl: null,
          provider: "local",
          provider_metadata: null,
          createdAt: "2022-10-06T08:08:16.124Z",
          updatedAt: "2022-10-06T08:08:16.124Z",
          placeholder:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AMrf+b7b9rTV78rd8+Dt/uXz/+75//z///P5//P5/wCJrbmct8W50eS81+uyz+Cty9qqxtWyy9ro8f7t9f8AVn5qAB8eXIGEPWtvACYwCy0xAAcVTHN/nsKbi6yFAGh2ZmyEaK/ApKa0nY2YlGh5ey5FPihoAJ24acDCrQBNWGJfZm6Rlpvd3Njx8Ob07+nS3LuUr2upqp+uqKvP/WBssicr9wAAAABJRU5ErkJggg==",
        },
      },
    },
  },
  PortfolioPlanningAndDesign: {
    id: 1,
    Header: "GENERAL INFORMATION",
    ServiceTitle: "Planning And Design",
    Information: [
      {
        id: 5,
        Title: "Planning services include:",
        Content: "1/2000 planning\n1/500 planning",
      },
      {
        id: 6,
        Title: "Design services include:",
        Content: "Concept\nArchitecture\nInfrastructure\nMEP\nFire protection",
      },
    ],
  },
  PortfolioPermitting: {
    id: 1,
    Header: "GENERAL INFORMATION",
    ServiceTitle: "Permitting",
    Information: {
      id: 9,
      Title: "Permitting Services Include:",
      Content:
        "Getting approval of Master plan 1/500\nGetting approval of Environmental impact assessment/ Environment protection plan\nGetting appraisal of Fire protection\nGetting appraisal of Feasibility Study Report\nGetting Construction permit\nGetting approval of any as-built, completion of the construction works\nGetting Other licenses/ acceptances/ approvals as necessary for the project.",
    },
  },
  PortfolioProjectAndConstructionManagement: {
    id: 1,
    Header: "GENERAL INFORMATION",
    CertificateTitle: "IMP Practising Certificate for Building Works",
    ChartTitle: "The Percentage Of Employees Have Diploma",
    ServiceTitle: "Project And Construction Management",
    CertificateImage: {
      url: "/assets/images/portfolio/certificate.webp",

      data: [
        {
          id: 41,
          attributes: {
            name: "certificate.webp",
            alternativeText: "certificate.webp",
            caption: "certificate.webp",
            width: 674,
            height: 891,
            formats: {
              thumbnail: {
                name: "thumbnail_certificate.webp",
                hash: "thumbnail_certificate_086ab5196b",
                ext: ".webp",
                mime: "image/webp",
                path: null,
                width: 118,
                height: 156,
                size: 2.97,
                url: "/uploads/thumbnail_certificate_086ab5196b.webp",
              },
              small: {
                name: "small_certificate.webp",
                hash: "small_certificate_086ab5196b",
                ext: ".webp",
                mime: "image/webp",
                path: null,
                width: 378,
                height: 500,
                size: 22.61,
                url: "/uploads/small_certificate_086ab5196b.webp",
              },
              medium: {
                name: "medium_certificate.webp",
                hash: "medium_certificate_086ab5196b",
                ext: ".webp",
                mime: "image/webp",
                path: null,
                width: 567,
                height: 750,
                size: 40.65,
                url: "/uploads/medium_certificate_086ab5196b.webp",
              },
            },
            hash: "certificate_086ab5196b",
            ext: ".webp",
            mime: "image/webp",
            size: 45.99,
            url: "/uploads/certificate_086ab5196b.webp",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T08:11:01.693Z",
            updatedAt: "2022-10-06T08:11:01.693Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAxElEQVQImV3NoQ6DMBDG8XsKBE/AG9TgMRgMqopkEsOyhBmypKpBozBTa7IEVYGtWFCnUOf6BttSh+oGmdj2s5f7/mCMKTfe+77v6808z0BE14s6HfbH3e7ctrdxfN4f3ntAxLqu0zRljEVRlGWZEMJaC13XhWGYJImUsizLPM+dc+uHlLIoCkT0v0BrHQRBHMdVVSml9IaIYBgGAGCMcc77jVIKEdc457xpGkQ0xhCRtXad+t51zgkhPvG/5jRNy7K8Dy97MqMsUS+ZqAAAAABJRU5ErkJggg==",
          },
        },
      ],
    },
    Information: {
      id: 10,
      Title: "Project Management And Construction Management Services Include:",
      Content:
        "Design Management\nBiding Management\nConstruction Document Management\nConstruction Contract Administration\nPostconstruction Administration\nProgress Management\nQuality Management\nQuantity Management\nOccupational Safety And Construction\nEnvironmental Management",
    },
  },
  PortfolioIEM: {
    id: 1,
    Header: "GENERAL INFORMATION",
    ServiceTitle: "Industrial Estate Management",
    AchivementInfo: [
      {
        id: 1,
        HighlightText: "19 Projects Nationwide",
        Content: "Provide facility management service in 17 projects nationwide",
      },
      {
        id: 2,
        HighlightText: "1,216,875 m2",
        Content: "Total manage GFA 1,216,875 m2",
      },
      {
        id: 3,
        HighlightText: "2,194,050 m2",
        Content: "Total manage land area 2,194,050 m2",
      },
    ],
    Infomation: [
      {
        id: 1,
        Title: "IMPC Industrial Estate Management Service Responsibilities",
        Content:
          "Supervision And Management\nSecurity\nCleaning\nLandscaping\nMaintenance And Repairation\nOn Demand",
      },
      {
        id: 2,
        Title: "IMPC Industrial Estate Management\nServices Include:",
        Content:
          "Manage and supervise the exploitation and usage of \nthe Real Estate by Tenants\nSecurity Services\nCleaning and Landscaping\nMaintenance and Repair\nOther on-demand services (if any)",
      },
    ],
  },

  localizations: {
    data: [
      {
        id: 2,
        attributes: {
          createdAt: "2022-10-06T08:26:36.040Z",
          updatedAt: "2022-10-07T08:26:17.948Z",
          publishedAt: "2022-10-07T07:49:36.007Z",
          locale: "vi",
          ProjectTitle: "DỰ ÁN CỦA CHÚNG TÔI",
          PortfolioBanner: {
            id: 2,
            Header: "PORTFOLIO",
            Subheader: "Kinh nghiệm của chúng tôi xác định danh tính của chúng tôi",
            BackgroundImage: {
              data: {
                id: 40,
                attributes: {
                  name: "porfolio-banner-bg.jpg",
                  alternativeText: "porfolio-banner-bg.jpg",
                  caption: "porfolio-banner-bg.jpg",
                  width: 2560,
                  height: 1249,
                  formats: {
                    thumbnail: {
                      name: "thumbnail_porfolio-banner-bg.jpg",
                      hash: "thumbnail_porfolio_banner_bg_d57eec790c",
                      ext: ".jpg",
                      mime: "image/jpeg",
                      path: null,
                      width: 245,
                      height: 119,
                      size: 6.23,
                      url: "/uploads/thumbnail_porfolio_banner_bg_d57eec790c.jpg",
                    },
                    large: {
                      name: "large_porfolio-banner-bg.jpg",
                      hash: "large_porfolio_banner_bg_d57eec790c",
                      ext: ".jpg",
                      mime: "image/jpeg",
                      path: null,
                      width: 1000,
                      height: 488,
                      size: 63.62,
                      url: "/uploads/large_porfolio_banner_bg_d57eec790c.jpg",
                    },
                    medium: {
                      name: "medium_porfolio-banner-bg.jpg",
                      hash: "medium_porfolio_banner_bg_d57eec790c",
                      ext: ".jpg",
                      mime: "image/jpeg",
                      path: null,
                      width: 750,
                      height: 366,
                      size: 39.32,
                      url: "/uploads/medium_porfolio_banner_bg_d57eec790c.jpg",
                    },
                    small: {
                      name: "small_porfolio-banner-bg.jpg",
                      hash: "small_porfolio_banner_bg_d57eec790c",
                      ext: ".jpg",
                      mime: "image/jpeg",
                      path: null,
                      width: 500,
                      height: 244,
                      size: 19.96,
                      url: "/uploads/small_porfolio_banner_bg_d57eec790c.jpg",
                    },
                  },
                  hash: "porfolio_banner_bg_d57eec790c",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 231,
                  url: "/uploads/porfolio_banner_bg_d57eec790c.jpg",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: "2022-10-06T08:08:16.124Z",
                  updatedAt: "2022-10-06T08:08:16.124Z",
                  placeholder:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AMrf+b7b9rTV78rd8+Dt/uXz/+75//z///P5//P5/wCJrbmct8W50eS81+uyz+Cty9qqxtWyy9ro8f7t9f8AVn5qAB8eXIGEPWtvACYwCy0xAAcVTHN/nsKbi6yFAGh2ZmyEaK/ApKa0nY2YlGh5ey5FPihoAJ24acDCrQBNWGJfZm6Rlpvd3Njx8Ob07+nS3LuUr2upqp+uqKvP/WBssicr9wAAAABJRU5ErkJggg==",
                },
              },
            },
          },
          PortfolioPlanningAndDesign: {
            id: 2,
            Header: "THÔNG TIN CHUNG",
            ServiceTitle: "QUY HOẠCH VÀ THIẾT KẾ",
            Information: [
              {
                id: 7,
                Title: "Dịch vụ quy hoạch bao gồm:",
                Content: "Quy hoạch 1/2000\nQuy hoạch 1/500",
              },
              {
                id: 8,
                Title: "Dịch vụ thiết kế bao gồm:",
                Content: "Ý tưởng\nKiến trúc\nCơ sở hạ tầng\nMEP\nPCCC",
              },
            ],
          },
          PortfolioPermitting: {
            id: 2,
            Header: "THÔNG TIN CHUNG",
            ServiceTitle: "GIẤY PHÉP",
            Information: {
              id: 11,
              Title: "Dịch vụ giấy phép bao gồm:",
              Content:
                "Phê duyệt quy hoạch 1/500\nPhê duyệt Đánh giá tác động môi trường / Kế hoạch bảo vệ môi trường\nThẩm định về Phòng cháy chữa cháy\nThẩm định Báo cáo nghiên cứu khả thi\nXin giấy phép xây dựng\nNhận sự chấp thuận của bất kỳ công trình xây dựng đang xây dựng, hoàn thiện nào\nNhận các giấy phép / chấp nhận / phê duyệt khác khi cần thiết cho dự án.",
            },
          },
          PortfolioProjectAndConstructionManagement: {
            id: 2,
            Header: "THÔNG TIN CHUNG",
            CertificateTitle: "Chứng chỉ hành nghề \nvề xây dựng công trình IMP",
            ChartTitle: "Tỷ lệ nhân viên có bằng tốt nghiệp",
            ServiceTitle: "QUẢN LÝ DỰ ÁN VÀ XÂY DỰNG",
            CertificateImage: {
              data: [
                {
                  id: 41,
                  attributes: {
                    name: "certificate.webp",
                    alternativeText: "certificate.webp",
                    caption: "certificate.webp",
                    width: 674,
                    height: 891,
                    formats: {
                      thumbnail: {
                        name: "thumbnail_certificate.webp",
                        hash: "thumbnail_certificate_086ab5196b",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 118,
                        height: 156,
                        size: 2.97,
                        url: "/uploads/thumbnail_certificate_086ab5196b.webp",
                      },
                      small: {
                        name: "small_certificate.webp",
                        hash: "small_certificate_086ab5196b",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 378,
                        height: 500,
                        size: 22.61,
                        url: "/uploads/small_certificate_086ab5196b.webp",
                      },
                      medium: {
                        name: "medium_certificate.webp",
                        hash: "medium_certificate_086ab5196b",
                        ext: ".webp",
                        mime: "image/webp",
                        path: null,
                        width: 567,
                        height: 750,
                        size: 40.65,
                        url: "/uploads/medium_certificate_086ab5196b.webp",
                      },
                    },
                    hash: "certificate_086ab5196b",
                    ext: ".webp",
                    mime: "image/webp",
                    size: 45.99,
                    url: "/uploads/certificate_086ab5196b.webp",
                    previewUrl: null,
                    provider: "local",
                    provider_metadata: null,
                    createdAt: "2022-10-06T08:11:01.693Z",
                    updatedAt: "2022-10-06T08:11:01.693Z",
                    placeholder:
                      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAxElEQVQImV3NoQ6DMBDG8XsKBE/AG9TgMRgMqopkEsOyhBmypKpBozBTa7IEVYGtWFCnUOf6BttSh+oGmdj2s5f7/mCMKTfe+77v6808z0BE14s6HfbH3e7ctrdxfN4f3ntAxLqu0zRljEVRlGWZEMJaC13XhWGYJImUsizLPM+dc+uHlLIoCkT0v0BrHQRBHMdVVSml9IaIYBgGAGCMcc77jVIKEdc457xpGkQ0xhCRtXad+t51zgkhPvG/5jRNy7K8Dy97MqMsUS+ZqAAAAABJRU5ErkJggg==",
                  },
                },
              ],
            },
            Information: {
              id: 12,
              Title: "Dịch vụ Quản lý Dự án và Quản lý Xây dựng Bao gồm:",
              Content:
                "Quản lý thiết kế\nQuản lý đấu thầu\nQuản lý tài liệu xây dựng\nQuản lý hợp đồng xây dựng\nQuản trị sau xây dựng\nQuản lý tiến độ\nQuản lý chất lượng\nQuản lý số lượng\nAn toàn lao động và xây dựng\nQuản lý môi trường",
            },
          },
          PortfolioIEM: {
            id: 2,
            Header: "THÔNG TIN CHUNG",
            ServiceTitle: "QUẢN LÝ BẤT ĐỘNG SẢN CÔNG NGHIỆP",
            AchivementInfo: [
              {
                id: 4,
                HighlightText: "19 dự án trên toàn quốc",
                Content: "Cung cấp dịch vụ quản lý cơ sở tại 19 dự án trên toàn quốc",
              },
              {
                id: 5,
                HighlightText: "1,216,875 m2",
                Content: "Tổng quản lý GFA 1.216.875 m2",
              },
              {
                id: 6,
                HighlightText: "2,194,050 m2",
                Content: "Tổng diện tích đất quản lý 2.194.050 m2",
              },
            ],
            Infomation: [
              {
                id: 3,
                Title: "Trách nhiệm của Dịch vụ Quản lý \nBất động sản Công nghiệp IMPC",
                Content:
                  "Giám sát và quản lý\nBảo vệ\nLàm sạch\nCảnh quan\nBảo trì và sửa chữa\nTheo yêu cầu",
              },
              {
                id: 4,
                Title: "\nDịch vụ Quản lý Bất động sản \nCông nghiệp IMPC Bao gồm:",
                Content:
                  "Quản lý và giám sát việc khai thác và sử dụng Bất động sản của Người thuê\nDịch vụ an ninh\nLàm sạch và cảnh quan\nBảo trì và sửa chữa\nCác dịch vụ theo yêu cầu khác (nếu có)",
              },
            ],
          },

          localizations: {
            data: [
              {
                id: 1,
                attributes: {
                  createdAt: "2022-10-06T08:13:42.181Z",
                  updatedAt: "2022-10-07T08:25:32.396Z",
                  publishedAt: "2022-10-07T02:59:12.813Z",
                  locale: "en",
                  ProjectTitle: "OUR WORK",
                  PortfolioBanner: {
                    id: 1,
                    Header: "PORTFOLIO",
                    Subheader: "Our experiences define our identity",
                    BackgroundImage: {
                      data: {
                        id: 40,
                        attributes: {
                          name: "porfolio-banner-bg.jpg",
                          alternativeText: "porfolio-banner-bg.jpg",
                          caption: "porfolio-banner-bg.jpg",
                          width: 2560,
                          height: 1249,
                          formats: {
                            thumbnail: {
                              name: "thumbnail_porfolio-banner-bg.jpg",
                              hash: "thumbnail_porfolio_banner_bg_d57eec790c",
                              ext: ".jpg",
                              mime: "image/jpeg",
                              path: null,
                              width: 245,
                              height: 119,
                              size: 6.23,
                              url: "/uploads/thumbnail_porfolio_banner_bg_d57eec790c.jpg",
                            },
                            large: {
                              name: "large_porfolio-banner-bg.jpg",
                              hash: "large_porfolio_banner_bg_d57eec790c",
                              ext: ".jpg",
                              mime: "image/jpeg",
                              path: null,
                              width: 1000,
                              height: 488,
                              size: 63.62,
                              url: "/uploads/large_porfolio_banner_bg_d57eec790c.jpg",
                            },
                            medium: {
                              name: "medium_porfolio-banner-bg.jpg",
                              hash: "medium_porfolio_banner_bg_d57eec790c",
                              ext: ".jpg",
                              mime: "image/jpeg",
                              path: null,
                              width: 750,
                              height: 366,
                              size: 39.32,
                              url: "/uploads/medium_porfolio_banner_bg_d57eec790c.jpg",
                            },
                            small: {
                              name: "small_porfolio-banner-bg.jpg",
                              hash: "small_porfolio_banner_bg_d57eec790c",
                              ext: ".jpg",
                              mime: "image/jpeg",
                              path: null,
                              width: 500,
                              height: 244,
                              size: 19.96,
                              url: "/uploads/small_porfolio_banner_bg_d57eec790c.jpg",
                            },
                          },
                          hash: "porfolio_banner_bg_d57eec790c",
                          ext: ".jpg",
                          mime: "image/jpeg",
                          size: 231,
                          url: "/uploads/porfolio_banner_bg_d57eec790c.jpg",
                          previewUrl: null,
                          provider: "local",
                          provider_metadata: null,
                          createdAt: "2022-10-06T08:08:16.124Z",
                          updatedAt: "2022-10-06T08:08:16.124Z",
                          placeholder:
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAIAAADzBuo/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApklEQVQImQGbAGT/AMrf+b7b9rTV78rd8+Dt/uXz/+75//z///P5//P5/wCJrbmct8W50eS81+uyz+Cty9qqxtWyy9ro8f7t9f8AVn5qAB8eXIGEPWtvACYwCy0xAAcVTHN/nsKbi6yFAGh2ZmyEaK/ApKa0nY2YlGh5ey5FPihoAJ24acDCrQBNWGJfZm6Rlpvd3Njx8Ob07+nS3LuUr2upqp+uqKvP/WBssicr9wAAAABJRU5ErkJggg==",
                        },
                      },
                    },
                  },
                  PortfolioPlanningAndDesign: {
                    id: 1,
                    Header: "GENERAL INFORMATION",
                    ServiceTitle: "Planning And Design",
                    Information: [
                      {
                        id: 5,
                        Title: "Planning services include:",
                        Content: "1/2000 planning\n1/500 planning",
                      },
                      {
                        id: 6,
                        Title: "Design services include:",
                        Content: "Concept\nArchitecture\nInfrastructure\nMEP\nFire protection",
                      },
                    ],
                  },
                  PortfolioPermitting: {
                    id: 1,
                    Header: "GENERAL INFORMATION",
                    ServiceTitle: "Permitting",
                    Information: {
                      id: 9,
                      Title: "Permitting Services Include:",
                      Content:
                        "Getting approval of Master plan 1/500\nGetting approval of Environmental impact assessment/ Environment protection plan\nGetting appraisal of Fire protection\nGetting appraisal of Feasibility Study Report\nGetting Construction permit\nGetting approval of any as-built, completion of the construction works\nGetting Other licenses/ acceptances/ approvals as necessary for the project.",
                    },
                  },
                  PortfolioProjectAndConstructionManagement: {
                    id: 1,
                    Header: "GENERAL INFORMATION",
                    CertificateTitle: "IMP Practising Certificate for Building Works",
                    ChartTitle: "The Percentage Of Employees Have Diploma",
                    ServiceTitle: "Project And Construction Management",
                    CertificateImage: {
                      data: [
                        {
                          id: 41,
                          attributes: {
                            name: "certificate.webp",
                            alternativeText: "certificate.webp",
                            caption: "certificate.webp",
                            width: 674,
                            height: 891,
                            formats: {
                              thumbnail: {
                                name: "thumbnail_certificate.webp",
                                hash: "thumbnail_certificate_086ab5196b",
                                ext: ".webp",
                                mime: "image/webp",
                                path: null,
                                width: 118,
                                height: 156,
                                size: 2.97,
                                url: "/uploads/thumbnail_certificate_086ab5196b.webp",
                              },
                              small: {
                                name: "small_certificate.webp",
                                hash: "small_certificate_086ab5196b",
                                ext: ".webp",
                                mime: "image/webp",
                                path: null,
                                width: 378,
                                height: 500,
                                size: 22.61,
                                url: "/uploads/small_certificate_086ab5196b.webp",
                              },
                              medium: {
                                name: "medium_certificate.webp",
                                hash: "medium_certificate_086ab5196b",
                                ext: ".webp",
                                mime: "image/webp",
                                path: null,
                                width: 567,
                                height: 750,
                                size: 40.65,
                                url: "/uploads/medium_certificate_086ab5196b.webp",
                              },
                            },
                            hash: "certificate_086ab5196b",
                            ext: ".webp",
                            mime: "image/webp",
                            size: 45.99,
                            url: "/uploads/certificate_086ab5196b.webp",
                            previewUrl: null,
                            provider: "local",
                            provider_metadata: null,
                            createdAt: "2022-10-06T08:11:01.693Z",
                            updatedAt: "2022-10-06T08:11:01.693Z",
                            placeholder:
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAxElEQVQImV3NoQ6DMBDG8XsKBE/AG9TgMRgMqopkEsOyhBmypKpBozBTa7IEVYGtWFCnUOf6BttSh+oGmdj2s5f7/mCMKTfe+77v6808z0BE14s6HfbH3e7ctrdxfN4f3ntAxLqu0zRljEVRlGWZEMJaC13XhWGYJImUsizLPM+dc+uHlLIoCkT0v0BrHQRBHMdVVSml9IaIYBgGAGCMcc77jVIKEdc457xpGkQ0xhCRtXad+t51zgkhPvG/5jRNy7K8Dy97MqMsUS+ZqAAAAABJRU5ErkJggg==",
                          },
                        },
                      ],
                    },
                    Information: {
                      id: 10,
                      Title: "Project Management And Construction Management Services Include:",
                      Content:
                        "Design Management\nBiding Management\nConstruction Document Management\nConstruction Contract Administration\nPostconstruction Administration\nProgress Management\nQuality Management\nQuantity Management\nOccupational Safety And Construction\nEnvironmental Management",
                    },
                  },
                  PortfolioIEM: {
                    id: 1,
                    Header: "GENERAL INFORMATION",
                    ServiceTitle: "Industrial Estate Management",
                    AchivementInfo: [
                      {
                        id: 1,
                        HighlightText: "19 Projects Nationwide",
                        Content: "Provide facility management service in 17 projects nationwide",
                      },
                      {
                        id: 2,
                        HighlightText: "1,216,875 m2",
                        Content: "Total manage GFA 1,216,875 m2",
                      },
                      {
                        id: 3,
                        HighlightText: "2,194,050 m2",
                        Content: "Total manage land area 2,194,050 m2",
                      },
                    ],
                    Infomation: [
                      {
                        id: 1,
                        Title: "IMPC Industrial Estate Management Service Responsibilities",
                        Content:
                          "Supervision And Management\nSecurity\nCleaning\nLandscaping\nMaintenance And Repairation\nOn Demand",
                      },
                      {
                        id: 2,
                        Title: "IMPC Industrial Estate Management\nServices Include:",
                        Content:
                          "Manage and supervise the exploitation and usage of \nthe Real Estate by Tenants\nSecurity Services\nCleaning and Landscaping\nMaintenance and Repair\nOther on-demand services (if any)",
                      },
                    ],
                  },
                  SeoPortfolio: {
                    id: 3,
                    PageTitle: "IMPC - Homepage",
                    MetaTitle: null,
                    MetaKeyWords: null,
                    MetaDescription: null,
                    MetaImage: {
                      data: null,
                    },
                  },
                  localizations: {
                    data: [
                      {
                        id: 2,
                        attributes: {
                          createdAt: "2022-10-06T08:26:36.040Z",
                          updatedAt: "2022-10-07T08:26:17.948Z",
                          publishedAt: "2022-10-07T07:49:36.007Z",
                          locale: "vi",
                          ProjectTitle: "DỰ ÁN CỦA CHÚNG TÔI",
                          PortfolioBanner: {
                            id: 2,
                            Header: "PORTFOLIO",
                            Subheader: "Kinh nghiệm của chúng tôi xác định danh tính của chúng tôi",
                          },
                          PortfolioPlanningAndDesign: {
                            id: 2,
                            Header: "THÔNG TIN CHUNG",
                            ServiceTitle: "QUY HOẠCH VÀ THIẾT KẾ",
                          },
                          PortfolioPermitting: {
                            id: 2,
                            Header: "THÔNG TIN CHUNG",
                            ServiceTitle: "GIẤY PHÉP",
                          },
                          PortfolioProjectAndConstructionManagement: {
                            id: 2,
                            Header: "THÔNG TIN CHUNG",
                            CertificateTitle: "Chứng chỉ hành nghề \nvề xây dựng công trình IMP",
                            ChartTitle: "Tỷ lệ nhân viên có bằng tốt nghiệp",
                            ServiceTitle: "QUẢN LÝ DỰ ÁN VÀ XÂY DỰNG",
                          },
                          PortfolioIEM: {
                            id: 2,
                            Header: "THÔNG TIN CHUNG",
                            ServiceTitle: "QUẢN LÝ BẤT ĐỘNG SẢN CÔNG NGHIỆP",
                          },
                          SeoPortfolio: {
                            id: 7,
                            PageTitle: "IMPC - Homepage",
                            MetaTitle: "IMP Design and Technical Management Corporation",
                            MetaKeyWords:
                              "Planning & Design, Permitting, Project And Construction Management, Industrial Estate Management",
                            MetaDescription:
                              "IMPC is an associated member of Vietnam's leading Group developing industrial parks and townships nationwide.",
                          },
                          localizations: {
                            data: [
                              {
                                id: 1,
                                attributes: {
                                  createdAt: "2022-10-06T08:13:42.181Z",
                                  updatedAt: "2022-10-07T08:25:32.396Z",
                                  publishedAt: "2022-10-07T02:59:12.813Z",
                                  locale: "en",
                                  ProjectTitle: "OUR WORK",
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
};

const DEFAULT_PROJECTS = [
  {
    id: 109,
    attributes: {
      Name: "Toan Cau Warehouse",
      createdAt: "2022-10-06T09:56:38.624Z",
      updatedAt: "2022-10-07T11:09:52.535Z",
      publishedAt: "2022-10-06T09:56:38.619Z",
      IsPlanningAndDesign: true,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "GLOBAL LOGISTICS SERVICE & INVESTMENTS JSC",
      Function: "Ready Built Warehouse",
      LandArea: "3200",
      GFA: "5358",
      InvesmentCapital: "",
      Image: {
        data: {
          id: 50,
          attributes: {
            name: "toancau-warehouse.png",
            alternativeText: "toancau-warehouse.png",
            caption: "toancau-warehouse.png",
            width: 377,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_toancau-warehouse.png",
                hash: "thumbnail_toancau_warehouse_b39c1e3d36",
                ext: ".png",
                mime: "image/png",
                path: null,
                width: 245,
                height: 148,
                size: 88.85,
                url: "/uploads/thumbnail_toancau_warehouse_b39c1e3d36.png",
              },
            },
            hash: "toancau_warehouse_b39c1e3d36",
            ext: ".png",
            mime: "image/png",
            size: 53.33,
            url: "/uploads/toancau_warehouse_b39c1e3d36.png",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-07T11:09:50.212Z",
            updatedAt: "2022-10-07T11:09:50.212Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AGh+Y7C5s6mysnmPhFx6ZmB9Xn2Sdm+JgmKAf2aDfwAtQTBTW3u9udLPy97KytCyu7drgWFIYDw1TT1yiGUAFSsQABENHihBkZOn//7/+fX/h42HSVlCdIVpmJygABcqAAARAAAIACQrQK+vtXx6d1JUX4GChYqMkWZpdQAjMgAjOABMXQ8gKAA+SjY1MTlAP0lFRlJMTVdRUl0AGyAANEMCPk0OJz4AZG1CqqunVVVcR0RRTUxXTk9b9M9GCIZtMiIAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 110,
    attributes: {
      Name: "Saigon Glass Company",
      createdAt: "2022-10-06T09:56:38.655Z",
      updatedAt: "2022-10-07T09:57:24.341Z",
      publishedAt: "2022-10-06T09:56:38.651Z",
      IsPlanningAndDesign: true,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "SAIGON INTERNAL CO.,LTD",
      Function: "Ready Built Warehouse",
      LandArea: "30000",
      GFA: "0",
      InvesmentCapital: "$75 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 111,
    attributes: {
      Name: "Hiive Hotel",
      createdAt: "2022-10-06T09:56:38.686Z",
      updatedAt: "2022-10-07T09:56:35.160Z",
      publishedAt: "2022-10-06T09:56:38.682Z",
      IsPlanningAndDesign: true,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "LODGIS HOSPITALITY HOLDINGS PTE. LTD",
      Function: "Hotel",
      LandArea: "12292",
      GFA: "0",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 112,
    attributes: {
      Name: "Infrastructure for C&R Phase 2 & 3",
      createdAt: "2022-10-06T09:56:38.713Z",
      updatedAt: "2022-10-07T09:57:05.646Z",
      publishedAt: "2022-10-06T09:56:38.710Z",
      IsPlanningAndDesign: true,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "VSIP NGHE AN CO., LTD.",
      Function: "Infrastructure",
      LandArea: null,
      GFA: null,
      InvesmentCapital: null,
      Image: {
        data: null,
      },
    },
  },
  {
    id: 113,
    attributes: {
      Name: "BWID Hai Duong Lot 5-Divergence 1",
      createdAt: "2022-10-06T09:56:38.739Z",
      updatedAt: "2022-10-07T09:56:06.301Z",
      publishedAt: "2022-10-06T09:56:38.737Z",
      IsPlanningAndDesign: true,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BW HD CO.,LTD",
      Function: "Ready Built Factory",
      LandArea: null,
      GFA: null,
      InvesmentCapital: null,
      Image: {
        data: null,
      },
    },
  },
  {
    id: 114,
    attributes: {
      Name: "BWID Hai Phong Lot 11*A",
      createdAt: "2022-10-06T09:56:38.768Z",
      updatedAt: "2022-10-07T09:56:48.158Z",
      publishedAt: "2022-10-06T09:56:38.765Z",
      IsPlanningAndDesign: true,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: true,
      Investor: "BW HD CO.,LTD",
      Function: "Ready Built Warehouse",
      LandArea: "32829",
      GFA: "20055",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 115,
    attributes: {
      Name: "BWID Bac Ninh",
      createdAt: "2022-10-06T09:56:38.795Z",
      updatedAt: "2022-10-07T09:54:41.356Z",
      publishedAt: "2022-10-06T09:56:38.792Z",
      IsPlanningAndDesign: true,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: true,
      Investor: "BWID Bac Ninh",
      Function: "Ready Built Factory",
      LandArea: "38000",
      GFA: "22880",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 116,
    attributes: {
      Name: "BWID Thoi Hoa Lot A3",
      createdAt: "2022-10-06T09:56:38.821Z",
      updatedAt: "2022-10-06T09:56:38.821Z",
      publishedAt: "2022-10-06T09:56:38.818Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID THOI HOA CO.,LTD",
      Function: "",
      LandArea: "162619",
      GFA: "0",
      InvesmentCapital: "$570 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 117,
    attributes: {
      Name: "BWID Thoi Hoa Lot A4",
      createdAt: "2022-10-06T09:56:38.864Z",
      updatedAt: "2022-10-06T09:56:38.864Z",
      publishedAt: "2022-10-06T09:56:38.858Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID TH - PROJECT 02 CO.,LTD",
      Function: "",
      LandArea: "114554",
      GFA: "0",
      InvesmentCapital: "$737 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 118,
    attributes: {
      Name: "BW Nhon Trach 2 (Lot Bc)",
      createdAt: "2022-10-06T09:56:38.892Z",
      updatedAt: "2022-10-07T09:59:32.335Z",
      publishedAt: "2022-10-06T09:56:38.889Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID NT CO.,LTD",
      Function: "",
      LandArea: "130864",
      GFA: "0",
      InvesmentCapital: "$1.020 Bil",
      Image: {
        data: {
          id: 46,
          attributes: {
            name: "bw-nhontrach2-bc.jpg",
            alternativeText: "bw-nhontrach2-bc.jpg",
            caption: "bw-nhontrach2-bc.jpg",
            width: 378,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_bw-nhontrach2-bc.jpg",
                hash: "thumbnail_bw_nhontrach2_bc_b386ed1525",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 245,
                height: 148,
                size: 11.75,
                url: "/uploads/thumbnail_bw_nhontrach2_bc_b386ed1525.jpg",
              },
            },
            hash: "bw_nhontrach2_bc_b386ed1525",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 24.8,
            url: "/uploads/bw_nhontrach2_bc_b386ed1525.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T09:42:48.816Z",
            updatedAt: "2022-10-06T10:06:52.009Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AJyv2FuAtDFsoy9xp0Z9r16Nv1yAplBnfTA+PwAEAACirc3G0/asvuV3msV2m814nMVsh6RtgZc6RkQyOTgAo6en///4/f//9Pr/8/f/3eb+nqWxztj0j5mmYWhqAE9SU5+fl+Hi5MvMze7u74+RlHN4fr2+xGdsdZSdrwCZn43Ax7jIzcKqr6aus6mEiIF1dnOAgYFgX2JdXGAAoqKef3+BY2NpTEtcRENXODZOMzNJMTFJPTtPmJGbHnJk/2TDIrQAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 119,
    attributes: {
      Name: "BW Nhon Trach 2 (Lot A)",
      createdAt: "2022-10-06T09:56:38.918Z",
      updatedAt: "2022-10-07T09:58:51.779Z",
      publishedAt: "2022-10-06T09:56:38.916Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID NT - PROJECT 2 CO.,LTD",
      Function: "",
      LandArea: "85000",
      GFA: "0",
      InvesmentCapital: "$913 Bil",
      Image: {
        data: {
          id: 46,
          attributes: {
            name: "bw-nhontrach2-bc.jpg",
            alternativeText: "bw-nhontrach2-bc.jpg",
            caption: "bw-nhontrach2-bc.jpg",
            width: 378,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_bw-nhontrach2-bc.jpg",
                hash: "thumbnail_bw_nhontrach2_bc_b386ed1525",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 245,
                height: 148,
                size: 11.75,
                url: "/uploads/thumbnail_bw_nhontrach2_bc_b386ed1525.jpg",
              },
            },
            hash: "bw_nhontrach2_bc_b386ed1525",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 24.8,
            url: "/uploads/bw_nhontrach2_bc_b386ed1525.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T09:42:48.816Z",
            updatedAt: "2022-10-06T10:06:52.009Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AJyv2FuAtDFsoy9xp0Z9r16Nv1yAplBnfTA+PwAEAACirc3G0/asvuV3msV2m814nMVsh6RtgZc6RkQyOTgAo6en///4/f//9Pr/8/f/3eb+nqWxztj0j5mmYWhqAE9SU5+fl+Hi5MvMze7u74+RlHN4fr2+xGdsdZSdrwCZn43Ax7jIzcKqr6aus6mEiIF1dnOAgYFgX2JdXGAAoqKef3+BY2NpTEtcRENXODZOMzNJMTFJPTtPmJGbHnJk/2TDIrQAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 120,
    attributes: {
      Name: "BW Bau Bang 06",
      createdAt: "2022-10-06T09:56:38.948Z",
      updatedAt: "2022-10-07T09:54:10.837Z",
      publishedAt: "2022-10-06T09:56:38.943Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID BAU BANG - BB06 CO.,LTD",
      Function: "",
      LandArea: "457396",
      GFA: "0",
      InvesmentCapital: "$19.308 Bil",
      Image: {
        data: {
          id: 44,
          attributes: {
            name: "bw-baubang-06.jpg",
            alternativeText: "bw-baubang-06.jpg",
            caption: "bw-baubang-06.jpg",
            width: 378,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_bw-baubang-06.jpg",
                hash: "thumbnail_bw_baubang_06_cc313bc408",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 245,
                height: 148,
                size: 6.97,
                url: "/uploads/thumbnail_bw_baubang_06_cc313bc408.jpg",
              },
            },
            hash: "bw_baubang_06_cc313bc408",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 13.37,
            url: "/uploads/bw_baubang_06_cc313bc408.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T09:36:27.253Z",
            updatedAt: "2022-10-06T09:36:27.253Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/ADSDxU6Kx67I6x5prwBRnQBPm2OQxm6bzABlqmabzACLvuji7f/g7f9VmNA1gsAwfbwzfrwzgL9so9SYwuYAtuX/rt3/g6nUSH3JYpjbgLbrkMbwjcjx0ur/0e7/AImas6/I3wAiTAAAVwAPbQAeeCRNm22NwsLa7e///wB1d32vr7Kjo66fo6mRlZhbXlVLTUYiJiQPFRgJExMAtrazpqainp6am5mVgYB9cHBqbW1oTk5NLi8xEBIWuAVgi1Kp5tIAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 121,
    attributes: {
      Name: "BWID Hai Duong Lot 3",
      createdAt: "2022-10-06T09:56:39.032Z",
      updatedAt: "2022-10-06T09:56:39.032Z",
      publishedAt: "2022-10-06T09:56:39.023Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BW HD CO.,LTD",
      Function: "",
      LandArea: "146052",
      GFA: "0",
      InvesmentCapital: "$42,324 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 122,
    attributes: {
      Name: "BW Nghe An (Lot E2-02 & Lot 34-35)",
      createdAt: "2022-10-06T09:56:39.085Z",
      updatedAt: "2022-10-07T09:57:48.820Z",
      publishedAt: "2022-10-06T09:56:39.077Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BCI JSC",
      Function: "",
      LandArea: "145524",
      GFA: "0",
      InvesmentCapital: "771.000.000.000 VND",
      Image: {
        data: {
          id: 44,
          attributes: {
            name: "bw-baubang-06.jpg",
            alternativeText: "bw-baubang-06.jpg",
            caption: "bw-baubang-06.jpg",
            width: 378,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_bw-baubang-06.jpg",
                hash: "thumbnail_bw_baubang_06_cc313bc408",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 245,
                height: 148,
                size: 6.97,
                url: "/uploads/thumbnail_bw_baubang_06_cc313bc408.jpg",
              },
            },
            hash: "bw_baubang_06_cc313bc408",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 13.37,
            url: "/uploads/bw_baubang_06_cc313bc408.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T09:36:27.253Z",
            updatedAt: "2022-10-06T09:36:27.253Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/ADSDxU6Kx67I6x5prwBRnQBPm2OQxm6bzABlqmabzACLvuji7f/g7f9VmNA1gsAwfbwzfrwzgL9so9SYwuYAtuX/rt3/g6nUSH3JYpjbgLbrkMbwjcjx0ur/0e7/AImas6/I3wAiTAAAVwAPbQAeeCRNm22NwsLa7e///wB1d32vr7Kjo66fo6mRlZhbXlVLTUYiJiQPFRgJExMAtrazpqainp6am5mVgYB9cHBqbW1oTk5NLi8xEBIWuAVgi1Kp5tIAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 123,
    attributes: {
      Name: "BWID Hai Duong Lot 2",
      createdAt: "2022-10-06T09:56:39.144Z",
      updatedAt: "2022-10-06T09:56:39.144Z",
      publishedAt: "2022-10-06T09:56:39.131Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: true,
      Investor: "BWID HD - PROJECT 2 CO.,LTD",
      Function: "",
      LandArea: "39485",
      GFA: "21182",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 124,
    attributes: {
      Name: "BW Tan Hiep",
      createdAt: "2022-10-06T09:56:39.185Z",
      updatedAt: "2022-10-07T09:59:48.692Z",
      publishedAt: "2022-10-06T09:56:39.181Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "DELIWAY VN., JSC",
      Function: "",
      LandArea: "644034",
      GFA: "0",
      InvesmentCapital: "$31,136 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 125,
    attributes: {
      Name: "BWID Hai Duong Lot 6",
      createdAt: "2022-10-06T09:56:39.213Z",
      updatedAt: "2022-10-06T09:56:39.213Z",
      publishedAt: "2022-10-06T09:56:39.208Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: true,
      Investor: "BWID HD - PROJECT 2 CO.,LTD",
      Function: "",
      LandArea: "109333",
      GFA: "60318",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 126,
    attributes: {
      Name: "BWID Hai Duong Lot 7",
      createdAt: "2022-10-06T09:56:39.238Z",
      updatedAt: "2022-10-06T09:56:39.238Z",
      publishedAt: "2022-10-06T09:56:39.236Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID HD 03 CO.,LTD",
      Function: "",
      LandArea: "131023",
      GFA: "0",
      InvesmentCapital: "$32,209 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 127,
    attributes: {
      Name: "BWID Hai Duong Lot 5 - Divergence 1",
      createdAt: "2022-10-06T09:56:39.264Z",
      updatedAt: "2022-10-06T09:56:39.264Z",
      publishedAt: "2022-10-06T09:56:39.262Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW HD CO.,LTD",
      Function: "",
      LandArea: "43550",
      GFA: "25129",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 128,
    attributes: {
      Name: "BWID Hai Phong Lot 11*B",
      createdAt: "2022-10-06T09:56:39.288Z",
      updatedAt: "2022-10-06T09:56:39.288Z",
      publishedAt: "2022-10-06T09:56:39.286Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: true,
      Investor: "BW HP CO.,LTD",
      Function: "",
      LandArea: "26442",
      GFA: "16272",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 129,
    attributes: {
      Name: "DEEP C2 (Nam Dinh Vu- Cat Hai)",
      createdAt: "2022-10-06T09:56:39.314Z",
      updatedAt: "2022-10-06T09:56:39.314Z",
      publishedAt: "2022-10-06T09:56:39.312Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "BWID LOGISTICS HAI AN CO.,LTD",
      Function: "",
      LandArea: "96137",
      GFA: "0",
      InvesmentCapital: "$19,896 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 130,
    attributes: {
      Name: "LOGOS VSIP BAC NINH 1 LOGISTICS PARK",
      createdAt: "2022-10-06T09:56:39.338Z",
      updatedAt: "2022-10-06T09:56:39.338Z",
      publishedAt: "2022-10-06T09:56:39.335Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: false,
      Investor: "LOGOS VIETNAM BN 1 LLC",
      Function: "",
      LandArea: "133838",
      GFA: "0",
      InvesmentCapital: "$612 Bil",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 131,
    attributes: {
      Name: "BWID Bau Bang Phase 1",
      createdAt: "2022-10-06T09:56:39.362Z",
      updatedAt: "2022-10-07T09:59:58.097Z",
      publishedAt: "2022-10-06T09:56:39.360Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "450000",
      GFA: "7560",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 132,
    attributes: {
      Name: "BWID Hai Duong Lot 5 - Divergence 2",
      createdAt: "2022-10-06T09:56:39.387Z",
      updatedAt: "2022-10-06T09:56:39.387Z",
      publishedAt: "2022-10-06T09:56:39.385Z",
      IsPlanningAndDesign: false,
      IsPermitting: true,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW HD CO.,LTD",
      Function: "",
      LandArea: "38590",
      GFA: "21330",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 133,
    attributes: {
      Name: "BWID Bau Bang Phase 2",
      createdAt: "2022-10-06T09:56:39.417Z",
      updatedAt: "2022-10-06T09:56:39.417Z",
      publishedAt: "2022-10-06T09:56:39.414Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "450000",
      GFA: "36000",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 134,
    attributes: {
      Name: "BWID Bau Bang Phase 3, 4, 5",
      createdAt: "2022-10-06T09:56:39.445Z",
      updatedAt: "2022-10-06T09:56:39.445Z",
      publishedAt: "2022-10-06T09:56:39.441Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "450000",
      GFA: "94669",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 135,
    attributes: {
      Name: "BWID Bau Bang Phase 6, 7",
      createdAt: "2022-10-06T09:56:39.494Z",
      updatedAt: "2022-10-06T09:56:39.494Z",
      publishedAt: "2022-10-06T09:56:39.486Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "450000",
      GFA: "59508",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 136,
    attributes: {
      Name: "BWID My Phuoc III Phase 1",
      createdAt: "2022-10-06T09:56:39.536Z",
      updatedAt: "2022-10-06T09:56:39.536Z",
      publishedAt: "2022-10-06T09:56:39.531Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "240000",
      GFA: "29657",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 137,
    attributes: {
      Name: "BWID My Phuoc III Phase 2",
      createdAt: "2022-10-06T09:56:39.575Z",
      updatedAt: "2022-10-06T09:56:39.575Z",
      publishedAt: "2022-10-06T09:56:39.570Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "240000",
      GFA: "13500",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 138,
    attributes: {
      Name: "BWID My Phuoc III Phase 3",
      createdAt: "2022-10-06T09:56:39.608Z",
      updatedAt: "2022-10-06T09:56:39.608Z",
      publishedAt: "2022-10-06T09:56:39.601Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "240000",
      GFA: "28336",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 139,
    attributes: {
      Name: "BWID My Phuoc III Phase 4, 5, 6",
      createdAt: "2022-10-06T09:56:39.645Z",
      updatedAt: "2022-10-06T09:56:39.645Z",
      publishedAt: "2022-10-06T09:56:39.639Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "240000",
      GFA: "74817",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 140,
    attributes: {
      Name: "Package 1.2 Phase 2 (Open Canal stage 2&5)",
      createdAt: "2022-10-06T09:56:39.688Z",
      updatedAt: "2022-10-06T09:56:39.688Z",
      publishedAt: "2022-10-06T09:56:39.678Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "VSIP Nghe An CO., LTD. ",
      Function: "",
      LandArea: "15320",
      GFA: "0",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 141,
    attributes: {
      Name: "C&R area - Phase 1A",
      createdAt: "2022-10-06T09:56:39.718Z",
      updatedAt: "2022-10-06T09:56:39.718Z",
      publishedAt: "2022-10-06T09:56:39.715Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "VSIP Quang Ngai CO., LTD.",
      Function: "",
      LandArea: "12300",
      GFA: "0",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 142,
    attributes: {
      Name: "BELHOMES Hai Phong",
      createdAt: "2022-10-06T09:56:39.745Z",
      updatedAt: "2022-10-07T09:53:59.056Z",
      publishedAt: "2022-10-06T09:56:39.741Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "VSIP HAI PHONG CO., LTD",
      Function: "",
      LandArea: "0",
      GFA: "0",
      InvesmentCapital: "",
      Image: {
        data: {
          id: 43,
          attributes: {
            name: "bellhomes-haiphong.jpg",
            alternativeText: "bellhomes-haiphong.jpg",
            caption: "bellhomes-haiphong.jpg",
            width: 378,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_bellhomes-haiphong.jpg",
                hash: "thumbnail_bellhomes_haiphong_c0d7a04386",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 245,
                height: 148,
                size: 11.18,
                url: "/uploads/thumbnail_bellhomes_haiphong_c0d7a04386.jpg",
              },
            },
            hash: "bellhomes_haiphong_c0d7a04386",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 23.96,
            url: "/uploads/bellhomes_haiphong_c0d7a04386.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T09:35:44.981Z",
            updatedAt: "2022-10-06T09:35:44.981Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AKLe/7Lm/8vy/9X3/+r//+3//83v/6fV+6nh/5nU+ADFys7U0Mq/wLLGu63Ctqe1qZy/sZ7Gvbl4fm8/TyUANi0ATj8jRzkXY1JDYkgzcVlLw7qvx8W2aGFGBAUAADAvGzo7Gj1CA1VOQHVlUH9sXr22rHF9W3t3X0M9JABENzthUlVTSEdgWk1tcVhwWVCLdG95eWN8d1pfTT4ARjg5PS8waVtefnBwmo+IpZuRyca6x8e429fN7N/dimteiYxPggYAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 143,
    attributes: {
      Name: "B13-2 VSIP Hai Phong",
      createdAt: "2022-10-06T09:56:39.769Z",
      updatedAt: "2022-10-07T09:53:49.206Z",
      publishedAt: "2022-10-06T09:56:39.767Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "Bridge VSIP Hai Phong Co., Ltd",
      Function: "",
      LandArea: "0",
      GFA: "0",
      InvesmentCapital: "",
      Image: {
        data: {
          id: 42,
          attributes: {
            name: "b13-2-visip-haiphong-bridge.jpg",
            alternativeText: "b13-2-visip-haiphong-bridge.jpg",
            caption: "b13-2-visip-haiphong-bridge.jpg",
            width: 378,
            height: 228,
            formats: {
              thumbnail: {
                name: "thumbnail_b13-2-visip-haiphong-bridge.jpg",
                hash: "thumbnail_b13_2_visip_haiphong_bridge_ed2d5b7194",
                ext: ".jpg",
                mime: "image/jpeg",
                path: null,
                width: 245,
                height: 148,
                size: 5.76,
                url: "/uploads/thumbnail_b13_2_visip_haiphong_bridge_ed2d5b7194.jpg",
              },
            },
            hash: "b13_2_visip_haiphong_bridge_ed2d5b7194",
            ext: ".jpg",
            mime: "image/jpeg",
            size: 11.1,
            url: "/uploads/b13_2_visip_haiphong_bridge_ed2d5b7194.jpg",
            previewUrl: null,
            provider: "local",
            provider_metadata: null,
            createdAt: "2022-10-06T09:34:39.529Z",
            updatedAt: "2022-10-06T09:34:39.529Z",
            placeholder:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAIAAAB1kpiRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAxUlEQVQImQG6AEX/AOP0/+76/87n/zOP+RqG8ySK9hqG8ySG8mef9l2b8gDV6v+z2P+Fvv9mr/9Spf9Zq/9xtf+fyv/K5v+Yx/8APFNhj7Thm8Dtp8rysNn/uuD/x9z5xtz2x9z62Of3ABIgIF12kneFkXF5eG51bmtwaV1jX4iHf//w4P/+9QA4REojOUoOKz8aLjscKy4sNSgpKhRDOx6eg2i2n5QAJykfHh4PFxMAAQIACQoAEBACFhYMHR0TNy4gSy0ZLFhdS7qUrlEAAAAASUVORK5CYII=",
          },
        },
      },
    },
  },
  {
    id: 144,
    attributes: {
      Name: "CENTA CITY Hai Phong",
      createdAt: "2022-10-06T09:56:39.795Z",
      updatedAt: "2022-10-06T09:56:39.795Z",
      publishedAt: "2022-10-06T09:56:39.792Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "VIETNHANHP., JSC",
      Function: "",
      LandArea: "0",
      GFA: "0",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 145,
    attributes: {
      Name: "CENTA CITY Bac Ninh",
      createdAt: "2022-10-06T09:56:39.820Z",
      updatedAt: "2022-10-06T09:56:39.820Z",
      publishedAt: "2022-10-06T09:56:39.816Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: true,
      IsIndustrialEstateManagement: false,
      Investor: "BWID BN CO.,LTD",
      Function: "",
      LandArea: "38000",
      GFA: "22880",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 146,
    attributes: {
      Name: "BWID Hai Duong Lot 5-Divergence 1 ",
      createdAt: "2022-10-06T09:56:39.844Z",
      updatedAt: "2022-10-07T10:00:13.370Z",
      publishedAt: "2022-10-06T09:56:39.842Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BW HD CO.,LTD",
      Function: "",
      LandArea: "43550",
      GFA: "25129",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 147,
    attributes: {
      Name: "Tan Phu Trung 1 ",
      createdAt: "2022-10-06T09:56:39.871Z",
      updatedAt: "2022-10-06T09:56:39.871Z",
      publishedAt: "2022-10-06T09:56:39.868Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BW SAI GON LIMITED LIABILITY COMPANY",
      Function: "",
      LandArea: "87961",
      GFA: "53235",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 148,
    attributes: {
      Name: "Tan Phu Trung 3",
      createdAt: "2022-10-06T09:56:40.092Z",
      updatedAt: "2022-10-06T09:56:40.092Z",
      publishedAt: "2022-10-06T09:56:40.078Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "SAIGON LID CO.,LTD",
      Function: "",
      LandArea: "98001",
      GFA: "93826",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 149,
    attributes: {
      Name: "Tan Phu Trung 4",
      createdAt: "2022-10-06T09:56:40.137Z",
      updatedAt: "2022-10-06T09:56:40.137Z",
      publishedAt: "2022-10-06T09:56:40.129Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "SAIGON LID CO.,LTD",
      Function: "",
      LandArea: "59193",
      GFA: "24412",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 150,
    attributes: {
      Name: "Gemadept",
      createdAt: "2022-10-06T09:56:40.233Z",
      updatedAt: "2022-10-06T09:56:40.233Z",
      publishedAt: "2022-10-06T09:56:40.224Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "SONG THAN LID JSC",
      Function: "",
      LandArea: "52580",
      GFA: "35690",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 151,
    attributes: {
      Name: "VSIP IIA ",
      createdAt: "2022-10-06T09:56:40.262Z",
      updatedAt: "2022-10-06T09:56:40.262Z",
      publishedAt: "2022-10-06T09:56:40.260Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BWID LOGISTICS TAN UYEN CO.,LTD",
      Function: "",
      LandArea: "80768",
      GFA: "43147",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 152,
    attributes: {
      Name: "BWID Thoi Hoa ",
      createdAt: "2022-10-06T09:56:40.291Z",
      updatedAt: "2022-10-06T09:56:40.291Z",
      publishedAt: "2022-10-06T09:56:40.288Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BWID THOI HOA CO.,LTD",
      Function: "",
      LandArea: "380000",
      GFA: "227120",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 153,
    attributes: {
      Name: "DEEP C1 (Nam Dinh Vu)",
      createdAt: "2022-10-06T09:56:40.317Z",
      updatedAt: "2022-10-06T09:56:40.317Z",
      publishedAt: "2022-10-06T09:56:40.315Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BWID DINH VU CO.,LTD",
      Function: "",
      LandArea: "67318",
      GFA: "35232",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 154,
    attributes: {
      Name: "BWID Bau Bang Phase 1, 2, 3, 4, 5, 6, 7 ",
      createdAt: "2022-10-06T09:56:40.346Z",
      updatedAt: "2022-10-06T09:56:40.346Z",
      publishedAt: "2022-10-06T09:56:40.343Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "450000",
      GFA: "224737",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 155,
    attributes: {
      Name: "BWID My Phuoc III Phase 1, C13, 2, 3, 4, 5, 6",
      createdAt: "2022-10-06T09:56:40.376Z",
      updatedAt: "2022-10-06T09:56:40.376Z",
      publishedAt: "2022-10-06T09:56:40.372Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BW INDUSTRIAL DEVELOPMENT JSC",
      Function: "",
      LandArea: "240000",
      GFA: "146310",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
  {
    id: 156,
    attributes: {
      Name: "BW Supply Chain City ",
      createdAt: "2022-10-06T09:56:40.404Z",
      updatedAt: "2022-10-07T09:59:38.680Z",
      publishedAt: "2022-10-06T09:56:40.401Z",
      IsPlanningAndDesign: false,
      IsPermitting: false,
      IsProjectAndConstructionManagement: false,
      IsIndustrialEstateManagement: true,
      Investor: "BW SCC CO.,LTD",
      Function: "",
      LandArea: "350000",
      GFA: "146000",
      InvesmentCapital: "",
      Image: {
        data: null,
      },
    },
  },
];
const fetchContent = (apiId, locale) => {
  return cmsAPI.get(`/${apiId}`, {
    params: {
      locale,
      populate: "*",
    },
  });
};

const fetchFooter = async (locale) => {
  try {
    const response = await fetchContent("footer", locale);

    const responseData = response.data?.data?.attributes;

    const data = {
      ...DEFAULT_FOOTER_DATA,
      ...responseData,
      Navigation: {
        ...DEFAULT_FOOTER_DATA.Navigation,
        ...responseData.Navigation,
      },
    };

    return data;
  } catch (error) {
    console.log(error);
    return DEFAULT_FOOTER_DATA;
  }
};

const fetchHeader = async (locale) => {
  try {
    const response = await fetchContent("header", locale);

    const responseData = response.data?.data?.attributes;

    const data = {
      ...DEFAULT_HEADER_DATA,
      ...responseData,
      Navigation: {
        ...DEFAULT_HEADER_DATA.Navigation,
        ...responseData.Navigation,
      },
    };

    return data;
  } catch (error) {
    console.log(error);
    return DEFAULT_HEADER_DATA;
  }
};

const fetchHomepage = async (locale) => {
  try {
    const response = await cmsAPI.get(`/homepage`, {
      params: {
        locale,
        populate: "deep",
      },
    });

    const responseData = response.data?.data?.attributes;
    const data = {
      ...responseData,
      HomeBanner: {
        ...responseData.HomeBanner,
        BackgroundImage: {
          url: getMediaURL(responseData.HomeBanner?.BackgroundImage.data?.attributes.url),
        },
        DefaultSlideImage: {
          url: getMediaURL(responseData.HomeBanner?.DefaultSlideImage.data?.attributes.url),
        },
        HomeBannerServiceSliders: responseData.HomeBanner?.HomeBannerServiceSliders.map(
          (slide) => ({
            ...slide,
            ImageURL: {
              url: getMediaURL(slide.ImageURL.data.attributes.url),
              name: slide.ImageURL.data.attributes.name,
            },
          })
        ),
      },
      CompanyOverview: {
        ...responseData?.CompanyOverview,
        Image: {
          url: getMediaURL(responseData?.CompanyOverview.Image.data.attributes.url),
        },
      },
      HomeOurTeam: {
        ...responseData?.HomeOurTeam,
        Image: {
          url: getMediaURL(responseData?.HomeOurTeam.Image.data.attributes.url),
        },
      },
      HomePartnerCustomer: {
        Header: responseData.HomePartnerCustomer.Header,
        CustomersPartnersList: responseData.HomePartnerCustomer.CustomersPartnersList.data.map(
          (p) => ({
            imageUrl: getMediaURL(p.attributes.url),
          })
        ),
      },
    };
    console.log("1", data.HomePartnerCustomer.CustomersPartnersList);
    data.Seo.MetaImage.url = getMediaURL(data.Seo.MetaImage.url);

    return data;
  } catch (error) {
    return DEFAULT_HOMEPAGE_DATA;
  }
};

const fetchServicePage = async (locale) => {
  try {
    const response = await cmsAPI.get(`/service-page`, {
      params: {
        locale,
        populate: "deep",
      },
    });

    const responseData = response.data?.data?.attributes;

    responseData.ServiceBanner.BackgroundImage.url = getMediaURL(
      responseData.ServiceBanner.BackgroundImage.data.attributes.url
    );

    responseData.PlanningAndDesign.SliderItems = responseData.PlanningAndDesign.SliderItems.map(
      (item) => ({
        ...item,
        Image: {
          // ...item.Image,
          url: getMediaURL(item.Image.data?.attributes.url),
        },
      })
    );

    responseData.Permitting.Content.Image.url = getMediaURL(
      responseData.Permitting.Content.Image.data.attributes.url
    );

    responseData.ProjectAndConstructionManagement.SliderItems =
      responseData.PlanningAndDesign.SliderItems.map((item) => ({
        ...item,
        Image: {
          // ...item.Image,
          url: getMediaURL(item.Image.data?.attributes.url),
        },
      }));

    responseData.IndustrialEstateManagement.Content.Image.url = getMediaURL(
      responseData.IndustrialEstateManagement.Content.Image.data.attributes.url
    );
    responseData.Seo.MetaImage.url = getMediaURL(responseData.Seo.MetaImage.url);
    console.log("1", responseData);
    return responseData;
  } catch (error) {
    return DEFAUL_SERVICEPAGE_DATA;
  }
};

const fetchPortfoliPage = async (locale) => {
  try {
    const response = await cmsAPI.get(`/portfolio-page`, {
      params: {
        locale,
        populate: "deep",
      },
    });

    const responseData = response.data?.data?.attributes;
    // console.log(responseData.PortfolioBanner.BackgroundImage);
    // console.log(responseData.PortfolioProjectAndConstructionManagement.CertificateImage);
    responseData.PortfolioBanner.BackgroundImage = {
      url: getMediaURL(responseData.PortfolioBanner.BackgroundImage.data.attributes.url),
    };
    responseData.PortfolioProjectAndConstructionManagement.CertificateImage = {
      url: getMediaURL(
        responseData.PortfolioProjectAndConstructionManagement.CertificateImage.data.attributes.url
      ),
    };
    responseData.Seo.MetaImage.url = getMediaURL(responseData.Seo.MetaImage.url);
    return responseData;
  } catch (error) {
    // console.log("return default");
    console.error(error);
    return DEFAULT_PORTFOLIOPAGE_DATA;
  }
};

const fetchProjects = async () => {
  try {
    const response = await cmsAPI.get(`/projects`, {
      params: {
        populate: "deep",
        pagination: {
          start: 0,
          limit: 1000,
        },
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error);

    return DEFAULT_PROJECTS;
  }
};
const createProject = async (project) => {
  try {
    let a = await cmsAPI.post(`/projects`, {
      data: {
        ...project,
        GFA: Math.round(parseFloat(project.GFA) * 1000),
        LandArea: Math.round(parseFloat(project.LandArea) * 1000),
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export {
  fetchFooter,
  fetchHeader,
  fetchHomepage,
  fetchServicePage,
  createProject,
  fetchPortfoliPage,
  fetchProjects,
};
