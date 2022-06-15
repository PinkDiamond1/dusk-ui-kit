import adapter from "@sveltejs/adapter-static";
import dusk from "@dusk-network/styles/plugin/index.js";
import metadata from "@dusk-network/meta/index.cjs";
import fs from "fs";
import path from "path";
import * as Helpers from "@dusk-network/helpers";

const dev = process.env.NODE_ENV === "development";

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

function getFiles(dir) {
  let results = [];

  fs.readdirSync(dir).forEach(function (file) {
    file = dir + "/" + file;

    let stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      const extension = file.split(".").pop();

      if (extension == "svelte") results.push(file);
    }
  });

  return results;
}

const virtualExamplePlugin = () => {
  const virtualFileId = "@ui-kit-example";
  return {
    name: "ui-kit-example-plugin",
    resolveId(id) {
      if (id === virtualFileId) {
        return virtualFileId;
      }
    },
    async load(id) {
      if (id === virtualFileId) {
        let examples = {};
        const files = await getFiles("../examples/src");

        files.forEach((file) => {
          const data = fs.readFileSync(file, "utf8");
          const pathData = path.parse(file).dir.split("/");

          pathData.splice(0, 3);

          if (!examples[pathData[0]]) examples[pathData[0]] = {};
          if (!examples[pathData[0]][pathData[1]]) examples[pathData[0]][pathData[1]] = {};

          examples[pathData[0]][pathData[1]][path.parse(file).name] = data;
        });

        return `export default JSON.parse(${JSON.stringify(JSON.stringify(examples))})`;
      }
    },
  };
};

const getEntries = (obj) => {
  let entries = ["/", "/components", "/helpers"];
  Object.keys(obj).forEach((group) => {
    entries.push(`/components/${group}`);

    Object.keys(obj[group]).forEach((pkg) => {
      entries.push(`/components/${group}/${pkg}`);

      Object.keys(obj[group][pkg]).forEach((component) => {
        entries.push(`/components/${group}/${pkg}/${component}`);
      });
    });
  });

  Object.entries(Helpers).forEach(([key]) => {
    entries.push(`/helpers/${key}`);
  });

  // console.log(entries);

  return entries;
};

const entries = getEntries(metadata);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    prerender: {
      crawl: false,
      enabled: true,
      entries: entries,
    },
    paths: {
      base: dev ? "" : "/dusk-ui-kit/docs",
    },
    appDir: "internal", // Needed to work with Github pages.
    vite: () => ({
      build: {
        target: ["es2020"],
      },
      optimizeDeps: {
        include: ["highlight.js", "highlight.js/lib/core"],
        exclude: ["fsevents", "purgecss", "rollup-pluginutils"],
      },
      resolve: {
        alias: {
          "node:stream": "stream-browserify",
        },
      },
      plugins: [
        virtualExamplePlugin(),
        virtualMetaPlugin(),
        dusk({
          cssPath: "./node_modules/@dusk-network/styles/tailwind.css",
        }),
      ],
      server: {
        fs: {
          allow: [".."],
        },
      },
    }),
  },
};

export default config;
