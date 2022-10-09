# Migration App

This guide will walk you through the steps on how to move from Very Good Security to Basis Theory iteratively without any downtime to your existing applications and systems.

This guide was written in JavaScript utilizing Node.JS 16 runtime. Please ensure you have [Node installed](https://nodejs.org/).

## Guide

| Step                                                                      | Description                                                                                                                                                                                                  |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Step 1 - Existing Application](./01-existing-application/)               | This is an existing application fully utilizing the VGS Collect and VGS Proxy.                                                                                                                               |
| [Step 2 - Add Basis Theory Elements](./02-add-elements/)                  | This application replaces VGS Collect.js with Basis Theory Elements and introduces a Basis Theory Proxy as a shim to ensure backwards compatibility with backend APIs and services using VGS Outbound Proxy. |
| [Step 3 - Migrate Data from VGS to Basis Theory](./03-migrate-data)       | This application demonstrates how to migrate data from VGS to Basis Theory utilizing a VGS Outbound Proxy and a Basis Theory Proxy configured with a Reactor to re-tokenize the data.                        |
| [Step 4 - Replace VGS Proxy with Basis Theory Proxy](./04-replace-proxy/) | This application removes the Basis Theory Proxy shim we created in Step 2 and utilizes Basis Theory Proxy for outbound calls.                                                                                |
