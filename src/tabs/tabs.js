import React, { useState } from "react";

export default function Tabs(props) {
  /*
    tab:
      label,
      content
  */
  const { data } = props;
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const currentTab = data[currentTabIndex];

  return (
    data &&
    data.length && (
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <ul className="list" style={{ width: "30%" }}>
          {data.map((tab, index) => {
            const isSelected = index == currentTabIndex;
            return (
              <li
                onClick={() => setCurrentTabIndex(index)}
                style={{
                  background: isSelected ? "#000" : "#ddd",
                  color: isSelected ? "#fff" : "#222",
                  borderBottom: "1px solid #fff",
                  padding: "5px 10px",
                  width: "100%",
                }}
              >
                {tab.label}
              </li>
            );
          })}
        </ul>
        <div className="main" style={{ width: "70%" }}>
          {currentTab.content}
        </div>
      </div>
    )
  );
}
