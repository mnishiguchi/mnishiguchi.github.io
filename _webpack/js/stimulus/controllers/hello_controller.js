import { Controller } from 'stimulus';

const alertClassNames = {
  success: 'alert-success',
  secondary: 'alert-secondary',
};

export default class extends Controller {
  static targets = ['name', 'alert', 'message'];

  // https://stimulusjs.org/handbook/managing-state#lifecycle-callbacks-explained
  connect = () => console.log('hello#connect', this.element);

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
    this.alertTarget.style.display = 'block';
    this.alertTarget.classList.add(alertClassNames[alertType]);
    this.messageTarget.innerHTML = message;
  };

  clearMessage = () => {
    this.alertTarget.style.display = 'none';
    this.alertTarget.classList.remove(alertClassNames.success);
    this.alertTarget.classList.remove(alertClassNames.secondary);
    this.messageTarget.innerHTML = '';
  };

  get name() {
    return this.nameTarget.value;
  }
}
