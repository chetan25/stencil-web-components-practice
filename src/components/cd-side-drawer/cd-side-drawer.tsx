import { Component, Prop, Method, Element,  h } from '@stencil/core';

export type Slide = 'left' | 'right';

@Component({
  tag: 'cd-side-drawer',
  styleUrl: './cd-side-drawer.css',
  shadow: true
  // scoped: true, //tells stencil that all css are scoped to this file(emulation of shadow dom)
})
export class CdSideDrawer {
  /**
   * Only used in css to change styling
   * by default props are immutable inside component,
   * to make them mutable use mutable
   */
  @Prop({reflect: true, mutable: true}) opened: boolean = false;

  /**
   * Prop use that governs the direction of the Drawer slide
   */
  @Prop({reflect: true, mutable: true}) slide: Slide = 'left';

  /**
   * Method to open Drawer
   */
  @Method()
  onOpen() {
    this.opened = true;
  }

  /**
   * Method to close Drawer
   */
  @Method()
  onClose() {
    this.opened = false;
  }

  @Element() hostElement: HTMLElement;

  onCloseDrawer = () => {
    this.opened = false;
  }

  // <slot/> could be style from outside
  render() {
    return [
      <div class="backdrop" onClick={this.onCloseDrawer}></div>,
      <aside>
        <header>
          <slot name="drawer-header" />
          { !!this.hostElement.querySelector('[slot="drawer-close-icon"]')
             ? <slot name="drawer-close-icon" />
             : <button class='close' onClick={this.onCloseDrawer}>X</button>
          }
        </header>
        <main>
          <slot name="drawer-content" />
        </main>
      </aside>
    ];
  }
}
