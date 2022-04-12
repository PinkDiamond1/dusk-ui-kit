/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import Gauge from "./Gauge.svelte";

test("Component renders", () => {
  const results = render(Gauge, {});
  expect(() => results.toHaveClass("duk-gauge"));
});
