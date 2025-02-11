import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, context) => {
  try {
    await connectToDB();

    // 先等待 params 解析
    const params = await context.params;
    if (!params?.id) {
      return new Response(JSON.stringify({ error: "Invalid user ID" }), {
        status: 400,
      });
    }

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
