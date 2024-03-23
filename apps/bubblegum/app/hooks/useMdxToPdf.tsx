// import React, { useState } from 'react';
// import { compile } from '@mdx-js/mdx';
// import { MDXProvider } from '@mdx-js/react';
// import ReactDOMServer from 'react-dom/server';
// import htmlToPdfMake from 'html-to-pdfmake'

// export function useMdxToPdf() {
//   const [mdxContent, setMdxContent] = useState(''); // You can set your MDX content here

//   const generatePDF = async () => {
//     // compile MDX to JSX using mdx-js/mdx. Return an object
//     const jsx = await compile(mdxContent);
//     //  new element created by evaluating the compiled JSX code (stored in jsx.code) in the context of the provided React and MDXProvider. new Function use for runtime eval
//     const Component = new Function('React', 'MDXProvider', `${jsx.code}; return React.createElement(MDXContent)`);
//     //render the React element created in the previous step into static HTML
//     const html = ReactDOMServer.renderToStaticMarkup(<MDXProvider>{Component(React, MDXProvider)}</MDXProvider>);

//     // Convert HTML to pdfmake document
//     const pdfMakeDoc = htmlToPdfMake(html);

//     const response = await fetch('/api/generatePDF', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ pdfMakeDoc }),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'Document.pdf');
//     document.body.appendChild(link);
//     link.click();
//     alert('PDF generated successfully')
//   };

//   return { setMdxContent, generatePDF };
// }
