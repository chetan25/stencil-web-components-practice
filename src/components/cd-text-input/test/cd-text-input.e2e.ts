import { newE2EPage } from '@stencil/core/testing';

describe('cd-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cd-text-input></cd-text-input>');

    const element = await page.find('cd-text-input');
    expect(element).toHaveClass('hydrated');
  });
});
