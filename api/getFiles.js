const required = ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH'];

function validateEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);
}

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

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    validateEnv();
    const url = `${repoBase()}/git/trees/${process.env.GITHUB_BRANCH}?recursive=1`;
    const response = await fetch(url, { headers: githubHeaders() });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.message || 'Error GitHub API' });

    const files = (data.tree || []).filter((f) => f.type === 'blob' && /\.(html|css|js)$/i.test(f.path));
    const presentations = buildPresentations(files);

    return res.status(200).json({ files, presentations });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error interno' });
  }
}
