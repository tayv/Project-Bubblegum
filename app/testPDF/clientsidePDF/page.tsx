"use client"
import React, { useRef, useEffect } from 'react'
import Product1Template from "@product1/product1Template.mdx"
import LoadTemplate from "@template/LoadTemplate"
import { useReactToPrint } from 'react-to-print';

const PrintComponent = ({dataToPrint}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;
      
      // Write your print content to the iframe document
      iframeDoc.open();
      iframeDoc.write(dataToPrint)
      iframeDoc.close();
    }
  }, [dataToPrint]);

  // const handlePrint = () => {
  //   const iframeContentWindow = iframeRef.current.contentWindow;
  //   iframeContentWindow.focus();
  //   iframeContentWindow.print();
  // };

  const componentToPrintRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  })

  return (
    <>
    
    <div ref={componentToPrintRef}>
        
             Hello
              </div>
              <button onClick={handlePrint}>Print</button>
              </>
    // <div>
    //   <button onClick={handlePrint}>Print</button>
    //   <iframe ref={iframeRef} style={{ visibility: 'hidden', height: 0, width: 0, position: 'absolute' }} />
    // </div>
  );
}

export default PrintComponent
