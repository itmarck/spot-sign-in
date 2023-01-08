# spot-sign-in

Simple package to integrate [Spot](https://spot.itmarck.com) in your JavaScript application.

Spot is a service that allows you to integrate a REST API into your application to store user data in the cloud.

[Learn how to use Spot in your project.](https://spot.itmarck.com/docs)

## Installation

You can use this library as a `<script>` tag from a CDN, or as a `spot-sign-in` package on npm.

### CDN

See the [example](example/index.html) file for more information.

```html
<script src="https://unpkg.com/spot-sign-in"></script>
```

### NPM

Available for server and client side.

```sh
# Using npm
npm install spot-sign-in

# Using yarn
yarn add spot-sign-in
```

## Documentation

You can find the Spot documentation [on the website](https://spot.itmarck.com/docs).

### Package

Check out the [documentation](docs/README.md) file to use this package.

## Example

You can find the full example using the CDN installation [here](example/index.html)

```js
import { initialize, signInWithRedirect } from 'spot-sign-in'

initialize({
  clientId: 'your-client-id',
})

const button = document.querySelector('#button')

button.addEventListener('click', () => {
  // Launch the Spot authorization page
  signInWithRedirect()
})
```
