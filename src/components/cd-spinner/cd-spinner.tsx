import { Component, h } from '@stencil/core';

@Component({
  tag: 'cd-spinner',
  styleUrl: 'cd-spinner.css',
  shadow: true,
})
export class CdSpinner {

  render() {
    return (
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    );
  }

}
