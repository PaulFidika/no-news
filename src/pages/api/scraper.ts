import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import cheerio from 'cheerio'; // Using cheerio to parse and manipulate HTML similar to BeautifulSoup

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

// Consider using AWS.BedrockRuntime or other relevant AWS SDK service
const awsService = new AWS.BedrockRuntime(); 

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ errorMessage: 'Only POST requests are allowed.' });
    return;
  }

  try {
    // URL to scrape
    const url = 'https://www.denver7.com/news/front-range/littleton';

    const response = await fetch(url);
    if (!response.ok) {
      console.error("Failed to retrieve the webpage.");
      res.status(500).send("Failed to retrieve the webpage.");
      return;
    }

    const content = await response.text();
    const $ = cheerio.load(content);
    // ... use cheerio or other libraries to process HTML content

    // Prepare parameters and invoke your AWS model
    // TO DO: this is not doing anything
    const params: AWS.BedrockRuntime.Types.InvokeModelRequest = {
        body: JSON.stringify({
            prompt: `\n\nHuman: \n\nAssistant:`,
            max_tokens_to_sample: 600,
            temperature: 0.5,
            top_k: 250,
            top_p: 1,
            stop_sequences: ['\\n\\nHuman:'],
          }),
          contentType: 'application/json',
          modelId: 'anthropic.claude-instant-v1',
    };

    const result = await awsService.invokeModel(params).promise();

    res.status(200).json(result);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Error processing request');
  }
}

export default handler;
