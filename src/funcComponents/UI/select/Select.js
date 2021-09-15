const Select = (props) => {
    const onChangeCallBack = (e) => {
        props.callback(e);
    }
    return (
        <>
            <select
                className={props.className}
                name={props.name}
                onChange={onChangeCallBack}
            >

                {
                    props.arrayImage.map((images, index) => {
                        // // return <option key={index} style={{`background: url(${images})`}} />
                        // <button style="background: url(myimage.png)" ... />
                        return (
                            <option key={index} value={images}>
                                {images}
                                {/* <img src={images} alt="a"/> */}
                            </option>

                        )
                    })
                }
            </select>
        </>


    )
}

export default Select;