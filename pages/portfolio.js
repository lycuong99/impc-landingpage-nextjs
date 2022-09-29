import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Footer from "../components/Footer";
import styles from "../styles/portfolio.module.scss";
import pagePilingStyles from "../styles/page-piling.module.scss";
import cn from "classnames";
import Header from "../components/Header";
import gsap, { Power1, Power2, Sine } from "gsap";
import screenTracking from "../lib/screen-tracking";
import { initPagepiling, scrollTo } from "../lib/page-piling";
import Link from "next/link";
import headerStyles from "../components/header.module.scss";
import GlobalContext from "../contexts/GlobalContext";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { TransitionContext } from "../components/PageLoader";

//#region

// import img_toancau from "/assets/images/portfolio/toancau-warehouse.png";
// import img_sg from "/assets/images/portfolio/saigon-glass.jpg";
// import img_hiive_hotel from "/assets/images/portfolio/hiive-hotel.png";
// import img_bacninh from "/assets/images/portfolio/bwid-bacninh.jpg";

// import img_b13 from "/assets/images/portfolio/b13-2-visip-haiphong-bridge.jpg";
// import img_bellhomes_hp from "/assets/images/portfolio/bellhomes-haiphong.jpg";
// import img_bw_baubang_06 from "/assets/images/portfolio/bw-baubang-06.jpg";
// import img_bw_nhontrach2_a from "/assets/images/portfolio/bw-nhontrach2-a.jpg";
// import img_bw_nhontrach2_bc from "/assets/images/portfolio/bw-nhontrach2-bc.jpg";
// import img_bw_supplychain from "/assets/images/portfolio/bw-suppychain-city.jpg";
// import img_baubang_p1 from "/assets/images/portfolio/bwid-baubang-p1.jpg";
// import img_baubang_p2 from "/assets/images/portfolio/bwid-baubang-p2.jpg";
// import img_baubang_p67 from "/assets/images/portfolio/bwid-baubang-p67.jpg";
// import img_baubang_p345 from "/assets/images/portfolio/bwid-baubang-p345.jpg";
// import img_baubang_p1To7 from "/assets/images/portfolio/bwid-baubang-phase1to7.jpg";

// import img_bwid_haiduong_d1 from "/assets/images/portfolio/bwid-haiduong-d1.jpg";
// import img_bwid_haiduong_l2 from "/assets/images/portfolio/bwid-haiduong-lot2.jpg";
// import img_bwid_haiduong_l2_d5 from "/assets/images/portfolio/bwid-haiduong-lot5-d2.png";
// import img_bwid_haiduong_l6 from "/assets/images/portfolio/bwid-haiduong-lot6.png";
// import img_bwid_haiduong_l7 from "/assets/images/portfolio/bwid-haiduong-lot7.jpg";

// import img_bwid_haiphong_l11a from "/assets/images/portfolio/bwid-haiphong-lot11A.jpg";
// import img_bwid_haiphong_l11b from "/assets/images/portfolio/bwid-haiphong-lot11b.jpg";

// import img_bwid_myphuoc3 from "/assets/images/portfolio/bwid-myphuoc3.jpg";
// import img_bwid_myphuoc3_p1 from "/assets/images/portfolio/bwid-myphuoc3-p1.jpg";
// import img_bwid_myphuoc3_p2 from "/assets/images/portfolio/bwid-myphuoc3-p2.jpg";
// import img_bwid_myphuoc3_p3 from "/assets/images/portfolio/bwid-myphuoc3-p3.jpg";
// import img_bwid_myphuoc3_p456 from "/assets/images/portfolio/bwid-myphuoc3-p456.jpg";

// import img_bwid_thoihoa_lota3 from "/assets/images/portfolio/bwid-thoihoa-lota3.jpg";
// import img_bwid_thoihoa_lota4 from "/assets/images/portfolio/bwid-thoihoa-lota4.jpg";

