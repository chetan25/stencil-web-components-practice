import { newSpecPage } from '@stencil/core/testing';
import { CdStockFinder } from '../cd-stock-finder';

describe('cd-stock-finder', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdStockFinder],
      html: `<cd-stock-finder></cd-stock-finder>`,
    });
    expect(page.root).toEqualHtml(`
      <cd-stock-finder>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cd-stock-finder>
    `);
  });
});
