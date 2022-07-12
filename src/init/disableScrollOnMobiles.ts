export function disableScrollOnMobiles() {
  window.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );

  window.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );

  window.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
    },
    { passive: false }
  );
}
