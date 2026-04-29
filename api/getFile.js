import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const required = ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH'];
const repoBase = () => `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;

function toSafeRepoPath(input) {
  const normalized = input.replaceAll('\\', '/').replace(/^\/+/, '');
  if (normalized.includes('..')) throw new Error('Ruta inválida');
  return normalized;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const rawPath = req.query.path;
  if (!rawPath) return res.status(400).json({ error: 'path es requerido' });

  try {
    const safePath = toSafeRepoPath(rawPath);
    const hasEnv = required.every((key) => Boolean(process.env[key]));

    if (hasEnv) {
      const response = await fetch(`${repoBase()}/contents/${encodeURIComponent(safePath)}?ref=${process.env.GITHUB_BRANCH}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      const data = await response.json();
      if (!response.ok) return res.status(response.status).json({ error: data.message || 'Error GitHub API' });
      return res.status(200).json({ path: safePath, sha: data.sha, content: Buffer.from(data.content || '', 'base64').toString('utf-8') });
    }

    const fullPath = path.join(process.cwd(), safePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    const sha = crypto.createHash('sha1').update(content).digest('hex');
    return res.status(200).json({ path: safePath, sha, content, source: 'filesystem' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Error interno' });
  }
}
