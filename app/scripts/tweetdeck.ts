chrome.runtime.sendMessage({ from: 'content', subject: 'showTweetDeckPageAction' });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  toggleClassOnTweetDeck([request.key])
});

function toggleClassOnTweetDeck(keys: string[]) {
  chrome.storage.local.get(keys, function (data) {
    keys.forEach(key => {
      if (typeof data[key] === "undefined") {
        data[key] = ["isReactionNumberAlwaysHidden", "isFollowingNumberHidden", "isFollowerNumberHidden"].includes(key)
      }
      if (data[key]) {
        document.body.classList.add(key)
      } else {
        document.body.classList.remove(key)
      }
    });
  });
}

toggleClassOnTweetDeck(["isReactionNumberHidden", "isReactionNumberAlwaysHidden", "isFollowingNumberHidden", "isFollowerNumberHidden"]);
