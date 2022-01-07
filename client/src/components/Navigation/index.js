const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (
        !isSignedIn ? 
        <nav style={{display: 'flex'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer mr2'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer mr2'>Register</p>
        </nav>
        : 
        <nav>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer mr2'>Sign Out</p>
        </nav>  
    )
}

export default Navigation;