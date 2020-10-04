import { newSpecPage } from '@stencil/core/testing';
import { CdSideDrawer } from '../cd-side-drawer';

describe('cd-side-drawer', () => {
  it('renders CdSideDrawer with shadow DOM', async () => {
    const html = `
     <cd-side-drawer slide="right">
       <div slot="drawer-header" class="header-class">Settings</div>
     <div slot="drawer-content"></div>
    </cd-side-drawer>
  `;
    const page = await newSpecPage({
      components: [CdSideDrawer],
      html: html,
    });

    expect(page.root.shadowRoot).toBeTruthy();
    expect(page.root.querySelector('.backdrop')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.backdrop')).toBeTruthy();
    expect(page.root.querySelector('.header-class')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.header-class')).toBeFalsy();

    expect(page.rootInstance.slide).toEqual('right');
    // expect(page.root).toMatchSnapshot();
  });

  it('renders all passed slots element', async () => {
    const html = `
     <cd-side-drawer>
       <div slot="drawer-header" class="header-class">Settings</div>
       <button
          slot="drawer-close-icon"
          class='close'
          id="sidebarClose"
       >Close</button>
       <div slot="drawer-content" id="content"><h2>Content</h2></div>
    </cd-side-drawer>
  `;
    const page = await newSpecPage({
      components: [CdSideDrawer],
      html: html,
    });

    expect(page.root.querySelector('.header-class').textContent).toEqual('Settings');
    expect(page.root.querySelector('.close').textContent).toEqual('Close');
    expect(page.root.querySelector('#content').textContent).toEqual('Content');
    expect(page.root.shadowRoot.querySelector('.close')).toBeFalsy();

    expect(page.rootInstance.slide).toEqual('left');
    expect(page.rootInstance.opened).toEqual(false);
  });

  it('renders default slots element', async () => {
    const html = `
     <cd-side-drawer slide="left">
       <div slot="drawer-header" class="header-class">Settings</div>
       <div slot="drawer-content" id="content"><h2>Content</h2></div>
    </cd-side-drawer>
  `;
    const page = await newSpecPage({
      components: [CdSideDrawer],
      html: html,
    });

    expect(page.root.querySelector('.header-class').textContent).toEqual('Settings');
    expect(page.root.querySelector('.close')).toBeFalsy();
    expect(page.root.shadowRoot.querySelector('.close').textContent).toEqual('X');
  });

  it('onCLose and onOpen methods are fired properly', async () => {
    const html = `
     <cd-side-drawer slide="left">
       <div slot="drawer-header" class="header-class">Settings</div>
       <div slot="drawer-content" id="content"><h2>Content</h2></div>
    </cd-side-drawer>
  `;
    const page = await newSpecPage({
      components: [CdSideDrawer],
      html: html,
    });
    await page.rootInstance.onOpen();
    expect(page.rootInstance.opened).toEqual(true);

    await page.rootInstance.onClose();
    expect(page.rootInstance.opened).toEqual(false);
  });
});
