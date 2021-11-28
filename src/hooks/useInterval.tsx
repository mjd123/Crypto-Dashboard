import { MutableRefObject, useRef } from "react";
import { useEffect } from "react";

const useInterval = (
  callback: () => void | undefined | Promise<void>,
  milliseconds: number
) => {
  let savedCallback: MutableRefObject<
    (() => void) | undefined | (() => Promise<void>)
  > = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, milliseconds);
    return () => clearInterval(interval);
  }, [milliseconds]);
};

export default useInterval;
