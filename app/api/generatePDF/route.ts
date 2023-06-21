import { NextApiRequest, NextApiResponse } from 'next';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake fonts setup
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const docDefinition = {
    content: [
      'Hello, PDFMake in Next.js!'
    ],
  };

  const pdfDocGenerator = pdfMake.createPdf(docDefinition);

  res.setHeader('Content-Type', 'application/pdf');
  pdfDocGenerator.getBuffer((buffer) => {
    res.send(Buffer.from(buffer));
  });
}
