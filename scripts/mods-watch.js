const { resolve } = require('path');
const { existsSync } = require('fs');
const { exec } = require('child_process');
const glob = require('glob');
const Watchpack = require('watchpack');

const pluginsPath = resolve(__dirname, '../plugins');

const wp = new Watchpack();
const files = glob.sync(
  resolve(pluginsPath, '*/{*.js,*.html,!(dist)/**/*.js}')
);
const directories = [];
wp.watch(files, directories);

wp.on('change', (filePath, mtime) => {
  const [, pluginName] = filePath.match(/plugins\/(.+?)\/+?/);
  const pluginPath = resolve(pluginsPath, pluginName);
  const possibleEntryFiles = ['index.js', 'entry.js'];

  for (let i = 0; i < possibleEntryFiles.length; i += 1) {
    const entryFile = possibleEntryFiles[i];
    const entryFilePath = resolve(pluginPath, entryFile);

    if (existsSync(entryFilePath)) {
      const cp = exec(
        `cd ${pluginPath} && parcel build ${entryFile} --no-minify`
      );

      cp.stderr.on('data', console.error);
      cp.stdout.on('data', console.log);

      break;
    }
  }
});
