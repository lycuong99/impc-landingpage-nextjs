import gsap, { Power2, Power4, Back } from "gsap";

/**
 * Constants, helpers
 */
const UNACTIVE_ON_PHONE = true;
const LAPTOP = 1024;

/**
 * STATE
 */
const STATE = {
  isReadyToActiveAnimation: false,
  SECTIONS: [],
};

let touchStart = {
  x: 0,
  y: 0,
};

let touchEnd = {
  x: 0,
  y: 0,
};

let lastAnimation = 0;
let base_zIndex = 1;

const options = {
  touchSensitivity: 5,
  scrollDuration: 1,
  scrollDelay: 600,
};

// METHOD
const isMoving = () => {
  let currentTime = new Date().getTime();
  return currentTime - lastAnimation < options.scrollDelay + 700;
};

const updateLastAnimationTime = () => {
  let currentTime = new Date().getTime();
  lastAnimation = currentTime;
};

/**
 * DOM REFS
 */
//#region
let $mainContent;
let $sectionElements;
let $controllers;
let container;
//#endregion

/**
 * Manipulate DOM
 */

const deactiveAllNavigate = () => {
  $controllers.querySelectorAll(`li`).forEach(($li) => {
    $li.classList.remove("active");
  });
};

const deactiveNavigate = (index) => {
  $controllers.querySelector(`li[data-section-index="${index}"]`).classList.remove("active");
};

const activeNavigate = (index) => {
  $controllers.querySelector(`li[data-section-index="${index}"]`).classList.add("active");
};

const toggleSection = ($sectionElement) => {
  $sectionElement.classList.toggle("section--active");
};

const initNavigator = () => {
  let controllerItems = [];
  let element = null;

  for (let index = 0; index < $sectionElements.length; index++) {
    $sectionElements[index].dataset.sectionIndex = `${index}`;

    element = `<li class="navigation-text section-navigate-item ${
      $sectionElements[index].classList.contains("section--active") ? "active" : ""
    }" data-section-index="${index}">0${index + 1}</li>`;

    controllerItems += element;
  }

  $controllers.innerHTML = controllerItems;
  let navigateItems = document.querySelectorAll("#page-piling .section-navigate-item");

  // Add Event Listener
  for (let index = 0; index < $sectionElements.length; index++) {
    navigateItems[index].addEventListener("click", (e) => {
      let sectionIndex = e.target.dataset.sectionIndex;
      scrollTo(sectionIndex);
    });
  }
};

//#region SRCOLL ANIMATION

const getHandleStartAnimation = (currentSectionIndex, destSectionIndex) => () => {
  try {
    if (STATE.SECTIONS.getSection(currentSectionIndex).out) {
      STATE.SECTIONS.getSection(currentSectionIndex).out();
    }

    STATE.SECTIONS.getSection(destSectionIndex).preAnimate();
  } catch (error) {
    console.error("Lack handle start animate function", error);
  }
};

const getHandleCompleteAnimation = (destSectionIndex) => () => {
  try {
    STATE.SECTIONS.getSection(destSectionIndex).animate();
  } catch (error) {}
};

const scrollToNextSection = () => {
  let currentSection = document.querySelector("#page-piling .section--active");
  let controller = document.querySelector("#page-piling .controller");
  let nextSection = currentSection.nextSibling;

  if (nextSection === controller) return;
  if (nextSection) {
    let currentSectionIndex = parseInt(currentSection.dataset.sectionIndex);
    let destSectionIndex = currentSectionIndex + 1;

    let onStart = getHandleStartAnimation(currentSectionIndex, destSectionIndex);
    let onComplete = getHandleCompleteAnimation(destSectionIndex);

    deactiveAllNavigate();
    activeNavigate(destSectionIndex);

    currentSection.classList.toggle("section--active");
    nextSection.classList.toggle("section--active");

    // SET UP
    gsap.set(".section", { opacity: 0 });
    gsap.set(currentSection, { zIndex: base_zIndex + 1, opacity: 1 });
    gsap.set(nextSection, { zIndex: base_zIndex, y: "50vh", opacity: 1 });

    // Start
    onStart();

    gsap.to(nextSection, {
      y: "0",
      duration: options.scrollDuration,
      ease: Power2.easeInOut,
      onComplete: () => {
        gsap.set(nextSection, {
          zIndex: base_zIndex + 1,
        });

        onComplete();
      },
    });

    gsap.to(currentSection, {
      y: "-100vh",
      duration: options.scrollDuration,
      ease: Power2.easeInOut,
      onComplete: () => {
        gsap.set(currentSection, {
          zIndex: base_zIndex,
        });
      },
    });

    updateLastAnimationTime();
  }
};

