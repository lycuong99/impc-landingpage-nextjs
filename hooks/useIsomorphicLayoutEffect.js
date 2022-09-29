import { isBrowser } from "../lib/utils";

export default useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
