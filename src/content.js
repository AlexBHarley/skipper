import { browser } from "webextension-polyfill-ts";
import { SKIP_COMMAND } from "./constants";

// https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementVisible(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left <
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */ &&
    rect.top <
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */
  );
}

function getFirstVisibleRowIndex(rows) {
  for (let i = 0; i < rows.length; i++) {
    const elementIsVisible = isElementVisible(rows[i]);
    if (elementIsVisible) {
      return i;
    }
  }
}

function getNextTopLevelRowIndex(rows, currentIndex) {
  for (let i = currentIndex + 1; i < rows.length; i++) {
    const indent =
      rows[i].children[0].children[0].children[0].children[0].children[0]
        .children[0].width;
    if (indent === 0) {
      return i;
    }
  }
}

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request === SKIP_COMMAND) {
    const commentTree = document.getElementsByClassName("comment-tree");

    const [{ rows }] = commentTree;
    const firstVisibleRowIndex = getFirstVisibleRowIndex(rows);
    const nextTopLevelRowIndex = getNextTopLevelRowIndex(
      rows,
      firstVisibleRowIndex
    );

    if (nextTopLevelRowIndex) {
      rows[nextTopLevelRowIndex].scrollIntoView();
    }
  }
});
