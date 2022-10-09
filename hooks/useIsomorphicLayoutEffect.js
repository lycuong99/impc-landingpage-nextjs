import { useEffect, useLayoutEffect } from "react";
import { isBrowser } from "../lib/utils";

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
