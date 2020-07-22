import React from 'react'
import './LetterChart.css'
import Letter from '../Letter/Letter'

const LetterChart = ({ gameOver, gaveUp, displayLC }) => {


    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const lettersMap = letters.map(e => {
        return <Letter key={e} value={e} />
    })

    return (
        <div>
            {displayLC && <div className='letter-chart'>
                {lettersMap}
            </div>}
        </div>
    )
}

export default LetterChart