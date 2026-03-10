/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('@docutracker/tailwind-config');
const path = require('path');

module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './app/**/*.{ts,tsx}',
    `${path.join(require.resolve('@docutracker/ui'), '..')}/components/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@docutracker/ui'), '..')}/icons/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@docutracker/ui'), '..')}/lib/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@docutracker/ui'), '..')}/primitives/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@docutracker/email'), '..')}/templates/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@docutracker/email'), '..')}/template-components/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@docutracker/email'), '..')}/providers/**/*.{ts,tsx}`,
  ],
};
