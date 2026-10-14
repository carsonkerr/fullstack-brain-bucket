// Job tracker API: one file, Express + MongoDB, full CRUD.
import 'dotenv/config';
import express from 'express';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ---------- middleware ----------
app.use(express.json()); // lets us read req.body as JSON
app.use(express.static(join(__dirname, '../public'))); // serves public/index.html and scripts

// ---------- database ----------
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const jobs = client.db('jobtracker').collection('jobs');

const STATUSES = ['applied', 'interviewing', 'offer', 'rejected'];

function cleanJob(body) {
  const tags = String(body.tags || '')
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag);
  const status = String(body.status || 'applied').trim();
  return {
    company: String(body.company || '').trim(),
    role: String(body.role || '').trim(),
    status: STATUSES.includes(status) ? status : 'applied',
    tags,
  };
}

// ---------- routes ----------

// CREATE
app.post('/api/jobs', async (req, res) => {
  const job = cleanJob(req.body);
  if (!job.company) {
    return res.status(400).json({ error: 'company is required' });
  }
  const newJob = { ...job, notes: [] };
  const result = await jobs.insertOne(newJob);
  res.status(201).json({ ...newJob, _id: result.insertedId });
});

// READ all (optional search: /api/jobs?search=soc matches company, role, or tag)
app.get('/api/jobs', async (req, res) => {
  const search = String(req.query.search || '').trim();
  let filter = {};
  if (search) {
    const text = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter = { $or: [{ company: text }, { role: text }, { tags: text }] };
  }
  const all = await jobs.find(filter).toArray();
  res.json(all);
});

// READ one
app.get('/api/jobs/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const job = await jobs.findOne({ _id: new ObjectId(req.params.id) });
  if (!job) {
    return res.status(404).json({ error: 'job not found' });
  }
  res.json(job);
});

// UPDATE
app.patch('/api/jobs/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const job = cleanJob(req.body);
  if (!job.company) {
    return res.status(400).json({ error: 'company is required' });
  }
  const result = await jobs.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: job }
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'job not found' });
  }
  res.json({ ...job, _id: req.params.id });
});

// ADD A NOTE: appends { date, text } to the job's notes log
app.post('/api/jobs/:id/notes', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const text = String(req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }
  const note = { date: new Date().toISOString(), text };
  const result = await jobs.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $push: { notes: note } }
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: 'job not found' });
  }
  res.status(201).json(note);
});

// DELETE
app.delete('/api/jobs/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const result = await jobs.deleteOne({ _id: new ObjectId(req.params.id) });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'job not found' });
  }
  res.json({ deleted: req.params.id });
});

// ---------- start ----------
await client.connect();
app.listen(PORT, () => {
  console.log(`Job tracker running on http://localhost:${PORT}`);
});
