import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import {
  BASE_URL,
  PORT,
  generateFarcasterFrame,
  validateMessage,
} from "@/utils";
import staticPlugin from "@elysiajs/static";

const getResponse = async (req: Request): Promise<Response> => {
  let signedMessage;
  try {
    signedMessage = await req.json();
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON in request body" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!signedMessage) {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { untrustedData, trustedData } = signedMessage;

  // Validate the trustedData if it's present
  if (trustedData) {
    const isMessageValid = await validateMessage(trustedData.messageBytes);

    if (!isMessageValid) {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  const choice = untrustedData.buttonIndex;

  let html = "";

  if (choice === 1) {
    html = generateFarcasterFrame(`${BASE_URL}/public/roll.png`, choice);
  } else {
    html = generateFarcasterFrame(`${BASE_URL}/public/roll.png`, choice);
  }

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
};

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
  .get(
    "/",
    () => `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FarFrame</title>
    <meta property="og:title" content="Frame" />
    <meta property="og:image" content="${BASE_URL}/public/initial.png" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${BASE_URL}/public/initial.png" />
    <meta property="fc:frame:button:1" content="\̶̨̢̢̢̨͉͈̫̲̥̯̻͈̥̱̱͎͎̠͇̬̼͙͍̺̬̪͖͉̖̹̂̀̉͋͆̉̋̇̿͑̓̓̔̉̓̿̆͊̃͜
    ̵̧͕͙̝̐͒̈́̈́̄̌̉͌͆͋̐̊̇͑̈̔̿̂̐͂̍̌̄̍̚͝͠͝͠͝͝_̶̧̡̡̧̛͚̣̞̙͎̥̙̗̠̦̞̼̮̲̩͙̺͖̖͇͒̽͒̐̈́̄̃̏̄̈̅̇͐̾̐̋̏̆͐͐̅̈̉́̕͝͝͠͝ͅ_̶̗̦͉̤̪̱̙̬̏̑͌͗̄͂͗͂͜|̵͔̥̳͈̱̲͙̙̪̇͆̈́͒͐̅͑͑͋͜͜͠
    ̸̧̛̳͔̦͇͉̻̮͍̪̉͌̐̒̊̓͊̋͊̃̏̀̄̎̍͂͊̌͒͊́̋̔̉̾̓͘͘̕͠|̸̢̡̧̛̛͇̯͕̟͓̗͇͖͙̗͈̝̝̦͍̬̲̮̬̙̱̠̦͍͓̪̪̅̏͌̌̎̓͋̒̓͋̅̒̿̌̈̉̔̒̈́̄͘͜]̵̛̺̖̘͉̼͇͉͕̝͔̥̱̗̥̲̍̎͒̅̐̏͂̓̆͛͗̏̂͐̂͝[̴̞͕̯͉̝͖̬͎̟͈̞͍̞͈̭́̿͐̆̌̏̒̍̈́̏͋̿̑͛͜͠͠
    ̸̢͉̘͙͙̟͈̯̠̦̩̳͈̙͈̍̓͑͗͒̉͛̓͑̊͆̂̎͆̓̉̈́̈̋͐̆͗̑̅̃̕̕͠]̵̧̡̨̦̻̻̬̩̻͈̱̞͙̳͓̪̟̬͔̹͓̫͍̈̓͋̉̄̌̅͊̄͠|̷̢̛̛̛̺̫̖͕̳͉̩̠̘̖͖̰͎̿̈́̌́͂̇̏̿͒̊͆͊̋͛̅̑͑̉͐̋̀̿͗̚̚̕
    ̸̢̡̧̧̯̯̺̫̭͉͍͉̌̑̏͆̍̋͋̓̓̂͘ͅ ̴̧̪͇̪̻͇͔͓̲̦̣͓̝̙̺̪͍͗͗̅̍͌͂͛̀̈́̃͆͒́̍͜͝ͅ\̸̛̟̘̥͖̺̬͎̬͇͇͉̇̂̇̍̅̿͒̒̊̎̌̈́̍̽́̔̍̏̕͘͘͜͝͝͝͠|̵̨͖̩̟̮͉̰͓̳̠̹̮̮̖̲͉̞̭̭͆̑̔͆̈̊̆͂͘
    ̵̨̹̮̥͓͎̼̞̼͈͔̝̳̥̳̼̫̹̮͍̱̺̳̟̈͌̒̊̓͑̔͑\̸̨̡̨̳̖̞̥͚̮̳̬̳̙̖͇̖͕͉̝͔̟͖̖̹̃́̉̾͗͘ ̸̤̖͈̜͙͔͙͉͓̐̈̽͆͋̈́́̉̇̇̐̑̏̀̆́̍̒̿̇̅́͆̋̽̈̇͘͠͠
    ̶̢͚͎̠͚̯̯̜̹̩̮̜̭̘̭̝̲̰̪͕̭͛͂̅̄̐͌̃̓̔̾̊̀͗̀̉̅̋̈́͗̕͘̚͝͝\̴̮̦̪̣̟̏́̂͋͑̏̈́̉͂̀̀̏̊̈́̓̂͛̓͂̀̓́͒̚̚͘͝
    ̶̧̧̢̛̛̫̖̗̥̳̟̜̘̫̯̪̹̭̭̙̩̜̪̟̙̟͈̫̮̬̥͛̍̋͑̎̉̔̾͂̎́̈́̌̈́͑͒͌͂̕͜\̶̧̨̡̢̨͇̘͇͓̠̖̖͎̬̗̣͇͍̥͍̠̤̗̤̮̎͗̕ͅ_̶̧̡̢͇͎͎͍̞̰͍̜̥͉̗̥͚̗̱͉̜͓̩͙̳̳̑̄̅̍̌̎̆̿͗̓͗͜͝͝ ̶̠̖͙̣̰̖͕͓̹̪͕̩̣͈̥̗͎̰̞̉͆ͅ\̶̮͠\̷̧̢̛̗͍͍͍̯̠̺̜̬͔̳̬̗̙̣͓͚͙͉̭̯̄̀̍͊́̆̐̎̊͑̌̑̀͛́͊̎͒͋̈́̈̔͂͘̚͘͠͝
    ̷̨̨̧̥̤̙͍̫̰͕̰̼͈̫͍̺͙͎̪͓̳̙̟̜̘̤͈̫̮̫̳͊̌̍̊̄̊̊̆͛̌̄̄̏̑̚̚͘͝ͅ]̴̛̭͚͖̭͍̰̘͎̩̱͐̉̐͗̾͌͋̿̒͌̏̅̀̅̅͂̽̎̒̈́̊̚͘͜͜͝
    ̵̧̧̨̤̤̙̣͇̣̬̰̝̺͈͇̫̘̻̙̜͕̰͋͗́͋͂̽͆̄̓̓̈́̐̃͒̉̕͝ͅͅ ̶̢̛̯͍̜̺̦͔̣̳̬̮̰̮̭̰̒̌̑͛͆͑͋̂̊̆̇̈́͑̒̋͌̂̃̌̀̄̈́̾͠͠\̸̨̧̡̨͈͓͚̮̫̥͉̣̬͈̭̰̼͓͍̦̭̹̲͕̌̑͑́͌̈̅̈̌̒͑̂̍̓̑͛͋͂͝͝͠
    ̵̞̱̗͑̉̄̆͛́͂̈͐̓͌̇͌͑͐͗͌͋̈́͋̎̓̓̀̽̉̄̍̚͝\̷̧̢̨͈͓̬͔̪̯̮͎̲̟̞̥͈͕͔̟͙̠̮̺̬͕͙̥͔͎̃̇̈́ ̵̧̿̈́̅̊͌̃̑́͗̏̊̾̈͐̑̀̚͝_̷͉̩̯͚̞̟͚̩̮̎̃̍́̃̐̊́̏́͒̾̄̎̍͊̆̓̐͆̂͗͛͐͘͘͘̕̚͠͝[̷̧̨͉̬͇͇̠͔̈́̄̋̔̅̅͘]̴̨͈̯̻̜͚̭̯̮̮̮̺̜̻̱̰͓̤̱̜͚̿́̌̒̓̈́͊͂͐̕̕͠͝͝ͅͅ
    ̵̧̨̨̖̥̺͕̹̫̯͚̫̯͚̈́̂̌̽̾͆͊́|̴̜͓͎͈̜͎͉̲̠̦͔̇͋͛̔̉̆̏̉̃̋ͅ ̵̺͈̼̫̍̂̓̿̑͂̔̅̎͑̍̀̊̇͗͒͆̆̒̃̔̈́̚͠͝\̷̡̛̞̰̗͔̯̣̭͙̻̬͎̲̇̒̅̈́͑͋͋͑̈̎̏̂̿͑͂̊̽͊̓̈́̂̚͝͝\̸̢̛͖͔̖̓̋͌̎̀̈̈̓̑͑͂͛̊̔͌̎̔̾̆̊̾̾̑̓̈͌̕͠͝͠
    ̶̢̧̧̥̗̠̜̝̺̪̗͈͎͙̯͓͚̙̺̘̼̥̤͔͈͓͍͈̯͔̌͋̅̐̃̑͒͝ͅͅ\̵̪̱̱͇̯̬͍̝̞̖̯̼̖̭͖̳̗̣̫͖̙̯̣̪͎̏̽͐̋̏̓͛̈́̌̀̈́͒́̀͂͗̆̒͛̀̂͗͝͝͠ͅ" />

    <meta property="fc:frame:post_url" content="${BASE_URL}/api/frame" />
  </head>
<body>
  <h1>FarFrame</h1>
</body>
</html>

  `
  )
  .post("/api/frame", ({ request }) => getResponse(request))
  .listen(PORT!);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