const scrollToPrevSection = () => {
  let currentSection = document.querySelector("#page-piling .section--active");
  let prevSection = currentSection.previousSibling;

  if (prevSection) {
    let currentSectionIndex = parseInt(currentSection.dataset.sectionIndex);
    let destSectionIndex = currentSectionIndex - 1;
    toggleSection(currentSection);
    toggleSection(prevSection);

    deactiveAllNavigate();
    activeNavigate(destSectionIndex);

    let onStart = getHandleStartAnimation(currentSectionIndex, destSectionIndex);
    let onComplete = getHandleCompleteAnimation(destSectionIndex);

    // SET UP
    gsap.set(".section", { opacity: 0 });
    gsap.set(currentSection, { zIndex: base_zIndex, opacity: 1 });
    gsap.set(prevSection, { zIndex: base_zIndex + 1, y: "-100vh", opacity: 1 });

    // START
    onStart();

    gsap.to(prevSection, {
      y: "0",
      duration: options.scrollDuration,
      ease: Power2.easeInOut,
    });

    gsap.to(currentSection, {
      y: "50vh",
      duration: options.scrollDuration,
      ease: Power2.easeInOut,
      onComplete: onComplete,
    });

    updateLastAnimationTime();
  }
};

const scrollToNextMultipleSection = (
  currentSection,
  currentSectionIndex,
  destSection,
  destSectionIndex,
  onStart = null,
  onComplete = null
) => {
  let count = 0;
  let delta = Math.abs(currentSectionIndex - destSectionIndex);
  // SET UP CURRENT SECTION
  gsap.set(".section", { opacity: 0 });
  gsap.set(currentSection, { zIndex: delta + base_zIndex + 1, opacity: 1 });

  if (onStart) {
    onStart();
  }

  // START
  gsap.to(currentSection, {
    y: "-100vh",
    duration: options.scrollDuration,
    ease: Back.easeInOut,
  });

  while (currentSectionIndex < destSectionIndex) {
    let sectionNext = document.querySelector(
      `#page-piling .section[data-section-index="${currentSectionIndex + 1}"]`
    );

    // SET UP ANOTHER SECTION
    gsap.set(sectionNext, {
      zIndex: base_zIndex + delta - count,
      y: `${100 * (count + 1) - 50}vh`,
      opacity: 0.5,
    });

    // START
    gsap.to(sectionNext, {
      y: `${-(delta - count - 1) * 100}vh`,
      duration: options.scrollDuration * 1.5,
      ease: Back.easeInOut,
      opacity: destSectionIndex == currentSectionIndex + 1 ? 1 : 0.7,
      onComplete: () => {
        gsap.set(sectionNext, {
          zIndex: sectionNext === destSection ? base_zIndex + 1 : base_zIndex,
        });

        if (onComplete && sectionNext === destSection) {
          onComplete();
        }
      },
    });

    currentSectionIndex++;
    count++;
  }
};

const scrollToPrevMultipleSection = (
  currentSection,
  currentSectionIndex,
  destSection,
  destSectionIndex,
  onStart = null,
  onComplete = null
) => {
  let count = 0;

  // SET UP CURRENT SECTION
  gsap.set(".section", { opacity: 0, zIndex: base_zIndex });
  gsap.set(currentSection, { zIndex: base_zIndex, opacity: 1 });

  if (onStart) {
    onStart();
  }

  gsap.to(currentSection, {
    y: "100vh",
    duration: options.scrollDuration,
    ease: Power4.easeInOut,
  });

  while (currentSectionIndex > destSectionIndex) {
    let sectionPrev = document.querySelector(
      `#page-piling .section[data-section-index="${currentSectionIndex - 1}"]`
    );

    // SET UP ANOTHER SECTION
    gsap.set(sectionPrev, {
      zIndex: base_zIndex + 1 + count,
      y: `${-(100 + count * 50)}vh`,
      opacity: 0.3,
    });

    gsap.to(sectionPrev, {
      y: "0",
      duration: options.scrollDuration * (1 + count * 0.1),
      ease: Power4.easeInOut,
      opacity: destSectionIndex == currentSectionIndex - 1 ? 1 : 0.7,
      onComplete: () => {
        gsap.set(sectionPrev, {
          zIndex: sectionPrev === destSection ? base_zIndex + 1 : base_zIndex,
        });

        if (onComplete && sectionPrev === destSection) {
          onComplete();
        }
      },
    });

    currentSectionIndex--;
    count++;
  }
};

