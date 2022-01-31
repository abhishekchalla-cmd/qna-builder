import React, { useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module";
import axios from "axios";

Quill.register("modules/imageResize", ImageResize);

window.quillCount = window.quillCount || 1;

export default function Editor(props) {
  const { onChange, value, id } = props;
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  const setupEditor = () => {
    const editor = (editorRef.current = new Quill(containerRef.current, {
      modules: {
        toolbar: {
          container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
            [{ color: [] }],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      },
      theme: "snow",
    }));
    editor.root.innerHTML = value || "";
    editor.on("editor-change", (delta, oldDelta, source) => {
      const ed = window.editors && window.editors[id];
      if (ed && ed.onChange) ed.onChange(editor.root.innerHTML);
    });
  };

  useEffect(() => {
    setupEditor();
  }, []);

  useEffect(() => {
    if (!window.editors) window.editors = {};
    if (!window.editors[id]) window.editors[id] = {};
    window.editors[id].onChange = onChange;
  }, [onChange]);

  const imageHandler = () => {
    const uploader = document.createElement("input");
    uploader.setAttribute("type", "file");
    uploader.setAttribute("accept", "image/*");
    uploader.onchange = (e) => uploadFiles(e);
    uploader.click();
  };

  const uploadFiles = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("https://api.testing.classzone.in/util/uploadMedia", formData)
      .then(afterUpload)
      .catch(console.error);
  };

  const afterUpload = ({ data }) => {
    const range = editorRef.current.getSelection();
    editorRef.current.insertEmbed(range.index, "image", data.src);
  };

  const bringAnchorsUp = () => {
    const divs = document.getElementsByTagName("div");
    let i = divs.length - 1;
    while (i > divs.length - 5) {
      const anchor = divs[i];
      anchor.style.zIndex = "11";
      i--;
    }
  };

  return (
    <div onClick={bringAnchorsUp}>
      <div ref={containerRef} />
    </div>
  );
}
