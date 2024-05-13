"use strict";
require('dotenv-flow').config({});
const path = require('path');
const lodash = require('lodash');


// Node-Red Configuration
// https://nodered.org/docs/user-guide/runtime/configuration

const s3settings = (process.env.NODE_RED_S3_REGION && process.env.NODE_RED_S3_BUCKET && process.env.NODE_RED_APP_NAME) ? {
    awsRegion: process.env.NODE_RED_S3_REGION,
    awsS3Bucket: process.env.NODE_RED_S3_BUCKET,
    awsS3Appname: process.env.NODE_RED_APP_NAME,
    storageModule: require('node-red-contrib-storage-s3'),
} : {}

const adminAuth = process.env.OIDC_CONFIG_URL? {
    type: "strategy",
    strategy: {
        name: "azuread-openidconnect",
        label: "Sign in with OIDC",
        icon: "fa-lock",
        strategy: require("passport-azure-ad").OIDCStrategy,
        options: {
            identityMetadata: process.env.OIDC_CONFIG_URL,
            clientID: process.env.OIDC_CLIENT_ID,
            clientSecret: process.env.OIDC_CLIENT_SECRET,
            redirectUrl: process.env.NODE_RED_URL + '/auth/strategy/callback',
            responseType: "code",
            responseMode: "query",
            passReqToCallback: false,
            allowHttpForRedirectUrl: true,
            scope: ["openid", "profile", "email"],
            verify: function(iss, sub, profile, jwtClaims, access_token, refresh_token, params, done) {
                const userInfo = {
                    name: jwtClaims.name,
                    username: jwtClaims.email,
                    email: jwtClaims.email,
                }
                done(null, userInfo);
            }
        }
    },
    users: function(username) {
        return new Promise(function(resolve) {
            // Do whatever work is needed to check username is a valid
            // user.
            if (process.env.NODE_RED_USERNAME && process.env.NODE_RED_USERNAME.split(",").indexOf(username)>=0) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: username, permissions: "*" };
                resolve(user);
            } else {
                // Resolve with null to indicate this user does not exist
                resolve(null);
            }
        });
    },
} : {}

module.exports = {
    flowFile: path.join(__dirname,'flows.json'),
    flowFilePretty: true,
    credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET || 'steedos',
    userDir: path.join(__dirname, '.node-red'),
    functionGlobalContext: {
        lodash
    }, 
    adminAuth,
    logging: {
        // Console logging
        console: {
            level: "debug",
            metrics: false,
            audit: false
        }
    },
    ...s3settings 
};
