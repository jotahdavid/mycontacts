import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount<ElementType extends HTMLElement>(visible: boolean) {
  const [shouldRender, setShouldRender] = useState(visible);

  const animatedElementRef = useRef<ElementType>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const animatedElement = animatedElementRef.current;

    if (!visible && animatedElement) {
      animatedElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      animatedElement?.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [visible]);

  return {
    shouldRender,
    animatedElementRef,
  };
}