// import img_c_r_area_p1a from "/assets/images/portfolio/c-r-area-p1a.jpg";

// import img_centa_city_bacninh from "/assets/images/portfolio/centa-city-bacninh.jpg";
// import img_centa_city_haiphong from "/assets/images/portfolio/centa-city-haiphong.jpg";

// import img_deepc2 from "/assets/images/portfolio/deepc2-namdinhvu.jpg";

// import img_gemadept from "/assets/images/portfolio/gemadept.jpg";
// import img_logos_visip_bacninh1 from "/assets/images/portfolio/logos_visip_bacninh1.jpg";
// import img_package1_2_p2 from "/assets/images/portfolio/package1_2_p2.jpg";
// import img_tanphutrung_1 from "/assets/images/portfolio/tanphutrung_1.jpg";
// import img_tanphutrung_3 from "/assets/images/portfolio/tanphutrung_3.jpg";
// import img_tanphutrung_4 from "/assets/images/portfolio/tanphutrung_4.jpg";
// import img_vsip_iia from "/assets/images/portfolio/vsip_iia.jpg";

//#endregion

class WorkContentField {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class Work {
  constructor(header, details, imgSrc = null) {
    this.header = header;
    this.details = details;
    this.imgSrc = imgSrc;
  }
}

const THE_INVESTOR_TEXT = "The Investor";
const FUNCTIONS_TEXT = "Functions";
const LAND_AREA_TEXT = "Land Area(sqm)";
const INVESTMENT_CAPITAL_TEXT = "Invesment Capital";
const SCALE_TEXT = "Scale";
const SCOPE_TEXT = "Scope";
const GFA_TEXT = "GFA(m2)";

// STATE
// const workDatas = {
//   planning: {
//     id: 0,
//     title: "Planning and design",
//     works: [
//       new Work(
//         "Toan Cau Warehouse",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "GLOBAL LOGISTICS SERVICE & INVESTMENTS JSC"),
//           new WorkContentField(FUNCTIONS_TEXT, "Ready Built Warehouse"),
//         ],
//         img_toancau
//       ),
//       new Work(
//         "Saigon Glass Company",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "SAIGON INTERNAL CO.,LTD"),
//           new WorkContentField(FUNCTIONS_TEXT, "Ready Built Warehouse"),
//         ],
//         img_sg
//       ),
//       new Work(
//         "Hiive Hotel",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "LODGIS HOSPITALITY HOLDINGS PTE. LTD"),
//           new WorkContentField(FUNCTIONS_TEXT, "Hotel"),
//         ],
//         img_hiive_hotel
//       ),
//       new Work("Infrastructure for C&R Phase 2 & 3", [
//         new WorkContentField(THE_INVESTOR_TEXT, "VSIP NGHE AN CO., LTD."),
//         new WorkContentField(FUNCTIONS_TEXT, "Infrastructure"),
//       ]),
//       new Work(
//         "BWID Hai Duong Lot 5-Divergence 1",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//           new WorkContentField(FUNCTIONS_TEXT, "Ready Built Factory"),
//         ],
//         img_bwid_haiduong_d1
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*A",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//           new WorkContentField(FUNCTIONS_TEXT, "Ready Built Warehouse"),
//         ],
//         img_bwid_haiphong_l11a
//       ),
//       new Work(
//         "BWID Bac Ninh",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID Bac Ninh"),
//           new WorkContentField(FUNCTIONS_TEXT, "Ready Built Factory"),
//         ],
//         img_bacninh
//       ),
//     ],
//   },

//   permitting: {
//     id: 1,
//     title: "PERMITTING",
//     works: [
//       new Work(
//         "BWID Thoi Hoa Lot A3",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID THOI HOA CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "162.619,2"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$570 Bil"),
//         ],
//         img_bwid_thoihoa_lota3
//       ),
//       new Work(
//         "BWID Thoi Hoa Lot A4",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID TH - PROJECT 02 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "114.554"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$737 Bil"),
//         ],
//         img_bwid_thoihoa_lota4
//       ),
//       new Work(
//         "Toan Cau Warehouse",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "GLOBAL LOGISTICS SERVICE & INVESTMENTS JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "5.358,5"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$14 Bil"),
//         ],
//         img_toancau
//       ),

//       new Work(
//         "Saigon Glass Company",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "SAIGON INTERNAL CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "30.000"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$75 Bil"),
//         ],
//         img_sg
//       ),
//       new Work(
//         "Hiive Hotel",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "LODGIS HOSPITALITY HOLDINGS PTE. LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "12.292"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, ""),
//         ],
//         img_hiive_hotel
//       ),
//       new Work(
//         "BW Nhon Trach 2 (Lot Bc)",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID NT CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "130.864 "),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$1.020 Bil"),
//         ],
//         img_bw_nhontrach2_bc
//       ),

//       new Work(
//         "BW Nhon Trach 2 (Lot A)",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID NT - PROJECT 2 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "85.000"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$913 Bil"),
//         ],
//         img_bw_nhontrach2_a
//       ),
//       new Work(
//         "BW Bau Bang 06",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID BAU BANG - BB06 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "457.396"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$19.308 Bil"),
//         ],
//         img_bw_baubang_06
//       ),
//       new Work("BW Nghe An (Lot E2-02 & Lot 34-35)", [
//         new WorkContentField(THE_INVESTOR_TEXT, "BCI JSC"),
//         new WorkContentField(LAND_AREA_TEXT, "145.524"),
//         new WorkContentField(INVESTMENT_CAPITAL_TEXT, "771.000.000.000 VND"),
//       ]),

//       new Work("BW Tan Hiep", [
//         new WorkContentField(THE_INVESTOR_TEXT, "DELIWAY VN., JSC"),
//         new WorkContentField(LAND_AREA_TEXT, "644.034"),
//         new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$31,136 Bil"),
//       ]),
//       new Work(
//         "BWID Hai Duong Lot 5 - Divergence 1",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "82.140"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$960 Bil "),
//         ],
//         img_bwid_haiduong_d1
//       ),
//       new Work(
//         "BWID Hai Duong Lot 5 - Divergence 2",
//         [new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD")],
//         img_bwid_haiduong_l2_d5
//       ),

//       new Work("BWID Hai Duong Lot 3", [
//         new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//         new WorkContentField(LAND_AREA_TEXT, "146.052"),
//         new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$42,324 Bil"),
//       ]),
//       new Work("BWID Hai Duong Lot 2", [
//         new WorkContentField(THE_INVESTOR_TEXT, "BWID HD - PROJECT 2 CO.,LTD"),
//         new WorkContentField(LAND_AREA_TEXT, "39.485"),
//         new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$978 Bil"),
//       ]),
//       new Work(
//         "BWID Hai Duong Lot 6",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID HD - PROJECT 2 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "109.331"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$978 Bil"),
//         ],
//         img_bwid_haiduong_l6
//       ),

//       new Work(
//         "BWID Hai Duong Lot 7",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID HD 03 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "131.023"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$32,209 Bil"),
//         ],
//         img_bwid_haiduong_l7
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*A",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HP CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "19.845"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$125 Bil"),
//         ],
//         img_bwid_haiphong_l11a
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*B",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HP CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "17.390,12"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$356 Bil"),
//         ],
//         img_bwid_haiphong_l11b
//       ),

