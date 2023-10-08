import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import { html, load } from 'cheerio'; // Using cheerio to parse and manipulate HTML similar to BeautifulSoup

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

  const { urls, query } = req.body;

  // make sure we have the protocol prefix
  const formattedUrls = urls.map(url => {
    try {
      new URL(url);
      return url; 
    } catch {
      return `https://${url}`;
    }
  });

  try {
    let allLinks = '';

    formattedUrls.map(async (url, i) => {
      const html = await fetch(url).then((res) => res.text());

      // Load into Cheerio and find links
      const $ = load(html);
      const links = $('a');

      // Filter for only news article links
      const articleLinks = links
      .map((i, link) => $(link).attr('href'))
      .filter((i, link) => {
        try {
            const url = new URL(link);
            const domain = url.hostname;
            return domain === urls[i];
        } catch (error) {
            return false
        }
      });

      const linkArray = Array.from(articleLinks);
      console.log('linkArray', linkArray);
      const linksString = linkArray.join(',');
      allLinks = allLinks + ',' + linksString;
    });

    console.log(allLinks);

    // const content = await response.text();
    // const $ = cheerio.load(content);
    // // ... use cheerio or other libraries to process HTML content

    // // Prepare parameters and invoke your AWS model
    // // TO DO: this is not doing anything
    // const params: AWS.BedrockRuntime.Types.InvokeModelRequest = {
    //   body: JSON.stringify({
    //     prompt: `\n\nHuman: ${htmlPages}\n\nAssistant:`,
    //     max_tokens_to_sample: 600,
    //     temperature: 0.5,
    //     top_k: 250,
    //     top_p: 1,
    //     stop_sequences: ['\\n\\nHuman:'],
    //   }),
    //   contentType: 'application/json',
    //   modelId: 'anthropic.claude-instant-v1',
    // };

    // const result = await awsService.invokeModel(params).promise();

    res.status(200).json(allLinks);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Error processing request');
  }
}

export default handler;
