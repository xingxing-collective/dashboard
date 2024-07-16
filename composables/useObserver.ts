export const useObserver = () => {
  const observer = ref<IntersectionObserver>();
  const resizeObserver = ref<ResizeObserver>();

  function createObserver(
    container: Element,
    callback: IdleRequestCallback,
    options?: IntersectionObserverInit
  ) {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) requestIdleCallback(callback);
    }, options);
    observer.value.observe(container);
  }
  function createResizeObserver(
    container: Element,
    callback: ResizeObserverCallback
  ) {
    resizeObserver.value = new ResizeObserver(callback);
    resizeObserver.value.observe(container);
  }
  onBeforeUnmount(() => {
    observer.value?.disconnect();
    resizeObserver.value?.disconnect();
  });
  return {
    observer,
    createObserver,
    createResizeObserver,
  };
};
