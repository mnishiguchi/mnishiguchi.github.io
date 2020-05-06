import { Controller } from 'stimulus';

const SCROLL_THRESHOLD = 90;
const DATA_KEY_ARROW_UP = 'arrow-up';

const currentPosition = () =>
  Math.abs(document.body.getBoundingClientRect().top);

const shouldScrollToTop = () => SCROLL_THRESHOLD < currentPosition();

export default class extends Controller {
  static targets = ['arrowIcon'];

  // https://stimulusjs.org/handbook/managing-state#lifecycle-callbacks-explained
  connect = () => {
    console.log('page_scroll#connect', this.element);
    this.arrowIconTarget.style.transition = 'transform 0.3s ease-out';
  };

  scrollPage = () =>
    shouldScrollToTop() ? this.scrollToTop() : this.scrollDown();

  adjustArrow = () => {
    if (shouldScrollToTop() && this.isArrowDown()) {
      this.pointArrowUp();
    }
    if (!shouldScrollToTop() && this.isArrowUp()) {
      this.pointArrowDown();
    }
  };

  scrollToTop = () => document.body.scrollIntoView();

  scrollDown = () => this.element.scrollIntoView();

  pointArrowDown = () => {
    this.arrowIconTarget.style.transform = 'rotate(0deg)';
    this.data.delete(DATA_KEY_ARROW_UP);
  };

  pointArrowUp = () => {
    this.arrowIconTarget.style.transform = 'rotate(180deg)';
    this.data.set(DATA_KEY_ARROW_UP, 0);
  };

  isArrowDown = () => !this.isArrowUp();

  isArrowUp = () => this.data.has(DATA_KEY_ARROW_UP);
}
