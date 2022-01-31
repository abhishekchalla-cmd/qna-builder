import React from "react";
import Tabs from "../tabs/tabs";

export default function TabsTest(props) {
  return (
    <Tabs
      data={[
        {
          label: "Section 1",
          content: (
            <div
              style={{ background: "red", height: "100px", width: "100px" }}
            />
          ),
        },
        {
          label: "Section 2",
          content: (
            <div
              style={{ background: "orange", height: "100px", width: "100px" }}
            />
          ),
        },
      ]}
    />
  );
}
