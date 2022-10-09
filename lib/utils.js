export function debounce(fn, ms) {
  let timer;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export const isBrowser = typeof window !== "undefined";

export const splitTextToLines = (text) => (text?.includes("\n") ? text.split("\n") : [text]);
