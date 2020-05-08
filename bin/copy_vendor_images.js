// https://www.npmjs.com/package/fs-extra
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

// Both src and dest must be directories.
// https://github.com/jprichardson/node-fs-extra/blob/master/docs/copy-sync.md
const entries = [
  {
    src: 'node_modules/@fortawesome/fontawesome-free/svgs/regular',
    dest: 'assets/images/vendor/fontawesome-regular',
  },
  {
    src: 'node_modules/@fortawesome/fontawesome-free/svgs/solid',
    dest: 'assets/images/vendor/fontawesome-solid',
  },
  {
    src: 'node_modules/simple-icons/icons',
    dest: 'assets/images/vendor/simple-icons',
  },
];

entries.forEach(async ({ src, dest }) => {
  await ensureDistDir(dest);
  await copyFile(src, dest);
  await deleteFiles(glob.sync(`${dest}/**/*.js`));
});

async function ensureDistDir(dir) {
  try {
    await fs.mkdirp(dir);
  } catch (error) {
    console.error(error);
  }
}

async function copyFile(src, dest) {
  try {
    await fs.copySync(src, dest, { errorOnExist: true });
    console.log(`Copied files recurresively
    from: ${src}
    to:   ${dest}
  `);
  } catch (error) {
    console.error(error);
  }
}

async function deleteFiles(files) {
  files.forEach(async (fileToRemove) => {
    try {
      await fs.remove(fileToRemove);
      // console.log(`Removed ${fileToRemove}`);
    } catch (error) {
      console.error(error);
    }
  });
}
