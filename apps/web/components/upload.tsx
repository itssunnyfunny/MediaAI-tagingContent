

function Upload() {
    const handleUpload = (e: React.EventHandler<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(file);
    }
    const handleSubmit = (e: React.EventHandler<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input onChange={handleUpload} type="file" />
            <button type="submit">Upload</button>
            </form>

           
        </div>
    )
}

export default Upload;