const scrollTo = (destSectionIndex) => {
  if (isMoving()) return;

  let currentSection = document.querySelector("#page-piling .section--active");
  let currentSectionIndex = parseInt(currentSection.dataset.sectionIndex);
  destSectionIndex = parseInt(destSectionIndex);

  let delta = Math.abs(currentSectionIndex - destSectionIndex);

  if (delta == 0) return;

  if (delta == 1) {
    if (currentSectionIndex < destSectionIndex) {
      scrollToNextSection();
      return;
    } else {
      scrollToPrevSection();
      return;
    }
  }

  let destSection = document.querySelector(
    `#page-piling .section[data-section-index="${destSectionIndex}"]`
  );

  currentSection.classList.toggle("section--active");
  destSection.classList.toggle("section--active");

  deactiveAllNavigate();
  activeNavigate(destSectionIndex);

  let onStart = getHandleStartAnimation(currentSectionIndex, destSectionIndex);
  let onComplete = getHandleCompleteAnimation(destSectionIndex);

  if (currentSectionIndex < destSectionIndex) {
    scrollToNextMultipleSection(
      currentSection,
      currentSectionIndex,
      destSection,
      destSectionIndex,
      onStart,
      onComplete
    );
  } else {
    scrollToPrevMultipleSection(
      currentSection,
      currentSectionIndex,
      destSection,
      destSectionIndex,
      onStart,
      onComplete
    );
  }

  updateLastAnimationTime();
};
//#endregion

const MouseWheelHandler = (e) => {
  //debounch scroll
  if (isMoving()) return;

  let value = e.wheelDelta || -e.deltaY || -e.detail;
  let delta = Math.max(-1, Math.min(1, value));

  //Check Partner Section

  if (document) {
    let $PartnerSection = document.querySelector("section.partner.section--active");

    if ($PartnerSection) {


      if (delta > 0 && $PartnerSection.scrollTop > 0) {
        return;
      }

      if (
        delta < 0 &&
        $PartnerSection.scrollTop + $PartnerSection.clientHeight < $PartnerSection.scrollHeight
      ) {
        // console.log(
        //   $PartnerSection.scrollTop > 0 &&
        //     $PartnerSection.scrollTop + $PartnerSection.clientHeight < $PartnerSection.scrollHeight
        // );
        return;
      }
    }
  }

  if (delta < 0) {
    scrollToNextSection();
  } else {
    scrollToPrevSection();
  }
};

// const handlePointerDownEvent = (e) => {
//   if (e.touches.length > 1) return;
//   touchStart.x = e.touches[0].clientX;
//   touchStart.y = e.touches[0].clientY;
//   console.log("touch down", e.touches[0].clientY);

//   container.addEventListener("touchmove", handlePointerMoveEvent);
// };

// const handlePointerMoveEvent = (e) => {
//   if (!isMoving()) {
//     touchEnd.x = e.touches[0].clientX;
//     touchEnd.y = e.touches[0].clientY;

//     if (
//       Math.abs(touchEnd.y - touchStart.y) >
//       (container.clientHeight / 100) * options.touchSensitivity
//     ) {
//       console.log("Moving");
//       if (touchEnd.y < touchStart.y) {
//         scrollNext();
//       } else {
//         scrollPrev();
//       }
//       container.removeEventListener("touchmove", handlePointerMoveEvent);
//     }
//   }
// };

const createDomRef = () => {
  $mainContent = document.getElementById("page-piling");
  $sectionElements = document.querySelectorAll("#page-piling .section");
  $controllers = document.querySelector("#page-piling .controller ul");
  container = $mainContent;
};

const initPagepiling = (sectionData) => {
  createDomRef();

  if (window.innerWidth < LAPTOP) {
    return;
  }

  gsap.set(".section--active", { zIndex: 2 });

  STATE.SECTIONS = sectionData;
  initNavigator();
  //Defines the delay to take place before being able to scroll to the next section

  if (container.addEventListener && window.innerWidth < LAPTOP) {
    container.removeEventListener("mousewheel", MouseWheelHandler);
    container.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
  }

  if (container.addEventListener && window.innerWidth > LAPTOP) {
    // IE9, Chrome, Safari, Opera
    container.addEventListener("mousewheel", MouseWheelHandler, false);
    // Firefox
    container.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

    // if (!UNACTIVE_ON_PHONE) {
    //   // Phone
    //   container.addEventListener("touchstart", handlePointerDownEvent);
    // }
  }
};

export { initPagepiling, scrollTo };
