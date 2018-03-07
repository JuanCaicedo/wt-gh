# wt-gh

The goal of this project is to create a cron job on https://webtask.io that
saves notifications from my github account by querying the github api. The time
of the most recent notifications is saved each time and subsequent requests to
the github API only request data after that are each only saved once.

## How to test locally

Create `secrets.txt` with `GH_TOKEN` and `MONGO_URL`

```
$ npm run dev
$ npm run test
```

## How to deploy

```
$ npm run cron

# Or to set up as REST endpoint
$ npm run deploy
```
