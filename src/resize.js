// Adapted from https://htmldom.dev/create-resizable-split-views/

const resizer   = document.getElementById('resizer');
const leftSide  = document.getElementById('input');
const rightSide = document.getElementById('output');

// These are for the position of the mouse
let x = 0;
let y = 0;

let leftWidth = 0;

const mouseMoveHandler = e => {
  // How far the mouse has been moved
  const dx = e.clientX - x;
  const dy = e.clientY - y;

  const newResizerLeft = resizer.offsetLeft + dx;
  resizer.style.left = `${newResizerLeft}px`;

  const newLeftWidth = newResizerLeft * 100 / resizer.parentNode.getBoundingClientRect().width;
  leftWidth = newLeftWidth;
  leftSide.style.width = `${newLeftWidth}%`;

  leftSide.style.userSelect = 'none';
  leftSide.style.pointerEvents = 'none';

  rightSide.style.userSelect = 'none';
  rightSide.style.pointerEvents = 'none';

  resizer.style.cursor = 'col-resize';
  document.body.style.cursor = 'col-resize';

  x = e.clientX;
  y = e.clientY;
};

const mouseUpHandler = () => {
  resizer.style.removeProperty('cursor');
  document.body.style.removeProperty('cursor');

  leftSide.style.removeProperty('user-select');
  leftSide.style.removeProperty('pointer-events');

  rightSide.style.removeProperty('user-select');
  rightSide.style.removeProperty('pointer-events');

  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};

const mouseDownHandler = e => {
  // Get the current mouse position
  x = e.clientX;
  y = e.clientY;
  leftWidth = leftSide.getBoundingClientRect().width;

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

// Wrap the addEventListener in a function so we can call it from ./index.js
export const initResizeable = () => {
  resizer.addEventListener('mousedown', mouseDownHandler);
}
