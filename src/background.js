import { SKIP_COMMAND } from "./constants";

const registerKeyboardShortcut = () => {
  chrome.commands.onCommand.addListener(function(command) {
    if (command !== "skip") {
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length === 0) {
        // happens e.g. when current window is dev tools
        return;
      }
      chrome.tabs.sendMessage(tabs[0].id, SKIP_COMMAND);
    });
  });
};

window.onload = registerKeyboardShortcut;
