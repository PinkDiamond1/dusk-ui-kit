import { addons } from "@storybook/addons";
import "@storybook/addon-storysource/register";
import "@storybook/addon-actions/register";
import "@storybook/addon-notes/register";
import "@storybook/addon-backgrounds/register";
import "@storybook/addon-viewport/register";
import "@storybook/addon-a11y/register";
import "@storybook/addon-links/register";
import "@storybook/addon-knobs/register";
import duskTheme from "./themes/dusk";

addons.setConfig({
  theme: duskTheme
});
