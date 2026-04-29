import { githubService } from '/js/githubService.js';
import { updatePreview } from '/js/preview.js';

let editor;
let currentPath = '';
let currentMode = 'view';
let presentations = [];

const fileList = document.getElementById('fileList');
const currentFile = document.getElementById('currentFile');
const saveButton = document.getElementById('saveButton');
const status = document.getElementById('status');
const previewFrame = document.getElementById('livePreview');
const presentationSelect = document.getElementById('presentationSelect');
const viewModeBtn = document.getElementById('viewModeBtn');
const editModeBtn = document.getElementById('editModeBtn');

const extFromPath = (path) => path.split('.').pop() || 'txt';
const setStatus = (text) => { status.textContent = text; };

function createEditor() {
  return new Promise((resolve) => {
    window.require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs' } });
    window.require(['vs/editor/editor.main'], () => {
      editor = monaco.editor.create(document.getElementById('editor'), { value: '', language: 'html', theme: 'vs-dark', automaticLayout: true });
      resolve();
    });
  });
}

function languageFromExt(ext) {
  if (ext === 'html') return 'html';
  if (ext === 'css') return 'css';
  if (ext === 'js') return 'javascript';
  return 'plaintext';
}

function setMode(mode) {
  currentMode = mode;
  const isEdit = mode === 'edit';
  saveButton.disabled = !isEdit;
  editor.updateOptions({ readOnly: !isEdit });
  viewModeBtn.style.opacity = isEdit ? 0.7 : 1;
  editModeBtn.style.opacity = isEdit ? 1 : 0.7;
  setStatus(isEdit ? 'Modo edición activado' : 'Modo visualización activado');
}

function renderPresentations() {
  presentationSelect.innerHTML = '';
  presentations.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.textContent = p.name;
    presentationSelect.appendChild(opt);
  });
}

function renderFilesForPresentation(name) {
  fileList.innerHTML = '';
  const presentation = presentations.find((p) => p.name === name);
  if (!presentation) return;

  presentation.files.forEach((path) => {
    const btn = document.createElement('button');
    btn.className = 'file-item';
    btn.textContent = path;
    btn.onclick = () => openFile(path, btn);
    fileList.appendChild(btn);
  });

  if (currentMode === 'view' && presentation.mainFile) {
    currentPath = presentation.mainFile;
    currentFile.textContent = presentation.mainFile;
    previewFrame.src = `/${encodeURI(presentation.mainFile)}`;
    setStatus(`Visualizando ${presentation.mainFile}`);
  }
}

async function loadFiles() {
  setStatus('Cargando presentaciones...');
  const data = await githubService.getFiles();
  presentations = data.presentations || [];
  renderPresentations();
  if (presentations.length > 0) {
    presentationSelect.value = presentations[0].name;
    renderFilesForPresentation(presentations[0].name);
  }
  setStatus(`${presentations.length} presentaciones cargadas`);
}

async function openFile(path, buttonEl) {
  try {
    setStatus(`Abriendo ${path}...`);
    document.querySelectorAll('.file-item').forEach((el) => el.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    const { content } = await githubService.getFile(path);
    currentPath = path;
    currentFile.textContent = path;
    editor.setValue(content);
    monaco.editor.setModelLanguage(editor.getModel(), languageFromExt(extFromPath(path)));

    if (currentMode === 'view') {
      previewFrame.src = `/${encodeURI(path)}`;
    } else {
      updatePreview(content, extFromPath(path), previewFrame);
    }

    setStatus(`Archivo abierto: ${path}`);
  } catch (error) {
    setStatus(`Error: ${error.message}`);
  }
}

async function saveCurrentFile() {
  if (!currentPath) return setStatus('Selecciona un archivo primero');
  if (currentMode !== 'edit') return setStatus('Cambia a modo edición para guardar');

  try {
    const content = editor.getValue();
    setStatus('Guardando versión en GitHub...');
    const result = await githubService.saveFile(currentPath, content, `Create version from ${currentPath}`);
    await githubService.commitChanges([result.versionedPath || currentPath]);
    setStatus(`Versión creada: ${result.versionedPath}`);
  } catch (error) {
    setStatus(`Error al guardar: ${error.message}`);
  }
}

(async function init() {
  try {
    await createEditor();
    await loadFiles();

    presentationSelect.addEventListener('change', () => {
      renderFilesForPresentation(presentationSelect.value);
    });

    editor.onDidChangeModelContent(() => {
      if (currentMode === 'edit') {
        updatePreview(editor.getValue(), extFromPath(currentPath), previewFrame);
      }
    });

    saveButton.addEventListener('click', saveCurrentFile);
    viewModeBtn.addEventListener('click', () => setMode('view'));
    editModeBtn.addEventListener('click', () => setMode('edit'));
    setMode('view');
  } catch (error) {
    setStatus(`Error de inicialización: ${error.message}`);
  }
})();
