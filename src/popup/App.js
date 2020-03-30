import React, { useState } from "react";
import { Box, Grommet, Text, Anchor } from "grommet";
import { browser } from "webextension-polyfill-ts";

import "./App.css";

import { SKIP_COMMAND } from "../constants";

export default function() {
  const [command, setCommand] = useState(null);

  // popup was opened
  window.onload = async function() {
    const commands = await browser.commands.getAll();
    const skipCommand = commands.find(cmd => cmd.name === SKIP_COMMAND);
    setCommand(skipCommand.shortcut);
  };

  const onForumNameClick = e => {
    browser.tabs.create({ url: "https://news.ycombinator.com" });
  };

  return (
    <div className="App">
      <Grommet>
        <Box width="medium" pad="small" alignContent="start">
          <Text size="small">
            Skipper. Press {command} to skip to the next top level comment on
            forums such as{" "}
            <Anchor onClick={onForumNameClick} label="Hacker News" />.
          </Text>
        </Box>
      </Grommet>
    </div>
  );
}
