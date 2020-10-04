import { newE2EPage } from '@stencil/core/testing';

describe('cd-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cd-spinner></cd-spinner>');

    const element = await page.find('cd-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
