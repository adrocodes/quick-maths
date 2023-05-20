const screenManager = () => {
  const screens = document.querySelectorAll('.screen');
  const screensById = Array.from(screens).reduce((acc: Record<string, Element>, screen) => {
    const id = screen.getAttribute('data-idx');
    if (!id) return acc;

    acc[id] = screen;
    return acc;
  }, {});

  return {
    hideAll: function() {
      screens.forEach((screen) => screen.classList.add('hidden'));
    },
    show: function (screenId: string) {
      this.hideAll()
      const screen = screensById[screenId];
      if (!screen) return;
      screen.classList.remove('hidden');
    }
  }
}

export default screenManager();