//       new Work(
//         "DEEP C2 (Nam Dinh Vu- Cat Hai)",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID LOGISTICS HAI AN CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "96.137"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$19,896 Bil"),
//         ],
//         img_deepc2
//       ),
//       new Work(
//         "LOGOS VSIP BAC NINH 1 LOGISTICS PARK",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "LOGOS VIETNAM BN 1 LLC"),
//           new WorkContentField(LAND_AREA_TEXT, "133.838"),
//           new WorkContentField(INVESTMENT_CAPITAL_TEXT, "$612 Bil"),
//         ],
//         img_logos_visip_bacninh1
//       ),
//     ],
//   },

//   project: {
//     id: 2,
//     title: "PROJECT AND CONSTRUCTION MANAGEMENT",
//     works: [
//       new Work(
//         "BWID Bau Bang Phase 1",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "450.000"),
//           new WorkContentField(GFA_TEXT, "7.560"),
//         ],
//         img_baubang_p1
//       ),
//       new Work(
//         "BWID Bau Bang Phase 2",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "450.000"),
//           new WorkContentField(GFA_TEXT, "36.000"),
//         ],
//         img_baubang_p2
//       ),
//       new Work(
//         "BWID Bau Bang Phase 3, 4, 5",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "450.000"),
//           new WorkContentField(GFA_TEXT, "94.669"),
//         ],
//         img_baubang_p345
//       ),
//       new Work(
//         "BWID Bau Bang Phase 6, 7",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "450.000"),
//           new WorkContentField(GFA_TEXT, "59.508"),
//         ],
//         img_baubang_p67
//       ),
//       new Work(
//         "BWID My Phuoc III Phase 1",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "240.000"),
//           new WorkContentField(GFA_TEXT, "29.657"),
//         ],
//         img_bwid_myphuoc3_p1
//       ),
//       new Work(
//         "BWID My Phuoc III Phase 2",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "240.000"),
//           new WorkContentField(GFA_TEXT, "13.5"),
//         ],
//         img_bwid_myphuoc3_p2
//       ),
//       new Work(
//         "BWID My Phuoc III Phase 3",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "240.000"),
//           new WorkContentField(GFA_TEXT, "28.336"),
//         ],
//         img_bwid_myphuoc3_p3
//       ),
//       new Work(
//         "BWID My Phuoc III Phase 4, 5, 6",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "240.000"),
//           new WorkContentField(GFA_TEXT, "74.817"),
//         ],
//         img_bwid_myphuoc3_p456
//       ),
//       new Work(
//         "Toan Cau Warehouse",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "GLOBAL LOGISTICS SERVICE & INVESTMENTS JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "3.200"),
//           new WorkContentField(GFA_TEXT, "5.358,5 "),
//         ],
//         img_toancau
//       ),
//       new Work(
//         "Package 1.2 Phase 2 (Open Canal stage 2&5)",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "VSIP Nghe An CO., LTD. "),
//           new WorkContentField(LAND_AREA_TEXT, "15.32ha"),
//         ],
//         img_package1_2_p2
//       ),
//       new Work(
//         "C&R area - Phase 1A",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "VSIP Quang Ngai CO., LTD."),
//           new WorkContentField(LAND_AREA_TEXT, "12.3 ha"),
//         ],
//         img_c_r_area_p1a
//       ),
//       new Work(
//         "BWID Hai Duong Lot 5 - Divergence 1",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "43.550"),
//           new WorkContentField(GFA_TEXT, "25.129"),
//         ],
//         img_bwid_haiduong_d1
//       ),
//       new Work(
//         "BWID Hai Duong Lot 5 - Divergence 2",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "38.590"),
//           new WorkContentField(GFA_TEXT, "21.330"),
//         ],
//         img_bwid_haiduong_l2_d5
//       ),
//       new Work(
//         "BWID Hai Duong Lot 2",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID HD - PROJECT 2 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "39.485"),
//           new WorkContentField(GFA_TEXT, "21.182"),
//         ],
//         img_bwid_haiduong_l2
//       ),
//       new Work(
//         "BWID Hai Duong Lot 6",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID HD - PROJECT 2 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "109.333"),
//           new WorkContentField(GFA_TEXT, "60.318"),
//         ],
//         img_bwid_haiduong_l6
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*A",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HP CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "32.829"),
//           new WorkContentField(GFA_TEXT, "20.055"),
//         ],
//         img_bwid_haiphong_l11a
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*B",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HP CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "26.442"),
//           new WorkContentField(GFA_TEXT, "16.272"),
//         ],
//         img_bwid_haiphong_l11b
//       ),
//       new Work(
//         "BELHOMES Hai Phong",
//         [new WorkContentField(THE_INVESTOR_TEXT, "VSIP HAI PHONG CO., LTD")],
//         img_bellhomes_hp
//       ),
//       new Work(
//         "B13-2 VSIP Hai Phong",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "Bridge VSIP Hai Phong Co., Ltd"),
//           new WorkContentField(SCOPE_TEXT, "Bridge and road"),
//         ],
//         img_b13
//       ),
//       new Work(
//         "CENTA CITY Hai Phong",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "VIETNHANHP., JSC"),
//           new WorkContentField(SCALE_TEXT, "360 shop houses"),
//         ],
//         img_centa_city_haiphong
//       ),
//       new Work(
//         "BWID Bac Ninh",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID BN CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "38.000 "),
//           new WorkContentField(GFA_TEXT, "22.880"),
//         ],
//         img_bacninh
//       ),
//       new Work(
//         "CENTA CITY Bac Ninh",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID BN CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "38.000 "),
//           new WorkContentField(GFA_TEXT, "22.880"),
//         ],
//         img_centa_city_bacninh
//       ),
//     ],
//   },

