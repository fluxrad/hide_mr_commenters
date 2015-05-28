/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tab.url && tab.url.indexOf('http://marginalrevolution.com/' === 0)) {
    chrome.pageAction.show(tabId);
    chrome.pageAction.setIcon({tabId: tabId, path:"images/mr-48.png"});
  } 
});
*/
chrome.pageAction.show(1);
