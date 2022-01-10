# Dusk UI Kit - Atom - QrCode

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/dusk-ui-kit/storybook/?path=/story/components-atoms-qrcode--default-qr-code)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/dusk-ui-kit/docs/components/atoms/qr-code/QrCode)

## Installation

```
npm i -D @dusk-network/qr-code
```

## Config

The qrcode npm package needs to be pre-bundled when using Vite

```
vite: () => ({
    optimizeDeps: {
        include: ["qrcode"],
    },
}),
```
