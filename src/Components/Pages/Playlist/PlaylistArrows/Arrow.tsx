import arrowImg from '../../../../images/svgs/arrow-narrow-right-svgrepo-com.svg'
import plusImg from '../../../../images/svgs/circle-plus-svgrepo-com.svg'

interface ArrowProps{
    hasPlus?:boolean,
    plusCallback?:() => void,
}

function Arrow(props:ArrowProps){

    let plus = <div></div>
    if(props.hasPlus){
        plus =<button onClick = {props.plusCallback}><img src = {plusImg} alt = '' className = 'max-h-[30px] min-w-[30px] bg-red-500 rounded-full'/></button>
    }

    return (
        <div className='flex place-items-center w-fit min-w-[80px]'>
            {plus}
            <img src = {arrowImg} alt = '' className = 'max-h-[90px] min-w-[60px]'/>
        </div>
    );
}

export default Arrow;