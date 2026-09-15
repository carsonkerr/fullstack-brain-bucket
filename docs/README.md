# fullstack-brain-bucket

### authorship + version

`@carsonkerr` \| `2026-09-14` \| `GOLF`

### attribution

The frontend portion of this project is not mine and comes from Dr. Cumbie:
https://github.com/barrycumbie/charlie-brain-bucket

### deployments, codebase, & repo features 

 | Resource                   | Link                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| PROD codebase                | [`main`](https://github.com/carsonkerr/fullstack-brain-bucket/tree/main)                                                        |
| PROD server                  | [GCP](https://carson.barrycumbie.com/)                                                                                          |
| DEV codebase                 | [`dev`](https://github.com/carsonkerr/fullstack-brain-bucket/tree/dev)                                                          |
| DEV server                   | [Render](https://carson-fullstack-brain-bucket.onrender.com/)                                                                   |
| docs                         | [`docs/`](https://github.com/carsonkerr/fullstack-brain-bucket/tree/main/docs)                                                  |
| published docs               | [GitHub Pages](https://carsonkerr.github.io/fullstack-brain-bucket/)                                                            |
| CI/CD workflow               | [`deploy.yml`](https://github.com/carsonkerr/fullstack-brain-bucket/blob/main/.github/workflows/deploy-main-to-gcp.yml)         |
| successful PROD deployment   | [GitHub Action](https://github.com/carsonkerr/fullstack-brain-bucket/actions/runs/34920008727/job/104229661858)                 |
| resolved GOLF issue          | [issue #](URL)                                                                                                                   |

### user story

- **As a** burgeoning full-stack developer,
- **I want** a CI/CD infrastructure
- **so that** I can develop locally, manage my code in GitHub, and
    automatically deploy changes to DEV and PROD environments.

### narrative

In 2--4 sentences, briefly describe your GOLF infrastructure and what you built/deployed.

### architecture

``` text
LOCAL
  │
  ▼
GitHub
  │
  ├── dev  ──► Render ─────────► DEV
  │
  └── main ──► GitHub Actions ─► GCP ──► PROD
```

### stack

`HTML/CSS/JS` \| `Node.js` \| `Express` \| `Git/GitHub` \| `Render` \|
`GCP` \| `Linux` \| `Nginx` \| `PM2` \| `Certbot` \| `GitHub Actions`

### project structure

``` text
│   .gitignore
│
├───.github
│   └───workflows
│           deploy-main-to-gcp.yml
├───docs
│       README.md
├───public
│   │   index.html
│   ├───assets
│   │   ├───css
│   │   │       style.css
│   │   │
│   │   ├───data
│   │   │       ideas.json
│   │   │
│   │   └───js
│   │           admin.js
│   │           auth-guard.js
│   │           auth.js
│   │           content.js
│   │           form.js
│   │           main.js
│   ├───config
│   │       AGENTS.md
│   │       CHARLIE.md
│   │       CLAUDE.md
│   ├───docs
│   │       sample-content-records.json
│   │       session-2026-06-09-prompts-and-overview.md
│   └───pages
│           admin.html
│           auth.html
│           content.html
│           form.html
└───server
        app.js
        package-lock.json
        package.json
```

### GCP

external IP: `136.83.21.247`\
Linux user: `carson_kerr04`\
instructor SSH public key installed: `yes`
