export default defineNuxtPlugin(() => {
  if (navigator?.userAgent && /Win[\da-z]*;/.test(navigator.userAgent)) {
    document.documentElement.classList.add('nuxt-ui-scrollbars');
  }
});
