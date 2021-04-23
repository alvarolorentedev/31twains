# 31twains

#Migrations

for remote migrations of the database run

```sh
NODE_TLS_REJECT_UNAUTHORIZED=0 DATABASE_URL="$(heroku config:get DATABASE_URL -a 31twains)?ssl=true" npm run migrate:remote:up
```