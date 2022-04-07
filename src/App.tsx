import { useEffect, useState } from "react";
import "./App.css";

interface Note {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
}

interface Category {
  id?: number;
  name: string;
  color: string;
}

function App() {
  const logo = "My Notes";

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "React",
      color: "#87cefa",
    },
  ]);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      categoryId: 1,
      title: "Title",
      content: "Content",
    },
  ]);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
    useState<boolean>(false);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState<boolean>(false);

  useEffect(() => {}, []);

  const openDialog = (dialogName: "note" | "category"): void => {
    if (dialogName === "note") {
      setIsNoteDialogOpen(true);
    }
    if (dialogName === "category") {
      setIsCategoryDialogOpen(true);
    }
  };

  const closeDialog = (dialogName: "note" | "category"): void => {
    if (dialogName === "note") {
      setIsNoteDialogOpen(false);
    }
    if (dialogName === "category") {
      setIsCategoryDialogOpen(false);
    }
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
            <button onClick={() => openDialog("category")}>Add new</button>
          </div>
          <div className="category">
            <span className="dot" style={{ backgroundColor: "#87cefa" }}></span>
            <span>React</span>
          </div>
          <div className="category">
            <span className="dot"></span>
          </div>
        </aside>

        <section>
          <div className="title">
            <h3>Notes</h3>
            <button onClick={() => openDialog("note")}>Add new</button>
          </div>
          <div className="notes-list">
            <div className="note" style={{ backgroundColor: "#87cefa" }}>
              <h4>Title</h4>
              <p>Content</p>
            </div>
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
            <div className="note"></div>
          </div>
        </section>
      </main>

      {(isCategoryDialogOpen || isNoteDialogOpen) && (
        <div className="overlay">
          {isNoteDialogOpen && (
            <dialog className="center">
              <div className="dialog-content">
                <h2>Note Dialog Title</h2>
                <p>
                  In order to give an example of paragraph, we kindly ask you to
                  change and use anything you want as content
                </p>
              </div>
              <div className="dialog-actions">
                <button onClick={() => closeDialog("note")}>Cancel</button>
                <button onClick={() => closeDialog("note")}>Confirm</button>
              </div>
            </dialog>
          )}
          {isCategoryDialogOpen && (
            <dialog className="center">
              <div className="dialog-content">
                <h2>Category Dialog Title</h2>
                <p>
                  In order to give an example of paragraph, we kindly ask you to
                  change and use anything you want as content
                </p>
              </div>
              <div className="dialog-actions">
                <button onClick={() => closeDialog("category")}>Cancel</button>
                <button onClick={() => closeDialog("category")}>Confirm</button>
              </div>
            </dialog>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
