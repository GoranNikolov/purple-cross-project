import { watch, onUnmounted, type Ref } from "vue";

export function useInfiniteScroll(
  target: Ref<HTMLElement | null>,
  callback: () => void,
  root?: Ref<HTMLElement | null>,
) {
  let observer: IntersectionObserver | null = null;

  watch(
    target,
    (el) => {
      observer?.disconnect();
      observer = null;
      if (!el) return;
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) callback();
        },
        { root: root?.value ?? null, rootMargin: "200px" },
      );
      observer.observe(el);
    },
    { immediate: true },
  );

  onUnmounted(() => {
    observer?.disconnect();
  });
}
