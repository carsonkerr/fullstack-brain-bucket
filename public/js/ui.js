// ui.js: the only file that touches the page (DOM). No fetch calls here.

function showMessage(text) {
  document.querySelector('#message').textContent = text;
}

// Build the table rows from an array of jobs.
function renderJobs(jobs) {
  const list = document.querySelector('#jobList');
  list.innerHTML = '';

  for (const job of jobs) {
    const row = document.createElement('tr');

    // textContent (not innerHTML) so user-typed text can't inject HTML.
    for (const value of [job.company, job.role, job.status, job.tags.join(', ')]) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    }

    // Notes cell: the log (date + text), then a box to add a new note.
    const notesCell = document.createElement('td');
    for (const note of job.notes) {
      const line = document.createElement('div');
      line.className = 'small';
      line.textContent = `${new Date(note.date).toLocaleDateString()}: ${note.text}`;
      notesCell.appendChild(line);
    }
    const noteForm = document.createElement('div');
    noteForm.className = 'input-group input-group-sm mt-1';
    noteForm.innerHTML =
      '<input class="form-control note-input" placeholder="New note">' +
      '<button class="btn btn-outline-secondary note-btn">Add</button>';
    noteForm.querySelector('.note-btn').dataset.id = job._id;
    notesCell.appendChild(noteForm);
    row.appendChild(notesCell);

    const actions = document.createElement('td');
    actions.innerHTML =
      '<button class="btn btn-sm btn-outline-primary edit-btn">Edit</button> ' +
      '<button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>';
    // Remember which job this row belongs to.
    actions.querySelector('.edit-btn').dataset.id = job._id;
    actions.querySelector('.delete-btn').dataset.id = job._id;
    row.appendChild(actions);

    list.appendChild(row);
  }
}

// Read the form fields into a plain object.
function readForm() {
  return {
    company: document.querySelector('#company').value,
    role: document.querySelector('#role').value,
    status: document.querySelector('#status').value,
    tags: document.querySelector('#tags').value,
  };
}

// Put a job into the form so it can be edited.
function fillForm(job) {
  document.querySelector('#jobId').value = job._id;
  document.querySelector('#company').value = job.company;
  document.querySelector('#role').value = job.role;
  document.querySelector('#status').value = job.status;
  document.querySelector('#tags').value = job.tags.join(', ');
  document.querySelector('#saveBtn').textContent = 'Save changes';
  document.querySelector('#jobForm').classList.add('editing');
}

function resetForm() {
  document.querySelector('#jobForm').reset();
  document.querySelector('#jobId').value = '';
  document.querySelector('#saveBtn').textContent = 'Add job';
  document.querySelector('#jobForm').classList.remove('editing');
}
