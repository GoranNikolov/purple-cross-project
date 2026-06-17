import { ref, onMounted, onBeforeUnmount, computed } from "vue";

export function useBreakpoint() {
  const width = ref(window.innerWidth);

  const update = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    update();
    window.addEventListener("resize", update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", update);
  });

  const isMobile = computed(() => width.value < 768);
  const isTablet = computed(() => width.value >= 768 && width.value < 1024);
  const isDesktop = computed(() => width.value >= 1024);

  return { width, isMobile, isTablet, isDesktop };
}