//   industrial: {
//     id: 3,
//     title: "INDUSTRIAL ESTATE MANAGEMENT",
//     works: [
//       new Work(
//         "BWID Hai Duong Lot 5-Divergence 1 ",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HD CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "43.550"),
//           new WorkContentField(GFA_TEXT, "25.129"),
//         ],
//         img_bwid_haiduong_d1
//       ),
//       new Work(
//         "BWID Hai Duong Lot 2",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID HD-PROJECT 2 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "39.485"),
//           new WorkContentField(GFA_TEXT, "21.182"),
//         ],
//         img_bwid_haiduong_l2
//       ),
//       new Work(
//         "BWID Hai Duong Lot 6",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID HD-PROJECT 2 CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "109.333"),
//           new WorkContentField(GFA_TEXT, "60.318"),
//         ],
//         img_bwid_haiduong_l6
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*A",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HP CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "32.829"),
//           new WorkContentField(GFA_TEXT, "20.055"),
//         ],
//         img_bwid_haiphong_l11a
//       ),
//       new Work(
//         "BWID Hai Phong Lot 11*B",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW HP CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "26.442"),
//           new WorkContentField(GFA_TEXT, "16.272"),
//         ],
//         img_bwid_haiphong_l11b
//       ),
//       new Work(
//         "BWID Bac Ninh",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID BN CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "38.000"),
//           new WorkContentField(GFA_TEXT, "22.880"),
//         ],
//         img_bacninh
//       ),
//       new Work(
//         "Tan Phu Trung 1 ",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW SAI GON LIMITED LIABILITY COMPANY"),
//           new WorkContentField(LAND_AREA_TEXT, "87.961"),
//           new WorkContentField(GFA_TEXT, "53.235"),
//         ],
//         img_tanphutrung_1
//       ),
//       new Work(
//         "Tan Phu Trung 3",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "SAIGON LID CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "98.001"),
//           new WorkContentField(GFA_TEXT, "93.826"),
//         ],
//         img_tanphutrung_3
//       ),
//       new Work(
//         "Tan Phu Trung 4",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "SAIGON LID CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "59.193"),
//           new WorkContentField(GFA_TEXT, "24.412"),
//         ],
//         img_tanphutrung_4
//       ),
//       new Work(
//         "Gemadept",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "SONG THAN LID JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "52.580"),
//           new WorkContentField(GFA_TEXT, "35.690"),
//         ],
//         img_gemadept
//       ),
//       new Work(
//         "VSIP IIA ",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID LOGISTICS TAN UYEN CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "80.768"),
//           new WorkContentField(GFA_TEXT, "43.147"),
//         ],
//         img_vsip_iia
//       ),
//       new Work(
//         "BWID Thoi Hoa ",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID THOI HOA CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "380.000"),
//           new WorkContentField(GFA_TEXT, "227.120,4"),
//         ],
//         img_bwid_thoihoa_lota3
//       ),
//       new Work(
//         "DEEP C1 (Nam Dinh Vu)",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BWID DINH VU CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "67.318"),
//           new WorkContentField(GFA_TEXT, "35.232"),
//         ],
//         img_deepc2
//       ),
//       new Work(
//         "BWID Bau Bang Phase 1, 2, 3, 4, 5, 6, 7 ",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "450.000"),
//           new WorkContentField(GFA_TEXT, "224.737"),
//         ],
//         img_baubang_p1To7
//       ),
//       new Work(
//         "BWID My Phuoc III Phase 1, C13, 2, 3, 4, 5, 6",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW INDUSTRIAL DEVELOPMENT JSC"),
//           new WorkContentField(LAND_AREA_TEXT, "240.000"),
//           new WorkContentField(GFA_TEXT, "146.310"),
//         ],
//         img_bwid_myphuoc3
//       ),
//       new Work(
//         "BW Supply Chain City ",
//         [
//           new WorkContentField(THE_INVESTOR_TEXT, "BW SCC CO.,LTD"),
//           new WorkContentField(LAND_AREA_TEXT, "350.000"),
//           new WorkContentField(GFA_TEXT, "146.000"),
//         ],
//         img_bw_supplychain
//       ),
//     ],
//   },
// };

