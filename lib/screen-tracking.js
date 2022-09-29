let instance = null;

class ScreenTracking {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;

    this.isScreenOnLaptop = true;
    if (typeof window !== "undefined") {
      // Client-side-only code

      this.isScreenOnLaptop = window.screen.width > 1024;

      window.addEventListener("resize", () => {
        this.isScreenOnLaptop = window.screen.width > 1024;

        let vh = window.innerHeight * 0.01;
        // Change Size window
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      });
    }
  }

  isOnLaptop = () => this.isScreenOnLaptop;
}

export default new ScreenTracking();
