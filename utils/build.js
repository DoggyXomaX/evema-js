const fs = require('fs');

const {
  forceMinify,
  output_file,
  scripts_path,
  output_minified_file
} = require('./config.json');

const files = [];
console.log(`Reading content from ${scripts_path}`);
fs.readdirSync(scripts_path, {}).forEach((filename) => {
  console.log(`\t${filename}`);
  files.push(fs.readFileSync(`${scripts_path}/${filename}`, { encoding: 'utf8' }));
});
console.log('[ OK ]');

console.log(`Writing content to file ${output_file}`);
fs.writeFileSync(output_file, files.join('\n'), { encoding: 'utf8' });
console.log('[ OK ]');

if (process.argv[2] !== 'minify' && !forceMinify) return;

const minifier = require('node-minify');
console.log(`Minify from ${output_file} to ${output_minified_file}`);
minifier.minify({
  compressor: 'gcc',
  input: output_file,
  output: output_minified_file,
  callback: function(err) {
    if (!err) {
      console.log('[ OK ]');
    } else {
      console.error(err);
    }
  }
});
