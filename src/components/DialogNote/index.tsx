import { ICategory, INote } from "../../models";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

interface DialogNoteProps {
  open: boolean;
  note?: INote;
  categories: ICategory[];
  onClose: (note?: INote) => void;
}

function DialogNote({ open, note, categories, onClose }: DialogNoteProps) {
  const { register, handleSubmit, setValue, watch } = useForm<INote>();

  const onSubmit: SubmitHandler<INote> = (data) => onClose(data);

  useEffect(() => {
    if (note) {
      setValue('id', note.id)
      setValue('categoryId', note.categoryId)
      setValue('title', note.title)
      setValue('content', note.content)
    }
  }, [note])

  const noteColor = (categoryId: number): string => {
    const category = categories.find((cat) => cat.id === Number(categoryId));
    return category ? category.color : "";
  };

  if (!open) return null;

  return (
    <dialog
      className="center"
      style={{ background: noteColor(watch('categoryId')) }}
    >
      <div className="dialog-content">
        <div className="title">
          <h2>{note ? "Update" : "New"} Note</h2>
          <button className="btn btn--close" onClick={() => onClose()}>
            X
          </button>
        </div>
        <form>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            defaultValue={note ? note.categoryId : ''}
            {...(register("categoryId"), { required: true })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            defaultValue={note ? note.title : ''}
            {...(register("title"), { required: true })}
          />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            defaultValue={note ? note.content : ''}
            {...(register("content"), { required: true })}
            rows={3}
          ></textarea>
        </form>
      </div>
      <div className="dialog-actions">
        <button className="btn btn--success" onClick={handleSubmit(onSubmit)}>
          Confirm
        </button>
      </div>
    </dialog>
  );
}

export default DialogNote;
