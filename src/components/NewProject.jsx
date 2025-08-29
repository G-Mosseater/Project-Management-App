import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({ onAdd,onCancel }) {
  //  reference to the Modal component so we can open it programmatically
  const modal = useRef();

  // reference to the input elementd

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    // get the current value of the Title input
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    //  if any field is empty, open the modal via ref
    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open(); //call method exposed via useImperativeHandle
      return;
    }
    //pass all input values up to parent
    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-600  my-4">
          Invalid Input
        </h2>
        <p className="text-stone-600 mb-4">
          Oopps!, You forgot to fill the fields
        </p>{" "}
      </Modal>
      <div className="w-[35rem] mt-16 ">
        <menu className="flex  items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950 " onClick={onCancel}>
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="bg-stone-800 text-stone-50 hover:bg-stone-950 px-6 py-2 rounded-md"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={title} type="text" label="Title"></Input>
          <Input ref={description} label="Description" textarea></Input>
          <Input ref={dueDate} type="date" label="Due Date"></Input>
        </div>
      </div>
    </>
  );
}
