import { INote } from "../../models";

interface NoteProps {
  note: INote;
  color: string;
  onClick: () => void;
}

function Note({ note, color, onClick }: NoteProps) {
  if (!note) return null;

  return (
    <div className="note" style={{ background: color }} onClick={onClick}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </div>
  );
}

export default Note;
