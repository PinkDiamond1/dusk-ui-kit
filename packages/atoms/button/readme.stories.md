# ⚛️ Button

Buttons express what action will occur when a user clicks or touches it.

Buttons are used to trigger an action, such as _create_, _read_, _update_ or _delete_. Any given page can have up to a **maximum of two** primary buttons. Any remaining calls-to-action should be presented as secondary or info variants.

⚠️ Do not use buttons as navigational elements, use links when the intention is to take the user to a new page.

## Variants

Buttons come in a variety of flavours that should be utilised according to the following instructions.

| Variant   | Usage                                                                |
| --------- | -------------------------------------------------------------------- |
| Primary   | Primary buttons are used for the principle call to action on a page. |
| Secondary | Secondary buttons are used for the secondary actions on a page.      |
| Info      | Info buttons are used for a passive action on a page.                |
| Success   | Success buttons are used for a positive action on a page.            |
| Warning   | Warning buttons are used for a risky action on a page.               |
| Danger    | Danger buttons are used for a negative action on a page.             |

## Size

Buttons come in a few different sizes for when the surrounding space changes.

| Size  | Usage                                                                |
| ----- | -------------------------------------------------------------------- |
| Large | Primary buttons are used for the principle call to action on a page. |
| Small | Secondary buttons are used for the secondary actions on a page.      |

## Actions

When the action required by a user has more than one option, always use one primary variant button for the most agreeable option, with secondary and info variants being available options.

Negative action buttons will be on the left. Positive action buttons should be on the right.

## Usage

```js
<script>
import Button, { Label, Group } from "@dusk/button";

function onClick() {
  alert("Thanks");
}
</script>
<Button variant="brand" tone="marketing" on:click="{onClick}">
  <Label>Click me</Label>
</Button>
```
