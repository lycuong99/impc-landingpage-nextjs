import { createContext, useState } from "react";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  // Header
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [isHeaderTransparent, setHeaderTransparent] = useState(true);

  return (
    <GlobalContext.Provider
      value={{ isOpenDrawer, setOpenDrawer, isHeaderTransparent, setHeaderTransparent }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
