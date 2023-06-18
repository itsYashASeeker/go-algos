import React, { useState } from "react";
import Multiprogressbar from "../components/progressbar";
import { AppState } from "../context/appContext";
import { expR } from "../data/expRoutes";
import FNavbar from "../components/FNavbar";
import Navbar from "../components/Navbar";
import '../css/progressbar.css';
export default function FRabinkarp() {
    
  

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [Somaiyaemail, setSomaiyaEmail] = useState(null);

  const [date, setDate] = useState(null);
  
  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);
  const [Quest1, setQuest1] = useState();
  const [Quest2, setQuest2] = useState();
  const [Quest3, setQuest3] = useState();
  const [Quest4, setQuest4] = useState();
  const [Quest5, setQuest5] = useState();
  const [Quest6, setQuest6] = useState("");
  const [Quest7, setQuest7] = useState("");
  const [institute, setInstitute] = useState(null);
  const { cuE, algoT } = AppState();

  const [currE, setCE] = cuE;



  const algoName = expR[currE[0]][currE[1]][0];

//   const [message, setMessage] = useState(null);
    const [index, setIndex] = useState(1);
  // console.log(index);
  function nextbtn() {
    if (index>=1) {
      
      console.log(index);
      setIndex(prevIndex => prevIndex+1);
    }
  } 

  function prevbtn() {
    if (index<=3) {
      
      setIndex(prevIndex => prevIndex-1);
      console.log(index);
    }
  }

  function formm(step){
    
      
      switch(step) {
        case 1:
          return (
            <>
            <div className="form">
                <div style={{ marginBottom: "0.2rem", fontSize:'1.5rem', color:'#A02929', alignSelf:'flex-start' }}>
                Personal Details
                </div>

                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                Email ID
                </div>
                <input placeholder="Please Enter Personal Email ID" className="inputt" value={email} onChange={e => setEmail(e.target.value)} required/>



                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                    Name
                </div>
                <input value={username} className="inputt" onChange={e => setUsername(e.target.value)} placeholder="Full Name" required />


                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                    Name Of the Institute
                </div>
                <input value={institute} className="inputt" onChange={e => setInstitute(e.target.value)} placeholder="Institute Name"  required />

                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                    Department
                </div>
                <input value={department}  className="inputt" onChange={e => setDepartment(e.target.value)} placeholder="Department Name"  required/>

                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                    Faculty/student/other

                </div>
                <input value={designation}  className="inputt" onChange={e => setDesignation(e.target.value)} placeholder="Designation" required />


                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                    Date
                </div>
                <input type="date" value={date}  className="inputt" onChange={e => setDate(e.target.value)} placeholder="Example: January 7, 2019" required/>

                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
                Somaiya Email ID
                </div>
                <input placeholder="Please Enter Somaiya Email ID" className="inputt" value={Somaiyaemail} onChange={e => setSomaiyaEmail(e.target.value)} required/>

                
                
                <div className="formfooter">
                <button className="btn prev" disabled={index===1} onClick={prevbtn} >Previous</button>
                <button className="btn next" onClick={nextbtn}>Next</button>
                </div>

            </div>
            
            </>

          );
        case 2:
          return (
              <>
              
            <div className="form">
                <div style={{ marginBottom: "0.2rem", fontSize:'1.5rem', color:'#A02929', alignSelf:'flex-start' }}>
                Award Catergory
                </div>

                <form action="#">
                <div style={{ marginBottom: "1.0rem", fontSize:'1.2rem', color:'var(--primary)', alignSelf:'flex-start', marginTop:"1.5rem" }}>Name of the experiment performed </div>
                <select name="yoa" id="yoa" style={{
                    
                    borderRadius:5,
                    width:"17rem",
                    height:"2.0rem",
                    color:"gray"
                }}>
                    <option value="select">Select Award Category</option>
                    <option value={algoName} >{algoName} Algorithm</option>
                    {/* <option value="Promising Teacher of the Year (1 to 3 years of service)">Promising Teacher of the Year (1 to 3 years of service)</option> */}
                    
                </select>
                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               1. Ease of understanding of concept using virtual lab

                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q1" value="Excellent" onClick={setQuest1("Excellent")} required/>
                    <label for="html">Excellent</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q1" value="Good" onClick={setQuest1("Good")} required/>
                    <label for="html">Good</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q1" value="Fair" onClick={setQuest1("Fair")} required/>
                    <label for="html">Fair</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none",}} name="Q1" value="Bad" onClick={setQuest1("Bad")} required/>
                    <label for="html">Bad</label><br/>
                </div>
                
                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               2. Simulation is easy and step by step


                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q2" value="Excellent" onClick={setQuest2("Excellent")} required/>
                    <label for="html">Excellent</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q2" value="Good" onClick={setQuest2("Good")} required/>
                    <label for="html">Good</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q2" value="Fair" onClick={setQuest2("Fair")} required/>
                    <label for="html">Fair</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none",}} name="Q2" value="Bad" onClick={setQuest2("Bad")} required/>
                    <label for="html">Bad</label><br/>
                </div>
                  

                <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               3. Relevant theory is provided for all experiments
               </div>
               <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q3" value="Excellent"  onClick={setQuest3("Excellent")} required/>
                    <label for="html">Excellent</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q3" value="Good" onClick={setQuest3("Good")} required/>
                    <label for="html">Good</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q3" value="Fair"  onClick={setQuest3("Fair")} required/>
                    <label for="html">Fair</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none",}} name="Q3" value="Bad" onClick={setQuest3("Bad")} required/>
                    <label for="html">Bad</label><br/>
                </div>
                  
                
                </form>

                <div className="formfooter">
                <button className="btn prev" disabled={index===1} onClick={prevbtn} >Previous</button>
                <button className="btn next" onClick={nextbtn}>Next</button>
                </div>
                    


                        
                        
            </div>
                        
                    
                    
                        
                        
              </>
          );
        case 3:
          return (
            <>
            
            <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               4. Operating the website is easy and convenient 

               </div>
               <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q4" value="Excellent" onClick={setQuest4("Excellent")} />
                    <label for="html">Excellent</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q4" value="Good" onClick={setQuest4("Good")} />
                    <label for="html">Good</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q4" value="Fair" onClick={setQuest4("Fair")}/>
                    <label for="html">Fair</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none",}} name="Q4" value="Bad" onClick={setQuest4("Bad")} />
                    <label for="html">Bad</label><br/>
                </div>

            <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               5. Any difficulties during performing the experiments

               </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q5" value="Excellent" onClick={setQuest5("Excellent")}/>
                    <label for="html">Excellent</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q5" value="Good" onClick={setQuest5("Good")}/>
                    <label for="html">Good</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none"}} name="Q5" value="Fair" onClick={setQuest5("Excellent")} />
                    <label for="html">Fair</label><br/>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <input type="radio" style={{fontSize:'3rem',  marginTop:"1rem",width:"1em" ,background:"none",}} name="Q5" value="Bad" onClick={setQuest5("Excellent")} />
                    <label for="html">Bad</label><br/>
                </div>

            <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               6. Suggestions for further improvement 
                </div>
                <textarea  style={{fontSize:'3rem',  marginTop:"1rem" ,background:"none"}} onChange={e => setQuest6(e.target.value)} />


            <div style={{ 
                marginBottom: "1.0rem", 
                fontSize:'1.2rem', 
                color:'var(--primary)', 
                alignSelf:'flex-start', 
                marginTop:"1.5rem" }}>
               7. Experiment that can be added and not available in existing Algortithms VLAB.
                </div>
                <textarea  style={{fontSize:'3rem',  marginTop:"1rem" ,background:"none"}} onChange={e => setQuest7(e.target.value)} />
                
      <div className="formfooter">
      <button className="btn prev" disabled={index===1} onClick={prevbtn} >Previous</button>
      <button className="btn next" type='submit'>Submit</button>
        </div>
      </>
          );
          default:
            return (
              <><h1>some error</h1></>
            );

          
      }
    
  }
    return (
        <>
            <Navbar />
            <FNavbar />
            <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      marginLeft: "5.5rem" 
      
    }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#D9D9D9",
          flexDirection: "column",
          padding: "2rem",
          borderRadius: "10px",
          width:"50%",
          marginTop:'150px',
          marginBottom:'150px'
        }}
      >
        <Multiprogressbar steps={index}/>
        <div style={{ fontSize: "2rem", marginBottom: "1.5rem" ,marginTop: "2rem",justifySelf:"center",alignSelf:"center"}}>
          {algoName} Feedback
        </div>
        {formm(index)}
        

        </div>
      
    </div>
        </>
    )
}