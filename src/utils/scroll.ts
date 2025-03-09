import { debounce } from './debounce';

interface ScrollElements {
  sphere1: HTMLElement | null;
  sphere2: HTMLElement | null;
}

export function createScrollHandler(elements: ScrollElements) {
  return debounce(() => {
    const scrollY = window.scrollY || window.pageYOffset;
    const minScrollY = 0;
    const maxScrollY = 100;
    const clampedScrollY = Math.min(Math.max(scrollY, minScrollY), maxScrollY);

    if (elements.sphere1 && elements.sphere2) {
      elements.sphere1.style.top = `${20 + clampedScrollY * 0.1}vh`;
      elements.sphere2.style.top = `${40 + clampedScrollY * 0.1}vh`;
      elements.sphere1.style.animationPlayState = 'paused';
      elements.sphere2.style.animationPlayState = 'paused';

      // 恢复动画
      setTimeout(() => {
        if (elements.sphere1 && elements.sphere2) {
          elements.sphere1.style.animationPlayState = 'running';
          elements.sphere2.style.animationPlayState = 'running';
        }
      }, 100);
    }
  }, 10);
}
