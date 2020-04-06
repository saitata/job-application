import React from 'react'
import axios from './config/axios'

class Application extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            contact:'',
            apply:'',
            experience:'',
            skills:''
            
        }
    }
    handleChange=(e)=>{
        this.setState(
       { [e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            phone:this.state.contact,
           jobTitle:this.state.apply,
           experience:this.state.experience,
           skills:this.state.skills

        }
        axios.post('/users/application-form',formData)
        .then((response) => {
                   if(response.data.hasOwnProperty('errors')){
                       alert('your application is not submited properly')
                   }
                   else{
                    alert('your application is  submited ')
                   }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
    }
    render(){
        return(
            <div>
                <h1>Apply For Job</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='user'>Full Name</label>
                    <input type='text' id='user' name='name' value={this.state.name} onChange={this.handleChange}/><br/>
                    <label htmlFor='password'>Email</label>
                    <input type='text' id='password' name='email' value={this.state.email} onChange={this.handleChange} placeholder='example@gmail.com'/><br/>
                    <label htmlFor='user'>Contact Number</label>
                    <input type='text' id='user' name='contact' value={this.state.contact} onChange={this.handleChange} placeholder='+9123456789'/><br/>
                    <label htmlFor='post'>Applying For Job</label>
                    <select  value={this.state.role} name='apply' onChange={this.handleChange}> 
                    <option value=''>------Select----</option>
                    <option value='Front-End Developer'>Front-End Developer</option>
                    <option value='Node Js Developer'>Node Js Developer</option>
                    <option value='Mern Stack Developer'>Mern Stack Developer</option>
                    <option value='Full Stack Developer'>Full Stack Developer</option>
                    </select>
                    <br/>
                    <label htmlFor='password'>Experience</label>
                    <input type='text' id='password' name='experience' value={this.state.experience} onChange={this.handleChange} placeholder='Experience (2 years, 3 months'/><br/>
                    <label htmlFor='user'>Techinical skills</label>
                    <textarea id='user' name='skills' value={this.state.skills} onChange={this.handleChange} placeholder='Techinical skillS' ></textarea><br/>
                    <input type='submit'  value='Send Application'/>
                </form>
            </div>
        )
    }
}
export default Application


      