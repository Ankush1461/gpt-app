// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration } from "openai";
import { OpenAIApi } from "openai/dist/api";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is missing" });
  }
  if (prompt.length > 100) {
    return res.status(400).json({ error: "Prompt is too long" });
  }
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Tell me about \n
    Topic: ${prompt}\n
    Your answer: `,
    max_tokens: 500,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  const quote = completion.data.choices[0].text;

  res.status(200).json({ quote });
}
