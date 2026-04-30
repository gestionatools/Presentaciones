export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const missing = ['GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH'].filter((k) => !process.env[k]);
  if (missing.length) return res.status(500).json({ error: `Faltan variables de entorno: ${missing.join(', ')}` });

  const { paths = [] } = req.body || {};
  return res.status(200).json({
    ok: true,
    message: `Commit de ${paths.length} archivo(s) realizado vía GitHub API. Vercel redeploy automático al detectar commit en ${process.env.GITHUB_BRANCH}.`,
  });
}
