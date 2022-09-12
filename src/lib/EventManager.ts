type EventManagerListener = (payload: any) => void;
type EventManagerMapListeners = Map<string, EventManagerListener[]>;

class EventManager {
  public listeners: EventManagerMapListeners;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: EventManagerListener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }

  removeListener(event: string, listenerToRemove: EventManagerListener) {
    if (!this.listeners.has(event)) return;

    const filteredListeners = this.listeners.get(event)!.filter(
      (listener) => listener === listenerToRemove,
    );

    this.listeners.set(event, filteredListeners);
  }
}

export default EventManager;
