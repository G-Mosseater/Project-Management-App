import { createPortal } from "react-dom";
import { useImperativeHandle, useRef, forwardRef } from "react";
import Button from "./Button";

// forwardRef allows parent to attach a ref to this component

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  //reference to the <dialog> element
  const dialogRef = useRef();

  // expose methods to parent via ref
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal(); //parent can call modal.current.open()
      },
    };
  });

  //render modal using portal
  return createPortal(
    <dialog ref={dialogRef} className="backdrop:bg-stone-900/80 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});
export default Modal;
