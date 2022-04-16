import { useEffect, useState } from "react";
import Axios from "axios";
import { environment } from "./environments/environment";
import { ICategory, INote } from "./models";
import Category from "./components/Category";
import Note from "./components/Note";
import "./App.css";
import DialogCategory from "./components/DialogCategory";
import DialogNote from "./components/DialogNote";

function App() {
  const logo = "My Notes";

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [notes, setNotes] = useState<INote[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState<boolean>(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState<boolean>(false);
  const [noteToUpdate, setNoteToUpdate] = useState<INote>();
  const [categoryToUpdate, setCategoryToUpdate] = useState<ICategory>();

  useEffect(() => {
    getCategories();
    getNotes();
  }, []);

  const noteColor = (categoryId: number): string => {
    const category = categories.find((cat) => cat.id === Number(categoryId));
    return category ? category.color : "";
  };

  const openNoteDialog = (note?: INote): void => {
    setNoteToUpdate(note);
    setIsNoteDialogOpen(true);
  };

  const openCategoryDialog = (category?: ICategory): void => {
    console.log(category)
    setCategoryToUpdate(category);
    setIsCategoryDialogOpen(true);
  };

  const closeNoteDialog = (): void => {
    setIsNoteDialogOpen(false);
  };

  const closeCategoryDialog = (): void => {
    setIsCategoryDialogOpen(false);
  };

  const updateCategory = (category?: ICategory): void => {
    closeCategoryDialog();
    if (!category) return;
    saveCategory(category as ICategory);
  }

  const saveCategory = (category: ICategory): void => {
    console.log(category);
    !category.id ? postCategory(category) : putCategory(category);
  }

  const updateNote = (note?: INote | number): void => {
    console.log(note);
    closeNoteDialog();
    if (!note) return;
    typeof note === 'number'
      ? deleteNote(note as number)
      : saveNote(note as INote);
  }

  const saveNote = (note: INote): void => {
    !note.id ? postNote(note) : putNote(note);
  }

  /** API methods */

  const getCategories = async () => {
    const { data: categories } = await Axios.get<ICategory[]>(
      `${environment.apiUrl}/categories`
    );

    setCategories([...categories]);
  };

  const postCategory = async (category: ICategory) => {
    const { data: newCategory } = await Axios.post<ICategory>(
      `${environment.apiUrl}/categories`,
      category
    );

    setCategories((state) => [...state, newCategory]);
  };

  const putCategory = async (category: ICategory) => {
    const { data: updatedCategory } = await Axios.put<ICategory>(
      `${environment.apiUrl}/categories/${category.id}`,
      category
    );

    setCategories((state) =>
      state.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
  };

  const getNotes = async () => {
    const { data: notes } = await Axios.get<INote[]>(
      `${environment.apiUrl}/notes`
    );

    setNotes([...notes]);
  };

  const postNote = async (note: INote) => {
    const { data: newNote } = await Axios.post<INote>(
      `${environment.apiUrl}/notes`,
      note
    );

    setNotes((state) => [...state, newNote]);
  };

  const putNote = async (note: INote) => {
    const { data: updatedNote } = await Axios.put<INote>(
      `${environment.apiUrl}/notes/${note.id}`,
      note
    );

    setNotes((state) =>
      state.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = async (id: number) => {
    await Axios.delete<void>(`${environment.apiUrl}/notes/${id}`);

    setNotes((state) => state.filter((note) => note.id !== id));
  };

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">{logo}</div>
        </div>
      </header>

      <main className="container">
        <aside>
          <div className="title">
            <h3>Categories</h3>
            <button onClick={() => openCategoryDialog()}>Add new</button>
          </div>
          {categories.map((category) => (
            <Category
              category={category}
              key={category.id}
              onClick={() => openCategoryDialog(category)}
            />
          ))}
        </aside>

        <section>
          <div className="title">
            <h3>Notes</h3>
            <button onClick={() => openNoteDialog()}>Add new</button>
          </div>
          <div className="notes-list">
            {notes.map((note) => (
              <Note
                color={noteColor(note.categoryId)}
                key={note.id}
                note={note}
                onClick={() => openNoteDialog(note)}
              />
            ))}
          </div>
        </section>
      </main>

      {(isCategoryDialogOpen || isNoteDialogOpen) && (
        <div className="overlay">
          <DialogCategory open={isCategoryDialogOpen} category={categoryToUpdate} onClose={updateCategory} />
          <DialogNote open={isNoteDialogOpen} note={noteToUpdate} categories={categories} onClose={updateNote} />
        </div>
      )}
    </div>
  );
}

export default App;
