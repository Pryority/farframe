// test/index.test.ts
import { BASE_URL } from "@/constants";
import { describe, expect, it } from "bun:test";
import { Elysia } from "elysia";

describe("FarFrame", () => {
  it("returns a 200 response", async () => {
    const response = await fetch("https://farframe.fly.dev/", {
      method: "GET",
    });
    expect(response.status).toBe(200);
  });
  it("returns a the new frame", async () => {
    const response = await fetch("https://farframe.fly.dev/api/frame", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    expect(response.status).toBe(200);
  });
});
