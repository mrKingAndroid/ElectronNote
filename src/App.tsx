import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import TabList from "./components/TabList";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import SimpleMDE from "react-simplemde-editor";
import BottomBtn from "./components/BottomBtn";
import { FileType } from "./utils/types";
const Store = window.require("electron-store");
const fileStore = new Store({ name: "Files Data" });

function App() {
  const [files, setFiles] = useState(
    fileStore.get("files") || ({} as FileType)
  );
  const [activeFileID, setActiveFileID] = useState("");
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const activeFile = files[activeFileID];
  const importFiles = () => {};
  const createNewFile = () => {};
  const fileClick = () => {};
  const deleteFile = () => {};

  const updateFileName = (id: number, value: string) => {
    console.log("updateFileName - - App :", id, value);
  };
  const openedFiles = openedFileIDs.map((openID) => {
    return files[openID];
  });

  const tabClick = (fileID: string) => {
    // set current active file
    setActiveFileID(fileID);
  };
  const tabClose = (id: number) => {};
  const fileChange = (id: number, value: string) => {};
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch onFileSearch={() => {}} />
          <FileList
            files={[]}
            onFileClick={fileClick}
            onSaveEdit={updateFileName}
            onFileDelete={deleteFile}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={importFiles}
              />
            </div>
          </div>
        </div>
        <div className="col-9 rigth-panel">
          {!activeFile && (
            <div className="start-page">选择或者创建新的 Markdown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={tabClick}
                onCloseTab={tabClose}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={(value) => {
                  fileChange(activeFile.id, value);
                }}
                options={{
                  minHeight: "515px",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
