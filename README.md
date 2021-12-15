# hey-shell-dot-xyz

* https://heyshell.xyz

## Development

Install dependencies:

```
yarn
```

Generate TypeScript bindings for the shell subgraph (this currently points at the Rinkeby subgraph):

```
yarn codegen
```

Run the site locally (will start bound to `localhost:8080` if the port is available):

```
yarn start
```

Build the site to `./dist`:

```
yarn build
```

Remove build artifacts:

```
yarn clean
```
