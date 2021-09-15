// import { buildQueries } from '@testing-library/dom'
import React, { useState, useEffect, useRef } from 'react'
import RINGS from 'vanta/dist/vanta.rings.min'

const Prova = (props) => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(RINGS({
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0xccf9dd,
                color: 0xffffff,
                backgroundAlpha: 0.77
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return <div ref={myRef}>
        
    </div>
}


export default Prova;