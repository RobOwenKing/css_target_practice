/* https://stackoverflow.com/a/61421435 */
export const updateOutput = (iframe, css, html) => {
  const iframeHTML = `
    <!doctype html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>`;
  iframe.src = 'data:text/html,' + encodeURIComponent(iframeHTML);
};

export const initInput = (UI, CHALLENGE) => {
  UI.inputTextarea.addEventListener('input', (event) => {
    const userCSS = UI.inputTextarea.value;
    UI.inputCode.innerHTML = Prism.highlight(userCSS, Prism.languages.css, 'css');
    updateOutput(UI.outputUser, userCSS, CHALLENGE.html);
  });

  UI.inputTextarea.addEventListener('scroll', (event) => {
    UI.inputPre.scrollTop = UI.inputTextarea.scrollTop;
  });
};
