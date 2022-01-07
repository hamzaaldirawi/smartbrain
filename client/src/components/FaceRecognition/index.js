import './style.css';

const FaceRecognition = ({ imgUrl, box }) => {
    return (     
        <div className="centered ma">        
            <div className="absolute mt2">
                <img 
                id="inputImage"
                src={
                    imgUrl === undefined ? "https://www.pngkit.com/png/full/9-98686_blank-png.png" : imgUrl
                }
                alt="recognized" 
                width="500px"
                height="auto" />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
         </div>
    )
}

export default FaceRecognition;