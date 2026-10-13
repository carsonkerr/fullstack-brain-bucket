// main.js: wires events to api.js (server) and ui.js (page).

// Keep the loaded jobs so Edit can find one without another request.
let currentJobs = [];

async function loadJobs() {
  const search = document.querySelector('#searchBox').value.trim();
  currentJobs = await apiGetJobs(search);
  renderJobs(currentJobs);
}

// Add or save: the hidden id decides which.
document.querySelector('#jobForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // stop the page from reloading

  const id = document.querySelector('#jobId').value;
  const job = readForm();
  const result = id ? await apiUpdateJob(id, job) : await apiCreateJob(job);

  showMessage(result.error || '');
  if (!result.error) {
    resetForm();
    loadJobs();
  }
});

// One listener on the table handles every Edit/Delete/Add-note button (event delegation).
document.querySelector('#jobList').addEventListener('click', async (event) => {
  const id = event.target.dataset.id;
  if (!id) return;

  if (event.target.classList.contains('note-btn')) {
    const input = event.target.parentElement.querySelector('.note-input');
    const result = await apiAddNote(id, input.value);
    showMessage(result.error || '');
    if (!result.error) loadJobs();
  }

  if (event.target.classList.contains('edit-btn')) {
    fillForm(currentJobs.find((job) => job._id === id));
  }

  if (event.target.classList.contains('delete-btn')) {
    await apiDeleteJob(id);
    loadJobs();
  }
});

document.querySelector('#searchBtn').addEventListener('click', loadJobs);

document.querySelector('#clearFilterBtn').addEventListener('click', () => {
  document.querySelector('#searchBox').value = '';
  loadJobs();
});

loadJobs();
