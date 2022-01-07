import Tilt from 'react-better-tilt';
import brain from './brain.png';
import './style.css';


const Logo = () => {
    return (
        <div className='ma4 mt0 pt2'>
            <Tilt className='Tilt br2 shadow-2'>
                <div >
                    <div>
                        <img src={brain} alt='brain' width='50px' height='50px'/>
                    </div>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;