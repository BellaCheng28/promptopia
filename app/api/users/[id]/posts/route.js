import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(req, context) {
    await connectToDB();

    const { params } = context; // 先解构 params
    if (!params || !params.id) {
        return new Response(JSON.stringify({ error: "Invalid user ID" }), { status: 400 });
    }
    try{

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
