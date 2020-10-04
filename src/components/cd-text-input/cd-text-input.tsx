import {Component, Prop, h, Watch, State} from '@stencil/core';

@Component({
  tag: 'cd-text-input',
  styleUrl: 'cd-text-input.css',
  shadow: true,
})
export class CdTextInput {

  /**
   * Ref to the input
   */
  inputEl: HTMLInputElement;

  /**
   * holds the current state of input
   */
  @State() inputClass: string = '';

  /**
   * Value passed to the input element
   */
  @Prop({reflect: true, mutable: true}) value: string;

  @Prop() id: string = 'cd-search-symbol';

  /**
   * Internal watcher to keep track of value
   * @param {string} newValue
   * @param {string} oldValue
   */
  @Watch('value')
  inputValueChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      if (this.onChangeCb) {
        this.onChangeCb(newValue);
      }
    }
  }

  @Prop() onChangeCb: (value: string) => void;
  @Prop() onFocusOut: (value: string) => void;

  /**
   * Indicate if the input is Valid or not
   */
  @Prop({reflect: true}) isValid: string = 'true';
  @Watch('isValid')
  onIsValidChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.inputClass = newValue === 'true' ? '' : 'error';
    }
  }

  componentWillLoad() {
    this.inputClass = this.isValid === 'true' ? '' : 'error'
  }

  handleChange = (event: Event) => {
    event.preventDefault();
    this.value = (event.target as HTMLInputElement).value;
    if (this.onChangeCb) {
      this.onChangeCb(this.value);
    }
  }

  onFocusChange = (event: Event) => {
    event.preventDefault();
    this.value = (event.target as HTMLInputElement).value;
    if (this.onFocusOut) {
      this.onFocusOut(this.value);
    }
  }

  render() {
    return (
      <input
        id={this.id}
        ref={el => this.inputEl = el}
        value={this.value}
        onInput={this.handleChange}
        onBlur={this.onFocusChange}
        class={this.inputClass}
      />
    );
  }
}
