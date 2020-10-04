import { newSpecPage } from '@stencil/core/testing';
import { CdStockPrice } from '../cd-stock-price';

describe('cd-stock-price', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CdStockPrice],
      html: `<cd-stock-price></cd-stock-price>`,
    });
    expect(page.root).toEqualHtml(`
      <cd-stock-price>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cd-stock-price>
    `);
  });
});
