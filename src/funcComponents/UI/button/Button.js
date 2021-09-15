const Button = (props) => {
    return (
        <>
            <button
                type={props.type}
                name={props.name}
                onClick={() => {
                    props.callback()
                }}
                className={props.className}
            >{props.title}
            </button>
        </>
    )
}

export default Button;