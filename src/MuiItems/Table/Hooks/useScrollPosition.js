// Borrowed from https://github.com/n8tb1t/use-scroll-position

import {useRef, useLayoutEffect} from 'react';

const isBrowser = typeof window !== `undefined`;

const getScrollPosition = ({element, useWindow}) => {
  if (!isBrowser) return {x: 0, y: 0};
  const target = element || document.body;
  const position = target.getBoundingClientRect();

  return useWindow ?
    {x: window.scrollX, y: window.scrollY} :
    {left: position.left, top: position.top, right: position.right, bottom: position.bottom, width: position.width, height: position.height};
};

export const useScrollPosition = (effect, deps, element, useWindow = false, wait = 10) => {
  const position = useRef(getScrollPosition({element, useWindow}));
  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({element, useWindow});
    effect({prevPos: position.current, currPos});
    position.current = currPos;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handlePosition = () => {
      if (wait && throttleTimeout === null) throttleTimeout = setTimeout(callBack, wait); //eslint-disable-line
      else if (!wait) callBack();
    };
    handlePosition(); // Get initial position of element on first load;
    window.addEventListener('scroll', handlePosition); // Get subsequent position of element on scroll;

    return () => window.removeEventListener('scroll', handlePosition);
  }, deps);
};
