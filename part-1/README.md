# Installation and plugin creation

The new Strapi V4 plugin architecture can be used in many ways:

•	you can create a pure API plugin with Strapi Server plugin:
https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/server.html#entry-file
•	you can develop a plugin with a UI and integrate it into Admin website with Strapi Admin plugin:
https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html#entry-file
•	you can use your plugin to inject some components directly into Strapi Admin website: https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/admin-panel.html#injection-zones-api

To cover a maximum of purpose, we decide to use all these ways to create our awesome plugin:
•	We need to crawl all Strapi Content-Types (singles/collections/components) and find all text, numeric data fields. 
•	We need to create a specific collection to store crawled results.
•	We need to create an internal API to CRUD the collection above.
•	We need to create a component to inject the help tooltips into a document.
•	We need to compile the plugin as a standalone application.
•	We need to deploy the plugin.

This repo includes all code to follow this guideline: [How to install Strapi and the create a new plugin](https://medium.com/p/65dbcd4b1b42)

to install, seed and launch:

`yarn && yarn seed && yarn develop`
