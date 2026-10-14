# Fullstack Brain Bucket | Job Tracker
> track job applications and their status.

`@carsonkerr` | `2026-10-13` | `HOTEL`

## deployments + codebase

| resource | link |
|---|---|
| `main` | [code](https://github.com/carsonkerr/fullstack-brain-bucket/tree/main) |
| PROD | [GCP](https://carson.barrycumbie.com/) |
| `dev` | [code](https://github.com/carsonkerr/fullstack-brain-bucket/tree/dev) |
| DEV | [Render](https://carson-fullstack-brain-bucket.onrender.com/) |
| docs | [`docs/`](https://github.com/carsonkerr/fullstack-brain-bucket/tree/main/docs) |
| CI/CD workflow | [`re-deploy-main-to-gcp.yml`](https://github.com/carsonkerr/fullstack-brain-bucket/blob/main/.github/workflows/re-deploy-main-to-gcp.yml) |
| successful PROD deployment | [GitHub Action](https://github.com/carsonkerr/fullstack-brain-bucket/actions/runs/38512935546) |

## HOTEL grading dashboard

| requirement | evidence |
|---|---|
| MongoDB connection | [server code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L16-L24) |
| GET all | [endpoint code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L55-L65) |
| GET one | [endpoint code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L67-L77) |
| filtered GET (`?search=`) | [endpoint code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L55-L65) |
| POST / create | [endpoint code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L44-L53) |
| PATCH / update | [endpoint code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L79-L96) |
| DELETE | [endpoint code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/server/job.js#L118-L128) |
| frontend `fetch()` | [client code](https://github.com/carsonkerr/fullstack-brain-bucket/blob/fd6e6f7d8e514f0efd3573e1f336fdf841f6fe3e/public/js/api.js#L3-L38) |
| persistent CRUD | [PROD app](https://carson.barrycumbie.com/) |
| HOTEL milestone | [milestone](https://github.com/carsonkerr/fullstack-brain-bucket/milestone/1) |
| example issue | [issue #9](https://github.com/carsonkerr/fullstack-brain-bucket/issues/9) |
| development branch | [`hotel/patch-update-job`](https://github.com/carsonkerr/fullstack-brain-bucket/tree/hotel/patch-update-job) |
| feature → dev | [PR #10](https://github.com/carsonkerr/fullstack-brain-bucket/pull/10) |
| dev → main | [PR #11](https://github.com/carsonkerr/fullstack-brain-bucket/pull/11) |
| PROD deployment | [GitHub Action](https://github.com/carsonkerr/fullstack-brain-bucket/actions/runs/38512935546) |

## architecture

```text
client → fetch() → Express REST API → MongoDB Atlas
```

```text
feature → PR → dev → PR → main → GitHub Actions → GCP
```

### stack

`HTML/CSS/JS` | `Node.js` | `Express` | `REST` | `MongoDB` | `Atlas` | `Git/GitHub` | `Render` | `GCP` | `Nginx` | `PM2` | `GitHub Actions`

### project structure

```text
.
├── .github/
│   └── workflows/
│       └── re-deploy-main-to-gcp.yml
├── docs/
│   └── README.md
├── public/
│   ├── index.html
│   └── js/
│       ├── api.js
│       ├── main.js
│       └── ui.js
├── server/
│   ├── job.js
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── package-lock.json
```

### GCP

external IP: `136.83.21.247`\
Linux user: `carson_kerr04`\
instructor SSH public key installed: `yes`
