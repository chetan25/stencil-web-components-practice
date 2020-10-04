import { newE2EPage } from '@stencil/core/testing';

describe('cd-side-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cd-side-drawer></cd-side-drawer>');

    const element = await page.find('cd-side-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
