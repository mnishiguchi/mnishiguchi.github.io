import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['mover'];

  connect = () => {
    console.log('icon-slideshow#connect', this.element);
    this.shuffleIcons();
  };

  // https://stackoverflow.com/a/11972692/3837223
  shuffleIcons = () => {
    for (var i = this.moverTarget.children.length; i >= 0; i--) {
      this.moverTarget.appendChild(this.moverTarget.children[(Math.random() * i) | 0]);
    }
  };
}
