import React, {useState} from 'react'
import './Letter.css'

const Letter = props => {

    const [cssClass, setClass] = useState('unknown')

    const click = () => {
        (cssClass === 'unknown') 
        ? setClass('no')
        : ((cssClass === 'no') 
        ? setClass('yes')
        : setClass('unknown'))
    }

    return (
        <h6 className={`letter-${cssClass}`} onClick={click}>
            {props.value}
        </h6>
    )
}

export default Letter