import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import blocksToHTML from "../../utils/blocksToHTML";
import { Block } from "../../utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const blocks: Block[] = req.body.blocks;
  const fontScale: number = req.body.fontScale || 1;

  const html = `
  <html>
    <head>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: 'Times New Roman', serif; font-size: ${10 * fontScale}pt; line-height: ${1.2 * fontScale}em; }
        h3 { margin: ${4 * fontScale}mm 0 ${2 * fontScale}mm 0; text-transform: uppercase; }
        h4 { margin: ${2 * fontScale}mm 0; }
        p, li { margin: 0; padding: 0; }
        ul { margin-left: ${10 * fontScale}pt; padding-left: ${10 * fontScale}pt; }
        hr { border: 0; border-top: 0.2pt solid #000; margin: ${3 * fontScale}mm 0; }
      </style>
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
