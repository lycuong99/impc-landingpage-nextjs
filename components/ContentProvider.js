import { createContext } from "react";

const ContentContext = createContext({});

const ContentProvider = ({ footerContent, headerContent, pageContent, children }) => {
  return (
    <ContentContext.Provider value={{ footerContent, headerContent, pageContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;
export { ContentContext };
