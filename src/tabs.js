/* Based on method used in https://www.youtube.com/watch?v=5L6h_MrNvsk by Web Dev Simplified */
const tabs = document.querySelectorAll('[data-tab-target]');

export const initTabs = () => {
  tabs.forEach(tab => {
    tab.addEventListener('click', event => {
      // Hide currently displayed content
      const oldContent = document.querySelector(`${tab.dataset.tabType} .display-block`);
      if (oldContent) { oldContent.classList.remove('display-block'); }

      // Display desired content
      const newContent = document.querySelector(tab.dataset.tabTarget);
      newContent.classList.add('display-block');

      // Remove active styling from tab for previous content
      const oldTab = document.querySelector(`${tab.dataset.tabType} .active-tab`);
      if (oldTab) { oldTab.classList.remove('active-tab'); }

      // Add active styling to tab for desired content
      tab.classList.add('active-tab');
    })
  })
}
