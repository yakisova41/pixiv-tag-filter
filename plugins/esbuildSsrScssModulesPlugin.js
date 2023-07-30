const sha256 = require("sha256");
const sass = require("sass");
const path = require("path");
const { compileCss, CompileCssConfiguration } = require("node-css-require");

async function generateCSSInject(sourcePath, css) {
  const styleId = sha256(sourcePath);

  return `(function(){
    if (!document.getElementById('${styleId}')) {
      var e = document.createElement('style');
      e.id = '${styleId}';
      e.textContent = \`${css}\`;
      document.head.appendChild(e);
    }
  })();`;
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

          const res = await compileCss(css, path.basename(args.path, ".scss"));

          let js = "";

          if (opts?.jsCSSInject) {
            js = `${await generateCSSInject(args.path, res.css)}\n${res.js}`;
          } else {
            js = res.css;
          }
          if (opts?.onCSSGenerated) {
            opts.onCSSGenerated(res.css);
          }

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
