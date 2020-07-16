import React, { useState } from 'react'

const Letter = props => {

    const [cssClass, setClass] = useState('black')

    const clickOne = () => {
        setClass('red')
    }
    const clickTwo = () => {
        setClass('green')
    }
    const clickThree = () => {
        setClass('black')
    }

    return (
        <h6>
            {props.value}
        </h6>
    )
}

export default Letter