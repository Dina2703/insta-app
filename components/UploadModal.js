import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";

function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <>
      <div>UploadModal</div>
      {open && <h1>The Modal is open</h1>}
    </>
  );
}

export default UploadModal;
