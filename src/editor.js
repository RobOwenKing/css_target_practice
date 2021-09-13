const onMessage = () => {
  return `window.addEventListener('message', (event) => {
            const newStyle = document.createElement('style');
            newStyle.textContent = event.data;
            document.head.append(newStyle);

            const styleTags = document.querySelectorAll('style');
            styleTags[0].parentNode.removeChild(styleTags[0]);
        }
      )`;
};

/* https://stackoverflow.com/a/61421435 */
export const updateOutput = (iframe, css, html) => {
  const iframeHTML = `
    <!doctype html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          ${onMessage()}
        </script>
      </body>
    </html>`;
  iframe.src = 'data:text/html,' + encodeURIComponent(iframeHTML);
};

export const initInput = (UI, CHALLENGE) => {
  UI.inputTextarea.addEventListener('input', (event) => {
    let userCSS = UI.inputTextarea.value;

    // Fixing bug with scrolling aligning (pre/code otherwise ignore empty final new lines)
    if (userCSS[userCSS.length-1] == "\n") {
      userCSS += " ";
    }

    UI.inputCode.innerHTML = Prism.highlight(userCSS, Prism.languages.css, 'css');

    UI.outputUser.contentWindow.postMessage(userCSS, "*");
  });

  UI.inputTextarea.addEventListener('scroll', (event) => {
    UI.inputPre.scrollTop  = UI.inputTextarea.scrollTop;
    UI.inputPre.scrollLeft = UI.inputTextarea.scrollLeft;
  });
};