const getWork = (serviceId) => {
  switch (parseInt(serviceId)) {
    case 0:
      return workDatas.planning;
    case 1:
      return workDatas.permitting;
    case 2:
      return workDatas.project;
    case 3:
      return workDatas.industrial;
    default:
      return null;
  }
};

const services = [
  {
    key: "planning",
    title: "Planning & Design",
    workTitle: "Planning and Design",
  },
  { key: "permitting", title: "Permitting", workTitle: "permitting" },
  {
    key: "project",
    title: "Project & Construction Management",
    workTitle: "Project and Construction Management",
  },
  {
    key: "industrial",
    title: "Industrial Estate Management",
    workTitle: "Industrial Estate Management",
  },
];

export default function PortfolioPage() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isDropdownExpand, setDropdownExpand] = useState(true);
  const { pageTransitionTimeline } = useContext(TransitionContext);

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

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
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
        <main>
          <section className="banner">
            <div className="banner__background">
              <img
                className="lazy-img"
                // src="/assets/images/portfolio/porfolio-banner-bg_lazy.webp"
                src="/assets/images/portfolio/porfolio-banner-bg.webp"
                alt="Banner background"
              />
            </div>
            <h1>
              <div className="line">
                <span>PORTFOLIO</span>
              </div>
            </h1>
            <div className="middle-line"></div>
            <div className="subheader1">
              <div className="line">
                <span>Our experiences define our identity</span>
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
                <div
                  className={`tab-content planning ${
                    selectedService.key === "planning" ? "active" : ""
                  }`}
                  data-tab-id="0"
                >
                  <h2>GENERAL INFORMATION</h2>
                  <div className="list-infomation-wrapper">
                    <div className="list-information row">
                      <h4> Planning services include: </h4>
                      <ul>
                        <li>1/2000 planning </li>
                        <li>1/500 planning</li>
                      </ul>
                    </div>
                    <div className="list-information row row--last">
                      <h4>Design services include: </h4>
                      <ul>
                        <li>Concept </li>
                        <li>Architecture </li>
                        <li>Infrastructure </li>
                        <li>MEP</li>
                        <li>Fire protection</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-content permitting ${
                    selectedService.key === "permitting" ? "active" : ""
                  }`}
                  data-tab-id="1"
                >
                  <h2>GENERAL INFORMATION</h2>
                  <div>
                    <h4> Permitting services include: </h4>
                    <ul>
                      <li className="row">Getting approval of Master plan 1/500 </li>
                      <li className="row">
                        Getting approval of Environmental impact assessment/ Environment protection
                        plan
                      </li>
                      <li className="row">Getting appraisal of Fire protection </li>
                      <li className="row">Getting appraisal of Feasibility Study Report </li>
                      <li className="row">Getting Construction permit </li>
                      <li className="row">
                        Getting approval of any as-built, completion of the construction works
                      </li>
                      <li className="row">
                        Getting Other licenses/ acceptances/ approvals as necessary for the project.
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className={`tab-content project ${
                    selectedService.key === "project" ? "active" : ""
                  }`}
                  data-tab-id="2"
                >
                  <div className="project-wrapper">
                    <h2>GENERAL INFORMATION</h2>
                    <h4 className="certificate-header">
                      IMP Practising Certificate for Building Works{" "}
                    </h4>
                    <div className="certificate-img">
                      <img
                        src="/assets/images/portfolio/certificate.webp"
                        loading="lazy"
                        alt="Certificate"
                      />
                    </div>
                    <div className="bg-top"></div>
                    <div className="bg-bot"></div>
                    <div className="chart-container">
                      <h4> The Percentage Of Employees Have Diploma </h4>

                      <img
                        src="/assets/images/portfolio/chart.svg"
                        loading="lazy"
                        alt="Circle Chart"
                      />

                      <ul className="chart-hint">
                        <li className="hint">
                          <span
                            className="hint__color"
                            style={{ backgroundColor: "var(--blue)" }}
                          ></span>
                          <span className="hint__text">Master’s Degree</span>
                        </li>
                        <li className="hint">
                          <span
                            className="hint__color"
                            style={{ backgroundColor: "var(--orange)" }}
                          ></span>
                          <span className="hint__text">Engineer’s Degree</span>
                        </li>
                        <li className="hint">
                          <span
                            className="hint__color"
                            style={{ backgroundColor: "var(--gray02)" }}
                          ></span>
                          <span className="hint__text">Other</span>
                        </li>
                      </ul>
                    </div>

                    <div className="list-information list-information--vertical services">
                      <h4> Project Management and Construction Management services include: </h4>
                      <ul>
                        <li className="row">Design Management </li>
                        <li className="row">Biding Management </li>
                        <li className="row">Construction Document Management </li>

                        <li className="row">Construction Contract Administration </li>
                        <li className="row">Postconstruction Administration </li>
                        <li className="row">Progress management </li>
                        <li className="row">Quality management </li>
                        <li className="row">Quantity management </li>
                        <li className="row">Occupational safety and construction </li>
                        <li className="row">environmental management </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-content industrial ${
                    selectedService.key === "industrial" ? "active" : ""
                  }`}
                  data-tab-id="3"
                >
                  <h2>GENERAL INFORMATION</h2>
                  <ul className="industrial__list-info">
                    <li>
                      <div className="title">19 Projects Nationwide </div>
                      <p>Provide facility management service in 17 projects nationwide </p>
                    </li>

                    <li>
                      <div className="title">1,216,875 m2 </div>
                      <p>Total manage GFA 1,216,875 m2 </p>
                    </li>

                    <li>
                      <div className="title">2,194,050 m2 </div>
                      <p>Total manage land area 2,194,050 m2</p>
                    </li>
                  </ul>

                  <div className="bottom">
                    <div className="responsibility list-information list-information--vertical">
                      <h4>
                        <div>IMPC Industrial Estate Management</div>
                        <div> Service Responsibilities</div>
                      </h4>
                      <ul className="list-style-none">
                        <li>Supervision And Management</li>
                        <li>Security </li>
                        <li>Cleaning</li>
                        <li>Landscaping</li>
                        <li>Maintenance And Repairation</li>
                        <li>On Demand</li>
                      </ul>
                    </div>
                    <div className="service-include list-information list-information--vertical">
                      <h4>
                        <div>IMPC Industrial Estate Management</div> <div>services include:</div>
                      </h4>
                      <ul>
                        <li className="row">
                          <span>
                            Manage and supervise the exploitation and usage of the Real Estate
                          </span>
                          <span>by Tenants</span>
                        </li>
                        <li className="row">Security Services </li>
                        <li className="row">Cleaning and Landscaping </li>
                        <li className="row">Maintenance and Repair </li>
                        <li className="row">Other on-demand services (if any) </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <section className="outwork">
                <div className="header">
                  <h2>OUR WORK </h2>
                  <h1 id="workHeader">PLANNING AND DESIGN</h1>
                </div>
                <div className="grid" id="workGrid">
                  {/* <!-- 1 --> */}
                  <div className="grid-item">
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
                  </div>

                  {/* <!-- 2 --> */}
                  <div className="grid-item">
                    <div className="grid-item__bg">
                      <img
                        src="/assets/images/portfolio/saigon-glass.jpg"
                        alt="Saigon Glass Company"
                        loading="lazy"
                      />
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">Saigon Glass Company</div>
                      <ul className="details">
                        <li>The Investor: SAIGON INTERNAL CO.,LTD</li>
                        <li> Functions: Ready Built Factory</li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- 3 --> */}
                  <div className="grid-item">
                    <div className="grid-item__bg">
                      <img
                        src="/assets/images/portfolio/hiive-hotel.png"
                        loading="lazy"
                        alt="Hiive Hotel"
                      />
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">Hiive Hotel</div>
                      <ul className="details">
                        <li>The Investor: LODGIS HOSPITALITY HOLDINGS PTE. LTD</li>
                        <li>Functions: Hotel</li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- 4 --> */}
                  <div className="grid-item">
                    <div className="grid-item__bg">
                      {/* <!-- <img src="/assets/images/portfolio/item-1.png" alt="" /> --> */}
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">Infrastructure for C&R Phase 2 & 3</div>
                      <ul className="details">
                        <li>The Investor: VSIP NGHE AN CO., LTD.</li>
                        <li>Functions: Infrastructure</li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- 5 --> */}
                  <div className="grid-item">
                    <div className="grid-item__bg">
                      <img
                        loading="lazy"
                        src="/assets/images/portfolio/bwid-haiduong-d1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">BWID Hai Duong Lot 5-Divergence 1</div>
                      <ul className="details">
                        <li>The Investor: BW HD CO.,LTD</li>
                        <li>Functions: Ready Built Factory</li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- 6 --> */}
                  <div className="grid-item">
                    <div className="grid-item__bg">
                      <img
                        loading="lazy"
                        src="/assets/images/portfolio/bwid-haiphong-lot11A.jpg"
                        alt=""
                      />
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">BWID Hai Phong Lot 11*A</div>
                      <ul className="details">
                        <li>The Investor: BW HD CO.,LTD</li>
                        <li>Functions: Ready Built Factory</li>
                      </ul>
                    </div>
                  </div>

                  {/* <!-- 7 --> */}
                  <div className="grid-item">
                    <div className="grid-item__bg">
                      <img loading="lazy" src="/assets/images/portfolio/bwid-bacninh.jpg" alt="" />
                    </div>
                    <div className="grid-item__content">
                      <div className="summary">BWID Bac Ninh</div>
                      <ul className="details">
                        <li>The Investor: BWID Bac Ninh</li>
                        <li>Functions: Ready Built Factory</li>
                      </ul>
                    </div>
                  </div>
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
