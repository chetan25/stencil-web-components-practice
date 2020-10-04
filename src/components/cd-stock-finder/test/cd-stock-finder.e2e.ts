import { newE2EPage } from '@stencil/core/testing';

describe('cd-stock-finder', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cd-stock-finder></cd-stock-finder>');

    const element = await page.find('cd-stock-finder');
    expect(element).toHaveClass('hydrated');
  });
});
