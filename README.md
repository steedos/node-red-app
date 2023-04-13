Steedos Node-RED Starter Application
===

## Getting Started

```bash
yarn
yarn start
```

[http://127.0.0.1:1880/admin](http://127.0.0.1:1880/admin)


## Customising Node-RED

This repository is here to be cloned, modified and re-used to allow anyone create their own Node-RED based application that can be quickly deployed with Steedos Platofrm.

The web content you get when you go to the application's URL is stored under the public directory.

## Environment Variables

The following environment variables can be used to configure the application:

- NODE_RED_CREDENTIAL_SECRET - the secret
- NODE_RED_STORAGE_NAME - the Cloudant service name as exposed in VCAP_SERVICES
- NODE_RED_STORAGE_DB_NAME - the name of the database to use on Cloudant
- NODE_RED_STORAGE_APP_NAME - the prefix used in document names, allowing multiple instances to share the same database.
- NODE_RED_USERNAME, NODE_RED_PASSWORD - if set, used to secure the editor