<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.channelengine.com">
    <img src="https://www.channelengine.com/Themes/ChannelEngine/images/ChannelEngine.svg" alt="Logo" width="600">
  </a>

<h1 align="center">ChannelEngine</h1>

  <p align="center">
    Unofficial node.js API client for <a href="https://www.channelengine.com">ChannelEngine</a>.
    <br />
    Supports pagination and variable request retries.
    <br />
    <br />
    <a href="https://demo.channelengine.net/api/swagger/index.html">Swagger Docs</a>
    ·
    <a href="https://channelengine.zendesk.com/hc/en-us/sections/4406511272733-Merchant-API">ChannelEngine Docs</a>
    ·
    <a href="https://github.com/RienNeVaPlus/channelengine/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#example">Example</a></li>
      </ul>
    </li>
    <li><a href="#built-with">Built with</a></li>
    <li><a href="#licence">Licence</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>


<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

In order to connect to ChannelEngine, a `tenant` and an `apiKey` are required.

The tenant will be provided by ChannelEngine. The API key can then be generated at `https://$TENANT.channelengine.net/apikeys`.

### Installation

Yarn:
```bash
yarn add channelengine
```

NPM:

```bash
npm install channelengine
```

### Example

```ts
import {Channelengine} from 'channelengine'

// provided by ChannelEngine
const tenant = 'demo'
const apiKey = 'myApiKey'

// create instance and request IN_PROGRESS orders
const api = new Channelengine(tenant, apiKey, {maxRetries: 10, version: 2})
const response = await api.GET('orders', {
  statuses: 'IN_PROGRESS'
})

// log result
console.log(res)
```

### Methods

An instance provides the methods `GET`, `POST`, `PATCH`, `PUT` and `DELETE`.

See [Swagger docs](https://demo.channelengine.net/api/swagger/index.html) for details on when to use which method.

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [node.js](https://nodejs.org/)
* [node-fetch](https://github.com/node-fetch/node-fetch)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Licence -->
## Licence

MIT

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Contributors -->
## Contributors

[RienNeVaPlus](mailto:?@rienneva.plus) - ?@rienneva.plus

<p align="right">(<a href="#top">back to top</a>)</p>
