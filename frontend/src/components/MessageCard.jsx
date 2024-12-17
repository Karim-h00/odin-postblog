import MessageForm from "./MessageForm";
import { memo, useCallback, useState } from "react";

function MessagesCard({ id, title, content, onUpdate, onRemove }) {
    const [isOpened, setIsOpened] = useState(false);

    const handleDelete = async (id) => {
        onRemove(id)
    }

    const renderMessageForm = useCallback(() => {
        if (isOpened === true) {
            return (
                <MessageForm
                    title={title}
                    content={content}
                    onSubmitMessage={async ({ title, content }) => {
                        onUpdate(id, title, content);
                        setIsOpened(false)
                    }}
                    onCancel={() => {
                        setIsOpened(false)
                    }}
                />
            )
        } else {
            return (<>
                <p>{title}</p>
                <p>{content}</p>
                <button
                    onClick={(e) => {
                        setIsOpened(!isOpened)
                    }}
                >
                    update</button>

                <button onClick={(e) => {
                    handleDelete(id)
                }}>delete</button>
            </>)
        }


    }, [isOpened, title, content])

    return <div>
        {
            renderMessageForm()
             
        }

    </div>
}

const MessageCard = memo(MessagesCard)
export default MessageCard