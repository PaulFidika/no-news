import type { NextApiRequest, NextApiResponse } from 'next';
import * as AWS from 'aws-sdk';
import { InvokeModelRequest } from 'aws-sdk/clients/bedrockruntime';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    urls: string[];
    query: string;
  };
}

// Load the AWS credentials from Vercel environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bedrock = new AWS.BedrockRuntime();

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ errorMessage: 'Only POST requests are allowed.' });
    return;
  }

  const { urls, query } = req.body;

  try {
    // Prepare the parameters for invoking the model
    const params: InvokeModelRequest = {
      accept: 'application/json',
      body: JSON.stringify({
        prompt: `Human: ${query} \n\nAssistant:`,
        max_tokens_to_sample: 50,
      }),
      contentType: 'application/json',
      modelId: 'anthropic.claude-v2',
    };

    // Invoke the model and get the result
    const result = await bedrock.invokeModel(params).promise();

    // Send the result as the response
    res.status(200).send(result);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Error invoking the model: ');
  }
}

export default handler;
