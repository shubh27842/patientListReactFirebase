import React, { useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import firebase from "../firebase";
import PersonIcon from '@material-ui/icons/Person';
import PatientList from "./PatientList";
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import MessageIcon from '@material-ui/icons/Message';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const db = firebase.ref('/patientinfo');

const Home= () => {
    const colorCode= ["#0099cc","#9900ff","#ff0066" ];
    const [rehabTag,setRehabTag]= useState([""]);
    const [storedData,setStoredData] = useState([]);
    const [patientData,setPatientData] = useState({
        name: "",
        sex: "",
        age: "",
        emailid: "",
        firstAppointment: "",
        combo: 1
    });

    const getData = ()=>{
        db.on("value",(ele)=>{
            setStoredData([]);
            let datas = ele.val();
            let data = [];
            for(let i in datas){
                data.push(datas[i]);
            }
            console.log(data);
            setStoredData(data);
        });
    }

    useEffect(()=>{
        getData();
    },[]);
    const addRehab = () => {
        setRehabTag([...rehabTag,""]);
        setPatientData({
            ...patientData,
            combo: patientData.combo+1
        })
    }
    const removeRehab= () =>{
        const tags = [...rehabTag];
        tags.splice(0,1);
        setRehabTag(tags);
        setPatientData({
            ...patientData,
            combo: patientData.combo-1
        })
    }
    const toggleAddPatient = () =>{

        if(document.getElementById("addP").classList.contains("showAddPatient")){
            document.getElementById("addP").classList.remove("showAddPatient")
        }else{
            document.getElementById("addP").classList.add("showAddPatient")
        }
    }

    const handleInputChange = (e) => {
        let {name,value} = e.target;
        setPatientData({
            ...patientData,
            [name]: value
        })
    }

    const onSubmitData = (e)=>{
        e.preventDefault();
        //console.log(patientData)
        db.push(patientData);
        toggleAddPatient();
        getData();
    }

    return(
        <div className="home d-flex">
            <div className=" sidebar d-flex flex-column">
                        <SpellcheckIcon className="text-secondary  mx-auto my-5 "  style={{
                            transform: "scale(1.7,1.7)",
                            cursor: "pointer",
                        }} />
                        <LocalHospitalIcon className="text-secondary mx-auto my-2" style={{
                            transform: "scale(1.5,1.5)",
                            cursor: "pointer",
                        }}  />
                        <FitnessCenterIcon className="text-secondary mx-auto my-3" style={{
                            transform: "scale(1.3,1.3)",
                            cursor: "pointer",
                        }}/>
                        <DirectionsWalkIcon className="text-primary mx-auto my-2" style={{
                            transform: "scale(1.4,1.4)",
                            cursor: "pointer",
                        }}/>
                        <MessageIcon className="text-secondary mx-auto my-3" style={{
                            transform: "scale(1.3,1.3)",
                            cursor: "pointer",
                        }}/>
                        <InfoIcon className="text-secondary mx-auto my-2" style={{
                            transform: "scale(1.3,1.3)",
                            cursor: "pointer",
                        }}/>
                        <ExitToAppIcon className="text-secondary mx-auto mt-auto mb-4" style={{
                            transform: "scale(1.5,1.5)",
                            cursor: "pointer",
                        }}/>
            </div>
            <div className="">
                <div className=" patientDisplay ">
                    <div className="d-flex headBar ">
                        <p className="phead text-primary  ">My Patients</p>
                        <div id="searchBar">
                            <SearchIcon style={{
                                transform: "scale(1.2,1.2)",
                                marginRight: "5px",
                        
                            }} />
                            <input className="searchInput text-success" type="text" placeholder="Search by patient name or contact details" />
                        </div>
                        <div className="mx-3 d-flex align-items-center" style={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            height: "40px",
                            borderRadius: "6px"
                        }}>
                            <p className="p-2 px-3  pText m-0 ">All patients</p>
                            <div role="button" className=" d-flex align-items-center px-2" style={{
                                borderLeft: "1px solid #D2D2D2",
                                color: "grey",
                                height: "100%"
                            }}>
                                <ExpandMoreIcon />
                            </div>
                        </div>
                        <div role="button" onClick={()=> toggleAddPatient()} className="   addPatientBtn pText bg-primary text-light d-flex align-items-center px-4" style={{
                            borderRadius: "6px",
                            height: "40px",
                        }}>
                            New patient
                        </div>
                    </div>
                    <div className="pText1 text-secondary  d-flex mt-4">
                        <p className=" mb-0 " style={{
                            marginLeft: "10vw",
                            marginRight: "10vw"
                        }}>Name</p>
                        <p className=" mb-0 " >Sex</p>
                        <p className=" mb-0 " style={{
                            marginLeft: "11vw",
                            marginRight: "10vw"
                        }}>Last Visit</p>
                        <p className=" mb-0  " style={{
                            marginLeft: "2vw"
                        }} >Rehab Combo</p>
                    </div>
                </div>
                <div className=" border pList" style={{
                marginTop: "128px",
                width: "calc(100vw - 70px)",
                minHeight: "fit-content",
                maxHeight: "calc(100vh - 129px)",
                overflowY: "scroll",
                overflowX: "hidden",
                backgroundColor: "#e6e6ff",
                }}>
                    {    storedData.length>0 ?
                        storedData.map((val,i)=>{
                            return(
                                <PatientList data={val} />
                            )
                        }): ""
                    }
                    
                </div>
            </div>
            <form className="addPatient " id="addP" onSubmit={onSubmitData}>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 text-primary"  style={{
                        cursor:"pointer",
                        fontSize: "24px",
                        fontWeight: "700"
                    }}>Add New Patient</p>
                    <ClearIcon className="text-secondary" role="button"  onClick={()=>toggleAddPatient()} />
                </div>
                <div className="d-flex flex-column mt-3">
                    <label className="pText1 text-secondary mb-1">Patient Name</label>
                    <input type="text" onChange={handleInputChange} name="name" placeholder="John Doe" style={{
                        borderColor: "1px solid #D2D2D2",
                        borderRadius: "6px",
                        height: "40px",
                        textIndent: "10px"
                    }} required/>
                </div>
                <div className="d-flex justify-content-between" style={{
                    width: "250px"
                }}>
                    <div className="d-flex  flex-column mt-3 ">
                        <label className="pText1 text-primary mb-2">Sex</label>
                       <div className="d-flex align-items-center">
                       <input onChange={handleInputChange} className="" type="radio" name="sex" value="Male" required /><span className="pText" style={{
                           marginLeft: "10px",
                            marginRight: "20px"
                       }}>Male</span>
                        <input onChange={handleInputChange} className="" type="radio" name="sex" value="Female" required /><span className="pText" style={{
                            marginLeft: "10px"
                        }}>Female</span>
                       </div>
                    </div>
                    <div className="d-flex  flex-column mt-3 ">
                        <label className="pText1 text-primary mb-2">Age</label>
                        <input type="number" onChange={handleInputChange} name="age" style={{
                            width: "70px",
                            height: "25px"
                        }} required />
                    </div>  
                </div>
                <div className="d-flex flex-column mt-3">
                    <label className="pText1 text-primary mb-1">Email ID</label>
                    <input type="email" onChange={handleInputChange} name="emailid" placeholder="johndoe@xyz.com" style={{
                        borderColor: "1px solid #D2D2D2!important",
                        borderRadius: "6px",
                        height: "40px",
                        textIndent: "10px"
                    }} required/>
                </div>
                <div className="d-flex flex-column mt-3">
                    <label className="pText1 text-primary mb-1">First Appointment Date</label>
                    <input type="date" onChange={handleInputChange} name="firstAppointment" placeholder="John Doe" style={{
                        borderColor: "1px solid #D2D2D2!important",
                        borderRadius: "6px",
                        height: "40px",
                        textIndent: "10px",
                        width: "180px"
                    }} required/>
                </div>
                <div className="d-flex flex-column mt-3">
                    <label className="pText1 text-primary mb-1">Add Rehab Combo</label>
                    <div className="" style={{
                        display: "grid",
                        justifyContent: "flex-start",
                        gridTemplateColumns: "auto auto",
                        gridTemplateRows: "auto auto auto",
                    }}>
                        {
                            rehabTag.map((val,i)=>{
                                return(
                                    <p className="text-light mb-0 d-flex align-items-center mx-2 my-1" style={{
                                    borderRadius: "20px",
                                    height: "20px",
                                    fontSize: "8px",
                                    fontWeight: "500",
                                    width: "115px",
                                    padding: "0 8px 0 15px",
                                    backgroundColor: `${colorCode[Math.floor(Math.random() * colorCode.length)]}`
                                    }}>Leg Rehab Combo <ClearIcon className="" onClick={()=> removeRehab()} style={{
                                        transform: "scale(0.5,0.5)",
                                        cursor: "pointer",
                                    }} /></p>
                                )
                            })
                        }
                        
                        <span><AddCircleOutlineIcon onClick={()=>addRehab()} style={{
                            transform: "scale(0.7,0.7)",
                            cursor: "pointer",
                            
                        }} /></span>
                    </div>
                </div>
                <input   type="submit" value="Save" className="bg-primary text-light mt-5" style={{
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "12px",
                    width: "70px",
                    height: "30px",
                }} />
            </form>
        </div>
    )
};

export default Home;