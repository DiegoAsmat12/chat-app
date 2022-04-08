const MessageBox = (props) => {
    const {message,userId} = props;

    return(
        <div className="flex-column ">
            {
                (userId === message.user._id) ?
                (
                    <>
                        <p className="text-header self-end">{message.user.username}</p>
                        <p className="message-box box-blue self-end">{message.message}</p>
                    </>
                ) :
                (   
                    <>
                        <p className="text-header">{message.user.username}</p>
                        <p className="message-box box-white">{message.message}</p>
                    </>
                )
            }
            
        </div>
    )
}

export default MessageBox;