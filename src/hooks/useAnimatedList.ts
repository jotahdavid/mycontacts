import { useCallback, useState } from 'react';

interface ItemWithId {
  id: string | number;
}

export default function useAnimatedList<T extends ItemWithId>(initialList: T[] = []) {
  const [items, setItems] = useState(initialList);
  const [pendingRemovalItemsId, setPendingRemovalItemsId] = useState<T['id'][]>([]);

  const handleRemoveMessage = useCallback((id: T['id']) => {
    setPendingRemovalItemsId(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id: T['id']) => {
    setItems(
      (prevState) => prevState.filter((item) => item.id !== id),
    );
    setPendingRemovalItemsId(
      (prevState) => prevState.filter((itemId) => itemId !== id),
    );
  }, []);

  return {
    items,
    setItems,
    pendingRemovalItemsId,
    handleRemoveMessage,
    handleAnimationEnd,
  };
}
