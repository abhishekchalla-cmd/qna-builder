import MultipleChoice from "./MultipleChoice";
import MultipleSelect from "./MultipleSelect";
import MultipleInput from "./MultipleInput";
import ResizableGrid from "./ResizableGrid";
import ThHTOGrid from "./ThHTOGrid";
import DragAndDrop from "./DragAndDrop";
// import Match from "./Match";
import Scale from "./Scale";

export const types = {
  mcq: {
    name: "Multiple Choice",
    component: MultipleChoice,
  },
  msq: {
    name: "Multiple Select",
    component: MultipleSelect,
  },
  input: {
    name: "Multiple Input",
    component: MultipleInput,
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
  // match: {
  //   name: "Match items",
  //   component: Match,
  // },
};
