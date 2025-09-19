import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import blocksToHTML from "../../utils/blocksToHTML";
import { Block } from "../../utils/types";
import getCvCss from "../../utils/cvStyles";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const blocks: Block[] = req.body.blocks;
  const fontScale: number = req.body.fontScale || 1;

  const html = `
  <html>
    <head>
      <style>${getCvCss(fontScale)}</style>
    </head>
    <body>${blocksToHTML(blocks, fontScale)}</body>
  </html>`;

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setContent(html);

  const pdf = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.end(pdf);
}
