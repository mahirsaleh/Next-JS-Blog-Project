"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

type TProps = React.ComponentProps<"button">;

export default function FloatingButton({ children, ...props }: TProps) {
  const [isShow, setIsShow] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  const setTimeoutProperty = {
    callBack: function () {
      setIsShow(false);
    },
    timer: 2000,
  };

  const scrollEventHandler = useEffectEvent(function () {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (window.scrollY > 100) {
      setIsShow(true);

      timerRef.current = window.setTimeout(
        setTimeoutProperty.callBack,
        setTimeoutProperty.timer,
      );
    } else {
      setIsShow(false);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollEventHandler, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollEventHandler);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      disabled={!isShow}
      onMouseEnter={() => {
        // setIsHover(true) ;
        window.clearTimeout(timerRef.current);
      }}
      onMouseLeave={() => {
        // setIsHover(false)
        timerRef.current = window.setTimeout(
          setTimeoutProperty.callBack,
          setTimeoutProperty.timer,
        );
      }}
      style={
        isShow
          ? {
              opacity: 1,
              cursor: "pointer",
              zIndex: "9999999999",
            }
          : {
              zIndex: "-1",
              pointerEvents: "none",
            }
      }
      {...props}
    >
      {children}
    </button>
  );
}
