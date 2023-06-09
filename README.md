# StateManagementApp

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨
## First

- Run `npm install` to download all dependencies.

- Run `nx serve state-management-frontend` to serve frontend angular app in dev mode.

- Run `nx serve state-management-backend` to serve backend nestJs api in dev mode.

## If you want to use Docker

After installing docker make sure the .env.development file is created and setup at the root level as per .env.example

the run 

```bash
    docker compose up
```

this will build and download any required images and start 2 containers, one for the API and one for postgres.

CURRENTLY ONLY BACKEND SERVER IS STARTED!! 

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

