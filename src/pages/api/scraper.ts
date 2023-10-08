import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { load } from 'cheerio';
import * as AWS from 'aws-sdk';
import { InvokeModelRequest } from 'aws-sdk/clients/bedrockruntime';
import Mercury from '@postlight/mercury-parser';
import { parse } from 'path';
import { map } from 'lodash';

type ResponseBody = {
  completion: string;
  stop_reason: string;
};

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

const getArticles = async (urls: string[]): Promise<string> => {
  let allText = '';

  for (const url of urls) {
    try {
      //   const response = await axios.get(url);
      //   const html = response.data;
      //   const $ = load(html);
      //   const articleText = $('your-article-body-selector').text();

      const body = (await Mercury.parse(url)).content ?? '';

      allText += body + ' ';
    } catch (error: unknown) {
      console.error(`Failed to fetch or extract text from ${url}:`, error);
    }
  }

  return allText;
};

function stringToArray(str: string): string[] {
  // Remove leading and trailing whitespace
  str = str.trim();

  // Remove leading and trailing brackets
  str = str.slice(1, -1);

  // Split string on commas
  const urls = str.split('","');

  // Remove quotes from each url
  for (let i = 0; i < urls.length; i++) {
    urls[i] = urls[i].replace(/"/g, '');
  }

  return urls;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ errorMessage: 'Only POST requests are allowed.' });
  }

  const { urls, query } = req.body; // Expecting an array of domain strings

  // Filter urls
  if (!Array.isArray(urls) || urls.some((url) => typeof url !== 'string')) {
    return res
      .status(400)
      .json({ errorMessage: 'Invalid urls parameter in request body.' });
  }

  let allLinks = '';

  try {
    for (const domain of urls) {
      const url = `https://${domain}`;
      const response = await axios.get(url);
      const html = response.data;
      const $ = load(html);
      const links = $('a')
        .map((_, element) => $(element).attr('href'))
        .get()
        .filter((link) => link && link.includes(domain));
      allLinks += links.join(',') + ',';
    }

    allLinks = allLinks.slice(0, -1); // Removing the trailing comma

    // Query Claude to filter urls
    let responseUrls: string[] = [];
    try {
      // Prepare the parameters for invoking the model
      const params: InvokeModelRequest = {
        accept: 'application/json',
        body: JSON.stringify({
          prompt: `\n\nHuman: Given this list of urls, return 5 of them to us, as an array of strings. Do not include any other text. Pick urls that look relevant to the user's query. Urls: ${allLinks} And this is the user's query: ${query}\n\nAssistant:`,
          max_tokens_to_sample: 600,
          temperature: 0.5,
          top_k: 250,
          top_p: 1,
          stop_sequences: ['\\n\\nHuman:'],
        }),
        contentType: 'application/json',
        modelId: 'anthropic.claude-instant-v1',
      };

      // Invoke the model and get the result
      const result = await bedrock.invokeModel(params).promise();

      // Now parse JSON
      const body = result.body.toString();
      const responseBody = JSON.parse(body) as ResponseBody;
      responseUrls = stringToArray(responseBody.completion);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).send('Error invoking the model');
    }

    console.log(responseUrls);

    // Grab the requested urls
    const allText = await getArticles(responseUrls);

    console.log(allText);

    console.log(allText.length);

    // Give it to Claude to summarize
    try {
      // Prepare the parameters for invoking the model
      const params: InvokeModelRequest = {
        accept: 'application/json',
        body: JSON.stringify({
          prompt: `\n\nHuman: Given this text, provide a concise set of bullet points that informs the user about what is going on, relevant to their query. And this is the user's query: ${query} Text: ${allText} \n\nAssistant:`,
          max_tokens_to_sample: 1000,
          temperature: 0.5,
          top_k: 250,
          top_p: 1,
          stop_sequences: ['\\n\\nHuman:'],
        }),
        contentType: 'application/json',
        modelId: 'anthropic.claude-instant-v1',
      };

      // Invoke the model and get the result
      const result = await bedrock.invokeModel(params).promise();

      // Now parse JSON
      const body = result.body.toString();
      const responseBody = JSON.parse(body) as ResponseBody;

      console.log('[Final response]', responseBody.completion);

      // Send the result as the response
      return res.status(200).send(responseBody.completion);
    } catch (error: unknown) {
      console.error(error);
      return res.status(500).send('Error invoking the model: ');
    }

    // return res.status(200).json(allLinks);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error processing request');
  }
};

export default handler;
