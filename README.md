# JobTrail

## Tech Stack
- Nx monorepo, typescript, docker, k8s
- **Front-End**: React, React Router, react-hook-form, Tailwind, shadcn/ui, Apollo Client, vite, webpack
- **Back-End**: Nest.js, Typeorm, PostgreSQL, Apollo GraphQL API

## Structure
This app is deployed to a local k8s cluster as a [staging](http://job-trail.local/). For learning and testing purposes.

It's deployed to prod at AWS EC2 using Github Actions.


## Local development
### Run tasks

To run the dev servers:

```sh
nx run-many -t serve
```

To create a production bundle:

```sh
npx nx build
```

To see all available targets to run for a project, run:

```sh
npx nx show project 
```

To create a migration:
```sh
nx generate-migration server --name=<name>
```

Release a server to staging: (bump version, build image, deploy to k8s)
```sh
nx run server:release --spec <patch|minor|major>
```

Release a react-client to staging: (bump version, build image, deploy to k8s)
```sh
nx run react-client:release --spec <patch|minor|major>
```

Local staging
http://staging-job-trail.localhost

## TODO: Local k8s cluster 
1. create db secrets
kubectl create secret generic db-secret --from-literal=DB_NAME=<db-name> --from-literal=DB_USERNAME=<db-username> --from-literal=DB_PASSWORD=<db-password>
1. /etc/hosts => job-trail.local record

## TODO: Set up CI!

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```
