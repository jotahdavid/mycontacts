type EventManagerListener<T> = (payload: T) => void;
type EventManagerMapListeners<T> = Map<string, EventManagerListener<T>[]>;

class EventManager<P> {
  public listeners: EventManagerMapListeners<P>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: EventManagerListener<P>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: P) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }

  removeListener(event: string, listenerToRemove: EventManagerListener<P>) {
    if (!this.listeners.has(event)) return;

    const filteredListeners = this.listeners.get(event)!.filter(
      (listener) => listener !== listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
  }
}

export default EventManager;
