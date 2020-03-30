import { browser } from "webextension-polyfill-ts";
import { SKIP_COMMAND } from "./constants";

const registerKeyboardShortcut = () => {
  browser.commands.onCommand.addListener(async function(command) {
    if (command !== "skip") {
      return;
    }

    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
    if (tabs.length === 0) {
      // happens e.g. when current window is dev tools
      return;
    }
    browser.tabs.sendMessage(tabs[0].id, SKIP_COMMAND);
  });
};

window.onload = registerKeyboardShortcut;
