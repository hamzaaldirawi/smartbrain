import { Fragment } from "react";
import './style.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
    return (
        <Fragment>
            <p className='f4 b'>
            {
                `This Magic. The Brain will detect face in your Image`
            }            
            </p>
            <div className='flex-center'>
                <div className=' center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </Fragment>
    )
}

export default ImageLinkForm;