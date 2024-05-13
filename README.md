Steedos Node-RED Starter Application
===

## Getting Started

```bash
yarn
yarn start
```

[http://127.0.0.1:1880/admin](http://127.0.0.1:1880/admin)


## Environment Variables

The following environment variables can be used to configure the application:

```
NODE_RED_URL=http://127.0.0.1:1880
NODE_RED_CREDENTIAL_SECRET=steedos
NODE_RED_USERNAME=

# OIDC 验证
OIDC_CONFIG_URL=https://id.steedos.cn/realms/master/.well-known/openid-configuration
OIDC_CLIENT_ID=steedos-oidc-public
OIDC_CLIENT_SECRET=none

# S3 存储，可选
NODE_RED_S3_REGION=
NODE_RED_S3_BUCKET=
NODE_RED_APP_NAME=
```