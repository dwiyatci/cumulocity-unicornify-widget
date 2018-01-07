const { exec } = require('child_process');

const [, , ...packages] = process.argv;

const command = packages
  .map(pkg => `(npm up -g ${pkg} && ${pkg} -h || npm i -g ${pkg})`)
  .join(' && ');

const cp = exec(command);

cp.stderr.on('data', console.error);
cp.stdout.on('data', console.log);
