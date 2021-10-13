/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Accordion from "./Accordion.svelte";

test("Component renders", () => {
  const results = render(Accordion);
  expect(() => results.toHaveClass("duk-accordion"));
});
