import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cd-web-components',
  outputTargets: [
    {
      type: 'dist', // collection of components
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www', // when using stencil as web app(full project)
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    testRegex: "(\\.*/test\\.*|\.?(test|spec|e2e))\.(tsx?|ts?|jsx?|js?)"
  }
};
