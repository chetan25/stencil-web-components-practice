import { newSpecPage } from '@stencil/core/testing';
import { CdTextInput } from '../cd-text-input';

describe('cd-text-input', () => {
  it('renders input with default values', async () => {
    const html = `<cd-text-input value="test" id="test"></cd-text-input>`;
    const page = await newSpecPage({
      components: [CdTextInput],
      html: html,
    });

    expect(page.root.querySelector('#test')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('#test')).toBeTruthy();
    expect((page.root.shadowRoot.getElementById('test') as HTMLInputElement).value).toEqual('test');
    expect(page.root.shadowRoot.querySelector('input.error')).toBeFalsy();
  });

  it('class change happens on isValidChange', async() => {
    const html = `<cd-text-input value="test" id="test"></cd-text-input>`;
    const page = await newSpecPage({
      components: [CdTextInput],
      html: html,
    });

    page.rootInstance.isValid = 'false';
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('input.error')).toBeTruthy();
  })
});
