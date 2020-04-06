import React from 'react'
import axios from './config/axios'
import moment from 'moment'
class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            applicants:[],
            selectedJob:'Front-End Developer',

        }
    }

    handleRole=(role)=>{
        this.setState({selectedJob:role})
    }
    handleView=(id)=>{
        axios.get(`/users/application-form/${id}`)
          .then((response)=>{
              const applicant=response.data
              alert(`Name- ${applicant.name} Email-${applicant.email} contact-${applicant.phone} `)
          })
    }
    handleStatus=(id, status)=>{         
        axios.put(`/users/application-form/update/${id}`,{status})
        .then((response)=>{
            const applicant=response.data
              this.setState(prevstate=>({
                applicants:prevstate.applicants.map(appli=>{
                    if(appli._id===applicant._id){
                        return {...applicant}
                    }
                    else{
                        return{...appli}
                    }
                })
              }))
        })
        .catch(err=>{
            console.log(err)
        })
    }


    componentDidMount(){
        axios.get('/users/application-forms')
        .then((response)=>{
            //console.log(response.data)
            const applicants=response.data
            this.setState({applicants})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    render(){
        return(
            <div>
                <h1>AdminDashboard</h1>
                 <button onClick={()=>{this.handleRole('Front-End Developer')}}>Front-End Developer</button>
                 <button onClick={()=>{this.handleRole('Node Js Developer')}}>Node Js Developer</button>
                 <button onClick={()=>{this.handleRole('Mern Stack Developer')}}>Mern Stack Developer</button>
                 <button onClick={()=>{this.handleRole('Full Stack Developer')}}>Full Stack Developer</button>
                <h2>List of candidates applied for {this.state.selectedJob} job</h2>
                    <table border='1'>
                        <thead>
                           <tr>
                            <th>Name</th>
                            <th>Techinical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application</th>
                           </tr>
                        </thead>
                        <tbody>
                            {
                            
                            this.state.applicants.filter(applicant=>applicant.jobTitle=== this.state.selectedJob).map((applicant,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{applicant.name}</td>
                                        <td>{applicant.skills}</td>
                                        <td>{applicant.experience}</td>
                                        <td>{moment(applicant.createdAt).format('DD/MM/YYYY')}</td>
                                        <td><button onClick={()=>{this.handleView(applicant._id)}}>view Details</button></td>
                                        <td>
                                            
                                            {applicant.status ==='applied'? (
                                              <div>
                                                    <button onClick={()=>{this.handleStatus(applicant._id,'shortlisted')}}>shortlist</button ><button onClick={()=>{this.handleStatus(applicant._id,'Rejected')}}>Reject</button>
                                              </div>
                                           ):(<button>{applicant.status}</button>)
                                           }              
                                        </td>
                                    </tr>
                                )
                            })
                            
                               }
                        </tbody>
                    </table>
            </div>
        )
    }
}
export default AdminDashboard