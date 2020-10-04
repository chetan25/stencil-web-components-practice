import { newSpecPage } from '@stencil/core/testing';
import { CdSpinner } from '../cd-spinner';

describe('cd-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdSpinner],
      html: `<cd-spinner></cd-spinner>`,
    });
    expect(page.root).toEqualHtml(`
      <cd-spinner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cd-spinner>
    `);
  });
});
