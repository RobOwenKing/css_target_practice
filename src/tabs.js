/* Based on method used in https://www.youtube.com/watch?v=5L6h_MrNvsk by Web Dev Simplified */
const tabs = document.querySelectorAll('[data-tab-target]');

const onClick = (event) => {
  const target = event.target;

  // Hide currently displayed content
  const oldContent = document.querySelector(`${target.dataset.tabType} .display-block`);
  if (oldContent) { oldContent.classList.remove('display-block'); }

  // Display desired content
  const newContent = document.querySelector(target.dataset.tabTarget);
  newContent.classList.add('display-block');

  // Remove active styling from link for previous content
  const oldTab = document.querySelector(`${target.dataset.tabType} .active-tab`);
  if (oldTab) { oldTab.classList.remove('active-tab'); }

  // Add active styling to link for desired content
  target.classList.add('active-tab');
};

export const initTabs = () => {
  tabs.forEach(tab => { tab.addEventListener('click', onClick); })
};
