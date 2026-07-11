import fs from 'node:fs';

function links(dir, prefix = './') {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort()
    .map((f) => `- [${f.replace(/\.md$/, '')}](${prefix}${f})`)
    .join('\n');
}

const pyNotes = links('Python');
const pyEx = fs.existsSync('Python/Examples')
  ? links('Python/Examples', './Examples/')
  : '';
const jsNotes = links('Javascript');
const jsDom = links('Javascript/DOM', './DOM/');
const jsEx = fs.existsSync('Javascript/Examples')
  ? links('Javascript/Examples', './Examples/')
  : '';

fs.writeFileSync(
  'Python/README.md',
  `# Python

_Language core, stdlib, and common libraries_

---

## Notes

${pyNotes}

## Libraries & stdlib (highlights)

- [os](./os.md) · [pathlib](./pathlib.md) · [shutil](./shutil.md) · [glob_module](./glob_module.md) · [tempfile](./tempfile.md)
- [csv](./csv.md) · [pandas](./pandas.md) · [json](./json.md) · [sqlite3](./sqlite3.md)
- [dotenv](./dotenv.md) · [sys](./sys.md) · [subprocess](./subprocess.md) · [argparse](./argparse.md)
- [functools](./functools.md) · [itertools](./itertools.md) · [hashlib](./hashlib.md) · [secrets](./secrets.md) · [random](./random.md)
- [lambda](./lambda.md) · [statistics](./statistics.md) · [requests_http](./requests_http.md) · [urllib_parse](./urllib_parse.md)

## Examples

${pyEx}

---

[← Back to library](../README.md)
`,
);

fs.writeFileSync(
  'Javascript/README.md',
  `# JavaScript

_Language core, browser APIs, and Node.js modules_

---

## Notes

${jsNotes}

## Node.js modules (highlights)

- [path](./path.md) · [fs](./fs.md) · [process](./process.md) · [node_os](./node_os.md) · [http_node](./http_node.md)
- [dotenv](./dotenv.md) · [csv](./csv.md) · [buffer](./buffer.md) · [stream](./stream.md)
- [child_process](./child_process.md) · [crypto_node](./crypto_node.md) · [events_node](./events_node.md)
- [util](./util.md) · [url_node](./url_node.md) · [arrow_functions](./arrow_functions.md)

## DOM

${jsDom}

## Examples

${jsEx}

---

[← Back to library](../README.md)
`,
);

console.log('READMEs updated');
