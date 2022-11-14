import {
  createRef, RefObject, useCallback, useEffect, useRef, useState,
} from 'react';

interface ItemWithId {
  id: string | number;
}

interface RenderListProps {
  isLeaving: boolean;
  animatedRef: RefObject<any>;
}

type RenderListCallback<ItemType> = (item: ItemType, props: RenderListProps) => JSX.Element;

export default function useAnimatedList<T extends ItemWithId>(initialList: T[] = []) {
  type ItemId = T['id'];

  const [items, setItems] = useState(initialList);
  const [pendingRemovalItemsId, setPendingRemovalItemsId] = useState<ItemId[]>([]);

  // TODO: Be able to pass element type to RefObject
  const animatedRefs = useRef<Map<ItemId, RefObject<any>>>(new Map());
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
        animatedRef.current.removeEventListener('animationend', onAnimationEnd);
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

  const renderList = useCallback((renderCallback: RenderListCallback<T>) => (
    items.map((item) => renderCallback(item, {
      isLeaving: pendingRemovalItemsId.includes(item.id),
      animatedRef: getAnimatedRef(item.id),
    }))
  ), [items, pendingRemovalItemsId, getAnimatedRef]);

  return {
    setItems,
    handleRemoveItem,
    renderList,
  };
}
