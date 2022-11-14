import {
  createRef, RefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface ItemWithId {
  id: string | number;
}

interface RenderListProps<ElementType> {
  isLeaving: boolean;
  animatedRef: RefObject<ElementType>;
}

type RenderListCallback<ItemType, ElementType> =
  (item: ItemType, props: RenderListProps<ElementType>) => JSX.Element;

export default function useAnimatedList<T extends ItemWithId>(initialList: T[] = []) {
  type ItemId = T['id'];

  const [items, setItems] = useState(initialList);
  const [pendingRemovalItemsId, setPendingRemovalItemsId] = useState<ItemId[]>([]);

  const animatedRefs = useRef<Map<ItemId, RefObject<HTMLElement>>>(new Map());
  const animationEndListeners = useRef<Map<ItemId, Function>>(new Map());

  const handleAnimationEnd = useCallback((itemId: ItemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    if (removeListener) {
      removeListener();
      animationEndListeners.current.delete(itemId);
      animatedRefs.current.delete(itemId);
    }

    setItems(
      (prevState) => prevState.filter((item) => item.id !== itemId),
    );
    setPendingRemovalItemsId(
      (prevState) => prevState.filter((id) => id !== itemId),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsId.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (!animatedRef?.current || alreadyHasListener) return;

      const onAnimationEnd = () => {
        handleAnimationEnd(itemId);
      };
      const removeListener = () => {
        animatedRef.current?.removeEventListener('animationend', onAnimationEnd);
      };

      animatedRef.current.addEventListener('animationend', onAnimationEnd);
      animationEndListeners.current.set(itemId, removeListener);
    });
  }, [pendingRemovalItemsId, handleAnimationEnd]);

  useEffect(() => {
    const removeListeners = animationEndListeners.current;

    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const handleRemoveItem = useCallback((id: ItemId) => {
    setPendingRemovalItemsId(
      (prevState) => [...prevState, id],
    );
  }, []);

  const getAnimatedRef = useCallback((itemId: ItemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }

    return animatedRef;
  }, []);

  const renderList = useCallback(<E>
    (renderCallback: RenderListCallback<T, E>) => (
      items.map((item) => renderCallback(item, {
        isLeaving: pendingRemovalItemsId.includes(item.id),
        animatedRef: getAnimatedRef(item.id) as RefObject<E>,
      }))
    ), [items, pendingRemovalItemsId, getAnimatedRef]);

  return {
    setItems,
    handleRemoveItem,
    renderList,
  };
}
