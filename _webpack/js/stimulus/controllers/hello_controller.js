import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['name', 'message'];

  // https://stimulusjs.org/handbook/managing-state#lifecycle-callbacks-explained
  connect = () => console.log('hello#connect');

  greet = () => {
    console.log('hello#greet');
    this.renderMessage({
      alertType: this.name ? 'success' : 'secondary',
      message: this.name
        ? `Hello, ${this.name}!`
        : `Hello, try typing your name!`,
    });
  };

  clear = () => {
    console.log('hello#clear');
    this.clearName();
    this.clearMessage();
  };

  clearName = () => {
    this.nameTarget.value = '';
  };

  renderMessage = ({ alertType, message }) => {
    // Looks like Stimulus automatically sanitizes HTML. Try pasting this into the form:
    // <script>alert("XSS Attack");</script>
    this.messageTarget.innerHTML = this.messageTemplate({ alertType, message });
  };

  clearMessage = () => {
    this.messageTarget.innerHTML = '';
  };

  messageTemplate = ({ alertType, message }) => `
    <div class="alert alert-${alertType}" role="alert">
      <p>${message}</p>
    </div>
  `;

  get name() {
    return this.nameTarget.value;
  }
}
