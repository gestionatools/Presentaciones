const required = ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH'];
const headers = () => ({
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
});
const repoBase = () => `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;

async function getTree() {
  const resp = await fetch(`${repoBase()}/git/trees/${process.env.GITHUB_BRANCH}?recursive=1`, { headers: headers() });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.message || 'No se pudo leer árbol');
  return data.tree || [];
}

function buildVersionedPath(path, tree) {
  const parts = path.split('/');
  if (parts.length < 2) return path;
  const baseFolder = parts[0];
  const rest = parts.slice(1).join('/');
  const regex = new RegExp(`^${baseFolder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}_v(\\d+)$`, 'i');
  const versions = new Set();

  tree.forEach((node) => {
    if (!node.path) return;
    const root = node.path.split('/')[0];
    const match = root.match(regex);
    if (match) versions.add(Number(match[1]));
  });

  const next = versions.size ? Math.max(...versions) + 1 : 1;
  const padded = String(next).padStart(3, '0');
  return `${baseFolder}_v${padded}/${rest}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { path, content, message } = req.body || {};
  if (!path || typeof content !== 'string') return res.status(400).json({ error: 'path y content son obligatorios' });

  try {
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length) throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);

    const tree = await getTree();
    const versionedPath = buildVersionedPath(path, tree);

    const createResp = await fetch(`${repoBase()}/contents/${encodeURIComponent(versionedPath)}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        message: message || `Create version for ${path}`,
        content: Buffer.from(content, 'utf-8').toString('base64'),
        branch: process.env.GITHUB_BRANCH,
      }),
    });

    const createData = await createResp.json();
    if (!createResp.ok) return res.status(createResp.status).json({ error: createData.message || 'No se pudo guardar versión' });

    return res.status(200).json({
      ok: true,
      sha: createData.content.sha,
      commit: createData.commit.sha,
      versionedPath,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error interno' });
  }
}
