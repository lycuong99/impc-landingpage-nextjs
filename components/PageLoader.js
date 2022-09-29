import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

const TransitionContext = createContext(null);

const pageTransitionTimeline_init = {
  afterEnter: () => {},
  beforeEnter: () => {},
};
const PageTransitionProvider = ({ children }) => {
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [preExit, setPreExitCallback] = useState(null);
  const [afterExit, setAfterExitCallback] = useState(null);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [afterEnter, setAfterEnter] = useState();
  const [pageTransitionTimeline, setPageTransitionTimeline] = useState(pageTransitionTimeline_init);

  useLayoutEffect(() => {
    console.log("update after enter", pageTransitionTimeline);
  }, [pageTransitionTimeline]);

  return (
    <TransitionContext.Provider
      value={{
        isFirstLoading,
        setFirstLoading,
        preExit,
        setPreExitCallback,
        afterExit,
        setAfterExitCallback,
        afterEnter,
        setAfterEnter,
        isLoadingComplete,
        setLoadingComplete,
        pageTransitionTimeline,
        setPageTransitionTimeline,
      }}
    >
      <>{children}</>
    </TransitionContext.Provider>
  );
};

const PageLoader = () => {
  return <></>;
};

export default PageLoader;
export { PageTransitionProvider, TransitionContext };
