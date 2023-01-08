# Documentation

The package exposes functions and properties to setup the OAuth flow and to use the REST API.

## Setup

### initialize

`function`

Provide the application information to the package.

```js
initialize({
  clientId: 'your-client-id',
  ...events,
})
```

## Authorization

### signInWithRedirect

`function`

Sends to the authorization page and continues with the OAuth redirect flow.

### signInWithPopup

`function`

Launch the authorization page in a popup window.

### signOut

`function`

Remove the authenticated user.

## User

### currentUser

`User`

Returns the authenticated user if it's available.

```ts
interface User {
  email: string
  name: string
  avatar: string
}
```

### isLoggedIn

`boolean`

Returns whether there is an authenticated user or not.

## Record

All these record functions expect the record name as argument.

[Learn how to work the records.](https://spot.itmarck.com/docs#rest-api)

### getRecord

`async function`

```js
await getRecord('example')
```

### setRecord

`async function`

```js
// It can be set any JSON value.
const value = 123
await setRecord('example', value)
```

### removeRecord

`async function`

```js
await removeRecord('example')
```

## Events

### onUserChanged

`function`

Event sent when the authenticated user is updated. Whether the user logs in or logs out.

```js
const config = {
  /**
   * @param {User | undefined} user This is the `currentUser`.
   */
  onUserChanged: function (user) {},
}

initialize(config)
```
