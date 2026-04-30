const json = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || data.message || 'Error inesperado';
    throw new Error(message);
  }
  return data;
};

export const githubService = {
  async getFiles() {
    const response = await fetch('/api/getFiles');
    return json(response);
  },

  async getFile(path) {
    const response = await fetch(`/api/getFile?path=${encodeURIComponent(path)}`);
    return json(response);
  },

  async saveFile(path, content, message) {
    const response = await fetch('/api/saveFile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, content, message }),
    });
    return json(response);
  },

  async commitChanges(paths) {
    const response = await fetch('/api/commitChanges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths }),
    });
    return json(response);
  },
};
