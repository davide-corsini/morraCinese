const Input = (props) => {

    return (
        <>
            <input
                value={props.value}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                onChange={(e) => {
                    props.callback(e)
                }}
                className={props.className}
            />
        </>
    )
}

export default Input;