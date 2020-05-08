const glob = require('glob');
const fs = require('fs');
const { PurgeCSS } = require('purgecss');

// https://purgecss.com/configuration.html#options
const PATHS = {
  content: glob.sync(`_site/**/*.html`),
  css: glob.sync(`_site/assets/main-bundle.css`),
};
console.log(PATHS);

const cssBytesBeforeLookup = {};
PATHS.css.forEach((cssFile) => {
  try {
    const data = fs.readFileSync(cssFile, 'utf8');
    cssBytesBeforeLookup[cssFile] = data.length;
  } catch (err) {
    console.error(err);
  }
});

// https://purgecss.com/api.html#usage
(async function () {
  const results = await new PurgeCSS().purge(PATHS);
  results.forEach(({ css, file, rejected }, index) => {
    const cssBytesBefore = cssBytesBeforeLookup[file];
    const cssBytesAfter = css.length;
    const diff = cssBytesAfter - cssBytesBefore;
    console.log({ file, cssBytesBefore, cssBytesAfter, diff });
    if (diff === 0) return;

    // For some reason, output option is not working so I had to update CSS file.
    // https://github.com/FullHuman/purgecss-docs/issues/5#issuecomment-381926354
    fs.writeFile(file, css, (err) => console.log(err ? err : `Saved ${file}`));
  });
})();
