localize();
initValues(["isExploreHidden", "isTrendsHidden", "isReactionNumberHidden", "showCalmText", "isFollowingNumberHidden", "isFollowerNumberHidden", "isReactionNumberAlwaysHidden"]);

function localize() {
  var objects = document.getElementsByTagName('html');
  for (var j = 0; j < objects.length; j++) {
    var obj = objects[j];

    var valStrH = obj.innerHTML.toString();
    var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : "";
    });

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }

}

function addClickEventListeners(keys: string[]) {
  keys.forEach(key => {
    const input = document.getElementById(key);
    if (input) {
      input.addEventListener('click', function (event) {
        const checkbox = event.target as HTMLInputElement;
        chrome.storage.local.set({ [key]: checkbox!.checked });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const tabId = tabs[0].id;
          chrome.tabs.sendMessage(tabId!, { key: key });
        });
      }, false);
    }
  });
}

function toggleChecked(keys: string[]) {
  chrome.storage.local.get(keys, function (data) {
    keys.forEach(key => {
      console.log(key + ": " + data[key]);
      if (key === "isFollowingNumberHidden" || key === "isFollowerNumberHidden" || key === "isReactionNumberAlwaysHidden") {
        if (typeof data[key] === "undefined") {
          data[key] = false;
        }
      } else {
        if (typeof data[key] === "undefined") {
          data[key] = true;
        }
      }
      const input = document.getElementById(key) as HTMLInputElement;
      if (input) {
        input.checked = data[key];
      }
    });
  });
}

function initValues(keys: string[]) {
  toggleChecked(keys);
  addClickEventListeners(keys);
}
