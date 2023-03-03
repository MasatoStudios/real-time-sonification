import {useEffect, useRef} from 'react'
import {DropAlarm, RiseAlarm} from '../../Audio/Noise'

// Percentage change is from start of day to current price

const useAlarm = (stock, rising, falling, incPercentage, decPercentage) => {
    const boundary = useRef(0)
    useEffect(() => {
    if(stock < - decPercentage){
        // console.log('Drop Alarm');
        DropAlarm(falling)
        boundary.current = 2
    } else if (stock > incPercentage){
        // console.log('Rise Alarm'); 
        RiseAlarm(rising)
        boundary.current = 2
    }

    if (boundary > 1){
        return 0;
    }
    })

}

export default useAlarm