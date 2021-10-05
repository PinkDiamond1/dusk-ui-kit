/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Wizard from "./Wizard.svelte";

test("it renders", () => {
  const results = render(Wizard);
  expect(() => results.toHaveClass("duk-wizard"));
});
