import axios from "axios";
import { useState } from "react"

const SignIn = ({ loadUser, onRouteChange }) => {
    const [signInEmail, setSignInEmail] = useState();
    const [signInPassword, setSignInPassword] = useState();

    const onEmailChange = (e) => {
        setSignInEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setSignInPassword(e.target.value);
    }

    const onSubmitSignIn = () => {
        axios.post('https://h-smart-brain.herokuapp.com/signin', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: signInEmail,
                password: signInPassword
            }
        })
        .then(res => {
            if(res.data.id) {
                loadUser(res.data)
                onRouteChange('home')
            }
        })
        // .then(data => {
        //     if(data.id) {
        //         loadUser(data)
        //         onRouteChange('home')
        //     }
        // })
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                required
                                onChange={onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                required
                                onChange={onPasswordChange} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitSignIn} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                    </div>  
                </div>
            </main>
        </article>
    )
}

export default SignIn;