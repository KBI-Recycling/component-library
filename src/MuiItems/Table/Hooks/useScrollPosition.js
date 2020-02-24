// Inspired by https://github.com/n8tb1t/use-scroll-position

import {useLayoutEffect} from 'react';

const isBrowser = typeof window !== `undefined`;

const getScrollPosition = ({element, useWindow}) => {
  if (!isBrowser) return {x: 0, y: 0};
  const target = element || document.body;
  const position = target.getBoundingClientRect();

  return useWindow ?
    {x: window.scrollX, y: window.scrollY} :
    {left: position.left, top: position.top, right: position.right, bottom: position.bottom, width: position.width, height: position.height};
};

export const useScrollPosition = (effect, deps, element, useWindow = false, wait = 500) => {
  let throttleTimeout = null;

  const callBack = () => {
    const currPosition = getScrollPosition({element, useWindow});
    effect({currPosition, scrolling: false});
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handlePosition = () => {
      if (wait && throttleTimeout === null) {
        effect({scrolling: true});
        throttleTimeout = setTimeout(callBack, wait); //eslint-disable-line
      } else if (!wait) callBack();
    };
    handlePosition(); // Get initial position of element on first load;
    window.addEventListener('scroll', handlePosition); // Get subsequent position of element on scroll;
    window.addEventListener('resize', handlePosition); // Get subsequent position of element on window resize;

    return () => {
      window.removeEventListener('scroll', handlePosition);
      window.removeEventListener('resize', handlePosition);
    };
  }, deps);
};
