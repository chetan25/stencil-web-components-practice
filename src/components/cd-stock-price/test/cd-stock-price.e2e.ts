import { newE2EPage } from '@stencil/core/testing';

describe('cd-stock-price', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cd-stock-price></cd-stock-price>');

    const element = await page.find('cd-stock-price');
    expect(element).toHaveClass('hydrated');
  });
});
