class Observer {
  private entries: {
    [elementId: string]: (nodeId: number) => void;
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

    const resizeObserver = new ResizeObserver(this.changeWindowSize.bind(this));

    resizeObserver.observe(document.body);
  }

  private changeWindowSize(entries: ResizeObserverEntry[]) {
    if (!this.wasResizeObserverCalled) {
      this.wasResizeObserverCalled = true;
      return;
    }
    const lastEntry = entries[entries.length - 1];

    console.log(lastEntry.target.clientWidth);

    const config = {
      threshold: (lastEntry.target.clientWidth * 0.4) / 1536,
    };
    this.observer = new IntersectionObserver(this.onIntersection, config);

    this.observedElements.forEach((el) => this.observer.observe(el));
  }

  private checkEntry = (entry: IntersectionObserverEntry) => {
    if (!entry.isIntersecting) {
      const id = Number(entry.target.id);

      const callback = this.entries[id];

      // x > 0 means we scroll to the left, otherwise to the right
      const newId = entry.boundingClientRect.x > 0 ? id - 1 : id + 1;

      callback(newId);
    }
  };

  private onIntersection: IntersectionObserverCallback = (entries) => {
    entries.forEach(this.checkEntry);
  };

  public addEntry = (element: Element, callback: (nodeId: number) => void) => {
    this.entries[element.id] = callback;
    this.observer.observe(element);
    this.observedElements.push(element);
  };
}

export default new Observer();
