import fs from 'node:fs/promises';
import path from 'node:path';

const required = ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH'];

function repoBase() {
  return `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;
}

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

function buildPresentations(files) {
  const map = new Map();
  files.forEach((f) => {
    const chunks = f.path.split('/');
    if (chunks.length < 2) return;
    const folder = chunks[0];
    if (/_v\d+$/i.test(folder)) return;
    const item = map.get(folder) || { name: folder, files: [] };
    item.files.push(f.path);
    map.set(folder, item);
  });

  return Array.from(map.values())
    .map((p) => ({
      ...p,
      files: p.files.sort(),
      mainFile: p.files.find((x) => x.toLowerCase().endsWith('.html')) || p.files[0],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function walkFiles(dir, baseDir, out) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    if (['node_modules', '.vercel', 'api', 'js', 'public'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(full, baseDir, out);
      continue;
    }
    if (!/\.(html|css|js)$/i.test(entry.name)) continue;
    const rel = path.relative(baseDir, full).replaceAll('\\', '/');
    out.push({ path: rel, type: 'blob' });
  }
}

async function getFilesFromLocalFs() {
  const baseDir = process.cwd();
  const out = [];
  await walkFiles(baseDir, baseDir, out);
  return out;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const hasEnv = required.every((key) => Boolean(process.env[key]));
    let files = [];

    if (hasEnv) {
      const url = `${repoBase()}/git/trees/${process.env.GITHUB_BRANCH}?recursive=1`;
      const response = await fetch(url, { headers: githubHeaders() });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json({ error: data.message || 'Error GitHub API' });
      files = (data.tree || []).filter((f) => f.type === 'blob' && /\.(html|css|js)$/i.test(f.path));
    } else {
      files = await getFilesFromLocalFs();
    }

    const presentations = buildPresentations(files);
    return res.status(200).json({ files, presentations, source: hasEnv ? 'github' : 'filesystem' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error interno' });
  }
}
