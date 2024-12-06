import { useState, useEffect } from "react";

// Components
import Button from "./components/Button";
import Pill from "./components/Pill";

// Custom CSS
import "./assets/App.css";

// ! TODO:
// - Aggiungere Modal per eliminazione
// - Modificare le funzioni in funzioni asincrone
// - Fare funzionare il metodo Edit
// - Creare file .env

function App() {
    const [count, setCount] = useState(0);

    // Articles Array
    const [articles, setArticles] = useState([]);

    // CRUD Method
    const Index = () => {
        fetch("http://localhost:3000/posts", { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
                setArticles(data);
            });
    };

    const Store = (newArticle) => {
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: newArticle.title,
                author: newArticle.author,
                status: newArticle.status,
                image: newArticle.image,
                description: newArticle.description,
                genre: newArticle.genre,
                tags: newArticle.tags,
                publish: newArticle.publish,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                Index();
            });
    };

    const Destroy = (id) => {
        fetch("http://localhost:3000/posts/" + id, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                Index();
            });
    };

    // Load the articles on page load
    useEffect(() => {
        Index();
    }, []);

    // Form Void Sample Data
    const [formFields, setFormFields] = useState({
        title: "",
        author: "",
        status: "",
        image: "",
        description: "",
        genre: "",
        tags: [],
        publish: false,
    });

    // Tags Array
    const tags = ["Tag 1", "Tag 2", "Tag 3"];

    // Warning text placed at the top of the page
    const [warningText, setWarningText] = useState("");

    // Variables
    const [isEditing, setIsEditing] = useState(undefined); // Warn that im EDITING an element and not ADDING a new one

    // On Form Submit
    function handleFormSubmit(e) {
        e.preventDefault();

        // Check if an element is being edited
        if (isEditing !== undefined) {
            const newArticles = [...articles];

            // find the index to change
            const indexToChange = newArticles.findIndex(
                (element) => element.id === isEditing
            );

            // change the index
            newArticles[indexToChange] = {
                id: newArticles[indexToChange].id,
                title: formFields.title,
                author: formFields.author,
                genre: formFields.genre,
                status: formFields.status,
                description: formFields.description,
                image: formFields.image,
                publish: formFields.publish,
                tags: formFields.tags,
                isBeingEdited: false,
            };

            setArticles(newArticles);
            setIsEditing(undefined);
            setWarningText("");
            return;
        }

        // Check if the text doesn't already exist
        let alreadyExist = false;
        articles.map((element) => {
            element.title === formFields.title && (alreadyExist = true);
        });
        if (alreadyExist) {
            setWarningText("\nQuesto titolo esiste già");
            return;
        }

        // Add the new Article
        setWarningText(""); // Reset the warning
        Store(formFields);
    }

    function handleFormChange(e) {
        const { name, value, checked } = e.target;

        if (name === "tags") {
            const newTags = checked
                ? [...formFields.tags, value]
                : formFields.tags.filter((tag) => tag !== value);
            setFormFields({ ...formFields, tags: newTags });
        } else if (name === "publish") {
            setFormFields({ ...formFields, publish: checked });
        } else {
            setFormFields({ ...formFields, [name]: value });
        }
    }

    return (
        <>
            <main className="d-flex flex-column align-items-center mt-5">
                {/* Container */}
                <div className="mainContainer">
                    {/* WARNING TEXT (Default: empty) */}
                    <h1 className="underline-red text-center mb-3">
                        {warningText}
                    </h1>

                    {/* FORM */}
                    <form onSubmit={handleFormSubmit} className="row g-3">
                        {/* Title Input */}
                        <div className="col-6">
                            <label htmlFor="inputTitle" className="form-label">
                                Titolo articolo:
                            </label>

                            <input
                                onChange={handleFormChange}
                                type="text"
                                className="form-control"
                                id="inputTitle"
                                name="title"
                                required
                            />
                        </div>
                        {/* Author Input */}
                        <div className="col-6">
                            <label htmlFor="inputAuthor" className="form-label">
                                Autore articolo:
                            </label>

                            <input
                                type="text"
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputAuthor"
                                name="author"
                                required
                            />
                        </div>
                        {/* Genre Input */}
                        <div className="col-6">
                            <label htmlFor="inputGenre" className="form-label">
                                Genere articolo:
                            </label>

                            <select
                                onChange={handleFormChange}
                                className="form-select"
                                id="inputGenre"
                                name="genre"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Scegliere...
                                </option>
                                <option value="Genere 1">Genere 1</option>
                                <option value="Genere 2">Genere 2</option>
                                <option value="Genere 3">Genere 3</option>
                            </select>
                        </div>
                        {/* Status Input */}
                        <div className="col-6">
                            <label htmlFor="inputStatus" className="form-label">
                                Stato articolo:
                            </label>

                            <select
                                onChange={handleFormChange}
                                className="form-select"
                                id="inputStatus"
                                name="status"
                                defaultValue=""
                                required
                            >
                                <option value="" disabled>
                                    Scegliere...
                                </option>
                                <option value="Bozza">Bozza</option>
                                <option value="Terminato">Terminato</option>
                            </select>
                        </div>
                        {/* Description Input */}
                        <div className="col-12">
                            <label
                                htmlFor="inputDescription"
                                className="form-label"
                            >
                                Descrizione articolo:
                            </label>

                            <textarea
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputDescription"
                                name="description"
                                required
                            ></textarea>
                        </div>
                        {/* Image Input */}
                        <div className="col-12">
                            <label htmlFor="inputImage" className="form-label">
                                Immagine articolo (url):
                            </label>

                            <input
                                type="text"
                                onChange={handleFormChange}
                                className="form-control"
                                id="inputImage"
                                name="image"
                                defaultValue="https://picsum.photos/200"
                                required
                            />
                        </div>
                        {/* Publish Input */}
                        <div className="col-12">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="inputPublish"
                                    className="form-check-input"
                                    onChange={handleFormChange}
                                    checked={formFields.publish}
                                    name="publish"
                                    required
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="inputPublish"
                                >
                                    Articolo già pubblicato
                                </label>
                            </div>
                        </div>
                        {/* Empty Space */}
                        <div className="col-12"></div>
                        {/* Tags Input */}
                        <div className="col-12">
                            <label htmlFor="inputTags" className="form-label">
                                Vuoi inserire dei tag?
                            </label>

                            <ul id="tagContainer" className="d-flex">
                                {tags.map((tag) => (
                                    <li key={"tag-" + tag}>
                                        <input
                                            type="checkbox"
                                            id={"inputTags-" + tag}
                                            className="form-check-input me-1"
                                            onChange={handleFormChange}
                                            checked={formFields.tags.includes(
                                                tag
                                            )}
                                            value={tag}
                                            name="tags"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={"inputTags-" + tag}
                                        >
                                            {tag}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Invio
                            </button>
                        </div>
                    </form>

                    {/* ARTICLES LIST */}
                    <ul id="articleContainer" className="mt-5">
                        {articles?.length ? (
                            // Print the Array
                            articles.map((article) => (
                                <li
                                    key={article.id}
                                    className={
                                        "border d-flex justify-content-between py-2 px-3 mb-2 " +
                                        (article.isBeingEdited === true &&
                                            "bg-secondary")
                                    }
                                >
                                    {/* Article Image */}
                                    <div>
                                        <img
                                            className="rounded-4"
                                            src={article.image}
                                            alt="image not found"
                                        />
                                    </div>

                                    {/* Article Details */}
                                    <div className="flex-grow-1 mx-2 py-2">
                                        <p className="m-0 mb-1">
                                            <b>{"Titolo:"}</b> {article.title}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Autore:"}</b> {article.author}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Genere:"}</b> {article.genre}
                                        </p>
                                        <p className="m-0">
                                            <b>{"Stato:"}</b> {article.status}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Descrizione:"}</b>{" "}
                                            {article.description}
                                        </p>
                                        <p className="m-0 mb-1">
                                            <b>{"Pubblicato:"}</b>{" "}
                                            {article.publish === true
                                                ? "Sì"
                                                : "No"}
                                        </p>
                                        <p className="m-0 mb-1">
                                            {article.tags.map((tag) => (
                                                <Pill
                                                    key={"pill-" + tag}
                                                    text={tag}
                                                />
                                            ))}
                                        </p>
                                    </div>

                                    {/* Utility Buttons */}
                                    <div className="d-flex align-items-center">
                                        {/* Pulsante Modifica */}
                                        <Button
                                            key={"mod-" + article.id}
                                            text={"✏"}
                                            handleStatusChange={() => {
                                                setIsEditing(article.id);
                                                setWarningText(
                                                    "Modifica dell'elemento \"" +
                                                        article.title +
                                                        '"'
                                                );
                                                article.isBeingEdited = true;
                                            }}
                                        />

                                        {/* Pulsante Elimina */}
                                        <Button
                                            key={"del-" + article.id}
                                            text={"🧺"}
                                            data-bs-toggle="modal"
                                            data-bs-target="#destroyModal"
                                            // handleStatusChange={() =>
                                            //     // Destroy(article.id)
                                            // }
                                        />
                                    </div>
                                </li>
                            ))
                        ) : (
                            // Print Empty Array Message
                            <h2>Ancora nessun post...</h2>
                        )}
                    </ul>
                    <Button
                        text={"🧺"}
                        data-bs-toggle="modal"
                        data-bs-target="#destroyModal"
                        // handleStatusChange={() =>
                        //     // Destroy(article.id)
                        // }
                    />
                    {/* Modal Eliminazione */}
                    <div
                        className="modal fade"
                        id="destroyModal"
                        tabIndex="-1"
                        aria-labelledby="destroyModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1
                                        className="modal-title fs-5 text-danger"
                                        id="destroyModalLabel"
                                    >
                                        Eliminazione articolo
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>

                                <div className="modal-body">...</div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
