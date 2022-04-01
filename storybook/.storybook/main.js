const sveltePreprocess = require("svelte-preprocess");
const dusk = require("@dusk-network/styles/plugin/vite-plugin-dusk-storybook.cjs");
const metadata = require("@dusk-network/meta");
// const mdPlugin = require("vite-plugin-markdown");

// console.log(mdPlugin);

const virtualMetaPlugin = () => {
  const virtualFileId = "@ui-kit-meta";
  return {
    name: "ui-kit-meta-plugin",
    resolveId(id) {
      if (id === virtualFileId) {
        return virtualFileId;
      }
    },
    async load(id) {
      if (id === virtualFileId) {
        return `export default JSON.parse(${JSON.stringify(JSON.stringify(metadata))})`;
      }
    },
  };
};

module.exports = {
  async viteFinal(config, { configType }) {
    config.plugins.push(
      dusk({
        cssPath: "./node_modules/@dusk-network/styles/tailwind.css",
      }),
    );
    console.log("configType", configType);
    if (configType === "DEVELOPMENT") config.build = {};
    config.build.target = "es2020";
    config.plugins.push(virtualMetaPlugin());
    config.resolve.dedupe = ["@storybook/client-api"]; // 🔧 for hoisted packages

    if (process.env.NODE_ENV === "production") config.base = ""; // 🔧 for embedding storybook on GH Pages

    config.optimizeDeps = {
      include: [
        "@storybook/svelte",
        "@storybook/client-api",
        "@storybook/client-logger",
        "@storybook/addon-svelte-csf",
        "@storybook/csf",
        "yup",
        "@storybook/addon-links",
        "svelte-i18n",
        "react",
        "@mdx-js/react",
        "@storybook/addon-docs",
        "merge-anything",
        "util-deprecate",
        "fast-deep-equal",
        "lodash/isPlainObject",
        "lodash/mapValues",
        "lodash/pickBy",
        "lodash/pick",
        "lodash/startCase",
        "lodash/uniq",
        "lodash/cloneDeep",
        "global",
        "synchronous-promise",
        "memoizerific",
        "slash",
        "stable",
        "qs",
        "hoist-non-react-statics",
        "prop-types",
        "doctrine",
        "overlayscrollbars",
      ],
      exclude: ["fsevents", "rollup-pluginutils"],
    };

    // console.log("config", config);

    return config;
  },
  core: {
    builder: "storybook-builder-vite",
  },
  // stories: ["../stories/*.stories.mdx"],
  stories: ["../stories/**/*.stories.svelte", "../stories/*.stories.mdx"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-viewport",
    "@storybook/addon-controls",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.stories\.svelte?$/],
          include: [],
        },
      },
    },
    "@storybook/addon-svelte-csf",
    "storybook-dark-mode",
    "@storybook/addon-jest",
    "@storybook/addon-links",
  ],
  features: {
    postcss: false,
  },
  svelteOptions: {
    preprocess: [
      sveltePreprocess({
        postcss: {
          configFilePath: "./node_modules/@dusk-network/styles/postcss.config.cjs",
        },
      }),
    ],
  },
  staticDirs: ["../static"],
};
