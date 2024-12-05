export default function ({ text, handleStatusChange }) {
    return (
        <button className="mx-1" onClick={handleStatusChange}>
            {text}
        </button>
    );
}
