# JobTrail

## Structure
This app is deployed to a local k8s cluster as a [staging](http://job-trail.local/). For learning and testing purposes.

It's deployed to prod at AWS EC2 using Github Actions.

## Run tasks

To run the dev server:

```sh
npm start
```

To create a production bundle:

```sh
npx nx build
```

To see all available targets to run for a project, run:

```sh
npx nx show project 
```

## TODO: Set up CI!

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```
