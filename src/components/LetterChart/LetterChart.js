import React from 'react'
import './LetterChart.css'
import Letter from '../Letter/Letter'

const LetterChart = props => {
    
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const lettersMap = letters.map( elem => {
        return <Letter key='elem' value={elem} />
    })
    return (
        <div className='letter-chart'>
            {lettersMap}
        </div>
    )
}

export default LetterChart