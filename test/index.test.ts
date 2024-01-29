// // test/index.test.ts
// import { describe, expect, it } from "bun:test";
// import { Elysia } from "elysia";

// describe("Elysia", () => {
//   it("return a response", async () => {
//     // Mock Farcaster Hub validation endpoint
//     const validateMessageMock = async (messageBytes: string) => {
//       const response = await fetch(
//         "https://nemes.farcaster.xyz:2281/v1/validateMessage",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/octet-stream",
//           },
//           body: Buffer.from(messageBytes, "hex"),
//         }
//       );
//       return response.json();
//     };

//     expect(validateMessageMock("0x00")).toBe("d");
//   });
// });
