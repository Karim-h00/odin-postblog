function updateMessage(data) {
    <form method="put" onSubmit={((e) => e.preventDefault())}>
        <input type="text" value={updateData.title} name="title" onChange={(e) => { handleUpdate(e.target.value, "title") }} />
        <input type="text" value={updateData.content} name="content" onChange={(e) => { handleUpdate(e.target.value, "content") }} />
        <button onClick={submitUpdate}>submit</button>
        <button onClick={(e) => { setIsOpened(!isOpened) }}>cancel</button>
    </form>
}

export default updateMessage