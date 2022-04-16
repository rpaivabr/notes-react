import { ICategory } from "../../models";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

interface DialogCategoryProps {
  open: boolean;
  category?: ICategory;
  onClose: (category?: ICategory) => void;
}

function DialogCategory({ open, category, onClose }: DialogCategoryProps) {
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm<ICategory>({
    mode: "onBlur"
  });

  useEffect(() => {
    if (category) {
      setValue('id', category.id)
      setValue('color', category.color)
      setValue('name', category.name)
    }
  }, [category])

  const onSubmit: SubmitHandler<ICategory> = data => onClose(data);

  if (!open) return null;

  return (
    <dialog className="center" style={{ background: watch('color') }}>
      <div className="dialog-content">
        <div className="title">
          <h2>{category ? "Update" : "New"} Category</h2>
          <button className="btn btn--close" onClick={() => onClose()}>
            X
          </button>
        </div>
        <form>
          <label htmlFor="color">Color</label>
          <input
            id="color"
            type="color"
            defaultValue={category ? category.color : '#ffffff'}
            {...(register("color"), { required: true })}
            onChange={e => setValue('color', e.target.value)}
          />
          
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
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

export default DialogCategory;
