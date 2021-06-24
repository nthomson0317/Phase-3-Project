import { useState } from 'react';

export default function Login(props) {

    const [formData, setFormData]=useState({
        name:'',
        password:''
        })

        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
                
            })
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log({
                name: formData.name,
                password: formData.password
            })
            fetch("http://localhost:9393/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    password: formData.password
                })
            })
            .then(res => res.json())
            .then((potentialUser) => {
                if(potentialUser.error){
                    alert(potentialUser.error)
                } else {
                    props.setUser(potentialUser)
                }
            })
    
        }
      
    return (
        
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" 
                name="name"
                placeholder="Username" 
                value={formData.name} 
                onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input type="password"
                name="password" 
                placeholder="Password"
                value={formData.password} 
                onChange={handleChange}/>
                <input type="submit" value="Log in"/>
            </form>
        </div>
    )
}
