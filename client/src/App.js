import { Fragment, useState } from 'react';
import Particles from 'react-tsparticles';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank';
import FaceRecognition from './components/FaceRecognition';
import SignIn from './components/SignIn';
import Register from './components/Register';
import { particleOptions } from './particlesOptions';
import './App.css';

const App = () => {
  const [input, setInput] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInUser, setSignInUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })
  
  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
      setSignInUser({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      });
      setImgUrl();
      setBox({});
      setInput();
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const loadUser = (data) => {
    setSignInUser(data)
  }

  const faceLocation = (data) => {
    const clariBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clariBox.left_col * width,
      topRow: clariBox.top_row * height,
      rightCol: width - (clariBox.right_col * width),
      bottomRow: height - (clariBox.bottom_row * height)
    }
  };

  const displayBox = (box) => {
    setBox(box);
  }

  const onPictureSubmit = () => {
    setImgUrl(input);
    fetch('https://h-smartbrain.herokuapp.com/imageDetect', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({input})
    })
    .then(res => res.json())
    .then(data => {
      if(data) {
        fetch('https://h-smartbrain.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: signInUser.id})
        })
        .then(res => res.json())
        .then(count => {
          setSignInUser(Object.assign(signInUser, {entries: count}))
        })
        .catch(console.log)
      }
      displayBox(faceLocation(data))
    })  
  }


  return (
    <div className="App">
      <Particles params={particleOptions} className='particles' />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Logo />
        <Navigation 
          isSignedIn={isSignedIn}
          onRouteChange={onRouteChange}
        />
      </div>
      {
        route === 'home' ? 
          <Fragment>
            <Rank name={signInUser.name} entries={signInUser.entries} />
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onPictureSubmit={onPictureSubmit}/>
            <FaceRecognition box={box} imgUrl={imgUrl}/>
          </Fragment>  
          : 
          route === 'signin' ? 
            <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
            : 
            <Register loadUser={loadUser} onRouteChange={onRouteChange} /> 
      }   
    </div>
  );
}

export default App;
