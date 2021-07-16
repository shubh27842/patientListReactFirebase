import React from "react";
import PersonIcon from '@material-ui/icons/Person';

const PatientList = (props) => {
    const { name, sex, combo, firstAppointment} = props.data ? props.data : "";
    const colorCode= ["#0099cc","#9900ff","#ff0066" ];
    let dummy=[];
    dummy.length=combo;
    dummy.fill("",0,combo);
    return(
        <div className="patientList d-flex align-items-center p-3 px-4 border my-3 mx-auto">
            <img src="https://dummyimage.com/100x100/000/fff" alt="profile" className="ml-2" style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%"
            }} />
            <p className="text-secondary  pText1 mb-0 " style={{
                width: "180px",
                margin: "0 15px 0 48px"
            }}>{name ? name : ""}</p>
            <p className="text-secondary  pText1 mb-0" style={{
                width: "80px"
            }}>{sex ? sex : ""}</p>
            <p className="text-secondary  pText1 mb-0" style={{
                margin: "0px 160px 0 115px"
            }}>{firstAppointment ? firstAppointment : ""}</p>
            <div className="mr-auto " style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                gridTemplateRows: "auto auto",
                
            }}>
                {
                    dummy.map((val,i)=>{
                        return(
                            <p className="text-light  px-4  mb-0 d-flex align-items-center mx-2 my-1" style={{
                                borderRadius: "20px",
                                height: "30px",
                                fontSize: "12px",
                                fontWeight: "500",
                                backgroundColor: `${colorCode[Math.floor(Math.random() * colorCode.length)]}`
                            }}>Leg Rehab Combo</p>
                        )
                    })
                }
            </div>
            <div role="button" className=" d-flex align-items-center  " style={{
                marginLeft: "auto"
            }}>
                <PersonIcon style={{
                    color: "#0099cc"
                }} />
                <p className="text-secondary mb-0 mx-2" style={{
                    fontSize: "14px",
                    fontWeight: "500"
                }}>View Profile</p>
            </div>
        </div>
    )
};

export default PatientList;