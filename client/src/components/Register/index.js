import axios from 'axios';
import { useState } from 'react';

const Register = ({ loadUser, onRouteChange }) => {
    const [userCred, setUserCred] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserCred({...userCred, [name]: value});
    }

    const onSubmitRegister = () => {
        axios.post('https://h-smart-brain.herokuapp.com/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: userCred.name,
                email: userCred.email,
                password: userCred.password
            }
        })
        .then(res => {
            if(res.data.id) {
                    loadUser(res.data);
                    onRouteChange('home');   
                }
        })
        //.then(data => { console.log(data)
            // if(data.id) {
            //     loadUser(data);
            //     onRouteChange('home');   
            // }
        //})
    }

    return (
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                required
                                onChange={handleChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email"  
                                id="email" 
                                required
                                onChange={handleChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" 
                                name="password"  
                                id="password" 
                                required
                                onChange={handleChange} />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick={onSubmitRegister} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Register" />
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register;