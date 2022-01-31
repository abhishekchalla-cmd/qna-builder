import MultipleChoice from "./MultipleChoice";
import ResizableGrid from "./ResizableGrid";
import ThHTOGrid from "./ThHTOGrid";
import DragAndDrop from "./DragAndDrop";
import Match from "./Match";
import Scale from "./Scale";

export const types = {
  mcq: {
    name: "Multiple Choice",
    component: MultipleChoice,
    props: {
      type: "single",
    },
  },
  msq: {
    name: "Multiple Select",
    component: MultipleChoice,
    props: {
      type: "multiple",
    },
  },
  input: {
    name: "Input fields with labels",
    component: MultipleChoice,
    props: {
      type: "input",
    },
  },
  grid: {
    name: "Resizable grid",
    component: ResizableGrid,
  },
  thhto: {
    name: "ThHTO grid",
    component: ThHTOGrid,
  },
  scale: {
    name: "Scale",
    component: Scale,
  },
  dragAndDrop: {
    name: "Drag and drop",
    component: DragAndDrop,
  },
  match: {
    name: "Match items",
    component: Match,
  },
};
