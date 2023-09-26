import React from "react";
import CreateFileModal from "./CreateFileModal";
import { useRecoilValue } from "recoil";
import { modeState } from "../../../../recoil/CodeEditorState";
import CreateDirectoryModal from "./CreateDirectoryModal";
import RenameFileModal from "./RenameFileModal";
import RenameDirectoryModal from "./RenameDirectoryModal";

function FsControlModals() {
  const mode = useRecoilValue(modeState);

  return (
    <React.Fragment>
      {mode == "CREATE_FILE" && <CreateFileModal />}
      {mode == "CREATE_DIRECTORY" && <CreateDirectoryModal />}
      {mode == "RENAME_FILE" && <RenameFileModal />}
      {mode == "RENAME_DIRECTORY" && <RenameDirectoryModal />}
    </React.Fragment>
  );
}

export default FsControlModals;
