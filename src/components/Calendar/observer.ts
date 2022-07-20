import { MonthId } from "./Calendar.types";

class Observer {
  private entries: {
    [elementId: string]: (id: MonthId) => void;
  };

  private observedElements: Element[] = [];

  private observer: IntersectionObserver;

  private wasResizeObserverCalled: boolean;

  constructor() {
    this.wasResizeObserverCalled = false;

    this.entries = {};

    const config = {
      threshold: (window.innerWidth * 0.4) / 1536,
    };
    this.observer = new IntersectionObserver(this.onIntersection, config);

    const resizeObserver = new ResizeObserver(this.changeWindowSize);

    resizeObserver.observe(document.body);
  }

  private changeWindowSize = (entries: ResizeObserverEntry[]) => {
    if (!this.wasResizeObserverCalled) {
      this.wasResizeObserverCalled = true;
      return;
    }
    const lastEntry = entries[entries.length - 1];

    const config = {
      threshold: (lastEntry.target.clientWidth * 0.4) / 1536,
    };
    this.observer = new IntersectionObserver(this.onIntersection, config);

    this.observedElements.forEach((el) => this.observer.observe(el));
  };

  private checkEntry = (entry: IntersectionObserverEntry) => {
    if (!entry.isIntersecting) {
      const id = new Date(entry.target.id);

      const callback = this.entries[entry.target.id];

      // x > 0 means we scroll to the left, otherwise to the right
      entry.boundingClientRect.x > 0
        ? id.setMonth(id.getMonth() - 1)
        : id.setMonth(id.getMonth() + 1);

      callback([id.getFullYear(), id.getMonth()]);
    }
  };

  private onIntersection: IntersectionObserverCallback = (entries) => {
    entries.forEach(this.checkEntry);
  };

  public addEntry = (element: Element, callback: (id: MonthId) => void) => {
    this.entries[element.id] = callback;
    this.observer.observe(element);
    this.observedElements.push(element);
  };
}

export default new Observer();
