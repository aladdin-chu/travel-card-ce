// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/aladdin/Downloads/travel-card-github/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/pages/index/index').default,
    "exact": true
  },
  {
    "path": "/result",
    "component": require('@/pages/result/index').default,
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
