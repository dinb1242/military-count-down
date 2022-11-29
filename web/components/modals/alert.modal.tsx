import { NextPage } from "next";

interface AlertModalProps {
  isOpen?: boolean;
  handleModal: () => void;
  title?: string;
  content?: string;
}

export const AlertModal: NextPage<AlertModalProps> = ({ isOpen, handleModal, title, content }) => {
  return (
    <>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{ title }</h3>
          <p className="py-4">{ content }</p>
          <div className="modal-action">
            <label className="btn" onClick={ () => handleModal() }>
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal;