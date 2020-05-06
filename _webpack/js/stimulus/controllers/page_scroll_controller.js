import { Controller } from 'stimulus';

const SCROLL_THRESHOLD = 100;

const currentPosition = () =>
  Math.abs(document.body.getBoundingClientRect().top);

const shouldScrollToTop = () => currentPosition() > SCROLL_THRESHOLD;

// Stimulus controllers are instances of JavaScript classes whose methods can act as event handlers.
export default class extends Controller {
  static targets = [];

  // Called each time this controller is connected to the document.
  // https://stimulusjs.org/handbook/managing-state#lifecycle-callbacks-explained
  connect() {
    console.log('page_scroll#connect', this.element);
    document.addEventListener('scroll', this.scrollListener);
    this.element.style.transition = 'all 0.3s ease-out';
    this.data.set('arrow', 'down');
  }

  disconnect() {
    console.log('page_scroll#disconnect');
    document.removeEventListener('scroll', this.scrollListener);
  }

  handleClick() {
    console.log('page_scroll#handleClick');
    shouldScrollToTop() ? this.scrollToTop() : this.scrollDown();
  }

  scrollToTop() {
    document.body.scrollIntoView();
    this.pointArrowDown();
  }

  scrollDown() {
    this.element.scrollIntoView();
    this.pointArrowUp();
  }

  pointArrowUp() {
    this.element.style.transform = 'rotate(180deg)';
    this.data.set('arrow', 'up');
  }

  pointArrowDown() {
    this.element.style.transform = 'rotate(0deg)';
    this.data.set('arrow', 'down');
  }

  scrollListener = () => {
    if (shouldScrollToTop() && this.data.get('arrow') === 'down') {
      this.pointArrowUp();
    }
    if (!shouldScrollToTop() && this.data.get('arrow') === 'up') {
      this.pointArrowDown();
    }
  };
}
