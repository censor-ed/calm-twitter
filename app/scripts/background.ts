chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.from === 'content') {
    const popup = `pages/${request.subject === "showPageAction" ? "popup" : "tweetdeck"}.html`
    chrome.pageAction.setPopup({ tabId: sender.tab!.id!, popup: popup }, function () {
      chrome.pageAction.show(sender.tab!.id!);
    })
  }
});
