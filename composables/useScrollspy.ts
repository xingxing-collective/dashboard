/**
 * Scrollspy allows you to watch visible headings in a specific page.
 * Useful for table of contents live style updates.
 */
export const useScrollspy = () => {
  const observer = ref<IntersectionObserver>();
  const visibleHeadings = ref<string[]>([]);
  const activeHeadings = ref<string[]>([]);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const id = entry.target.id;

      visibleHeadings.value = entry.isIntersecting
        ? [...visibleHeadings.value, id]
        : visibleHeadings.value.filter((h) => h !== id);
    }
  };

  const updateHeadings = (headings: Element[]) => {
    for (const heading of headings) {
      if (!observer.value) {
        continue;
      }

      observer.value.observe(heading);
    }
  };

  watch(visibleHeadings, (val, oldVal) => {
    activeHeadings.value = val.length === 0 ? oldVal : val;
  });

  // Create intersection observer
  onBeforeMount(
    () => (observer.value = new IntersectionObserver(observerCallback))
  );

  // Destroy it
  onBeforeUnmount(() => observer.value?.disconnect());

  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings,
  };
};
