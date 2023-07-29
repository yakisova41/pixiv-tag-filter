/**
 * Code copyright 2022 Max Rohde
 * Code released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 * Modifications copyright (C) 2023 yakisova41
 */

const sha256 = require("sha256");
const sass = require("sass");

async function generateCSSInject(sourcePath, css) {
  const styleId = sha256(sourcePath);

  return ` if (!document.getElementById('${styleId}')) {
      var e = document.createElement('style');
      e.id = '${styleId}';
      e.textContent = \`${css}\`;
      document.head.appendChild(e);
  }`;
}

const scssPlugin = (opts) => {
  return {
    name: "scss-plugin-client",
    setup: (build) => {
      build.onLoad(
        {
          filter: /\.(scss|css)$/,
        },
        async (args) => {
          const { css } = sass.compile(args.path, {
            style: "compressed",
          });

          const js = await generateCSSInject(args.path, css);
          return {
            contents: js,
            loader: "js",
          };
        }
      );
    },
  };
};

const pluginFactory = (opts) => {
  return scssPlugin(opts);
};

module.exports = pluginFactory;
