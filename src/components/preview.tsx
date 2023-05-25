import React, { useEffect, useRef } from "react";
import "../components/preview.css";

interface PreviewProps {
  code: string | null,
  err: string | null
}

const html = `
        <html>
            <head>
                <style>html {background-color:white}</style>
            </head>
            <body>
                <div id="root"></div>
                <script>
                const handleError = (err) => {
                            const root = document.querySelector('#root');
                            root.innerHTML = '<div style="color : red;"><h4>Runtime Error</h4>' + err  + '</div>';
                }
                window.addEventListener('error', (event) => {
                    event.preventDefault();
                    handleError(event.error);
                })
                    window.addEventListener('message',(event) => {
                        try {
                            eval(event.data);
                        } catch (err) {
                           handleError(err) 
                        }
                    },false)
                </script>
            </body>
        </html>
    `;
const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  const iframe = useRef<any>();
  return (
    <div className="preview-wrapper">
      <iframe
        sandbox="allow-scripts"
        title="code preview"
        srcDoc={html}
        ref={iframe}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>

  );
};

export default Preview;