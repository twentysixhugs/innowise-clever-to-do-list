export function disableScrollOnMobiles() {
  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );
}
