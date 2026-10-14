// api.js: the only file that talks to the server. Each function = one REST call.

async function apiGetJobs(search) {
  const url = search ? `/api/jobs?search=${encodeURIComponent(search)}` : '/api/jobs';
  const response = await fetch(url);
  return response.json();
}

async function apiCreateJob(job) {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  return response.json();
}

async function apiUpdateJob(id, job) {
  const response = await fetch(`/api/jobs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });
  return response.json();
}

async function apiAddNote(id, text) {
  const response = await fetch(`/api/jobs/${id}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
}

async function apiDeleteJob(id) {
  const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
  return response.json();
}
