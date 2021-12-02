# Dusk UI Kit - Organism - Wizard

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/dusk-ui-kit/?path=/story/components-atoms-wizard)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/dusk-ui-kit/docs/components/atoms/wizard)

## Installation

```
npm i -D @dusk-network/wizard
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/organisms/wizard/Wizard_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/organisms/wizard/Wizard_01.svelte -->

```svelte
<script>
  import Wizard, { Step } from "@dusk-network/wizard";
</script>

<Wizard stepCount="{2}">
  <h3 slot="title">Wizard title</h3>
  <Step step="{1}">step 1</Step>
  <Step step="{2}">step 2</Step>
</Wizard>
```

<!-- MARKDOWN-AUTO-DOCS:END -->
