import React, { useState } from "react";

import { Box, Grommet, Text, Anchor } from "grommet";
import "./App.css";

import { SKIP_COMMAND } from "../constants";

export default function() {
  const [command, setCommand] = useState(null);

  // popup was opened
  window.onload = function() {
    chrome.commands.getAll(commands => {
      const skipCommand = commands.find(cmd => cmd.name === SKIP_COMMAND);
      setCommand(skipCommand.shortcut);
    });
  };

  const onForumNameClick = e => {
    chrome.tabs.create({ url: "https://news.ycombinator.com" });
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
