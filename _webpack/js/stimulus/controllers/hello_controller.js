import { Controller } from 'stimulus';

// Stimulus controllers are instances of JavaScript classes whose methods can act as event handlers.
export default class extends Controller {
  static targets = ['name'];

  // Called each time this controller is connected to the document.
  // https://stimulusjs.org/handbook/managing-state#lifecycle-callbacks-explained
  connect() {
    console.log('hello#connect', this.element);
  }

  greet() {
    console.log('hello#greet');
    const helloText = `Hello, ${this.name || 'there'}!`;
    this.findHelloAlertElement().style.display = 'block';
    this.findHelloAlertTextElement().innerText = helloText;
  }

  clear() {
    console.log('hello#clear');
    this.nameTarget.value = '';
    this.findHelloAlertElement().style.display = 'none';
    this.findHelloAlertTextElement().innerText = '';
  }

  get name() {
    return this.nameTarget.value;
  }

  findHelloAlertElement() {
    return document.querySelector('#js-HelloAlert');
  }

  findHelloAlertTextElement() {
    return document.querySelector('#js-HelloAlert-text');
  }
}
