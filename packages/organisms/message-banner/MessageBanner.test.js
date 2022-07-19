/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render } from "@testing-library/svelte";
import MessageBanner from "./MessageBanner.svelte";

test("Component renders", () => {
  const results = render(MessageBanner, {});
  expect(() => results.toHaveClass("duk-message-banner"));
});
