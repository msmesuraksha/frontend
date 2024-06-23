import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  DropdownItem,

} from "reactstrap"
import Breadcrumb from "../../components/Common/Breadcrumb";
import { changePasswordUsingOldPass } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

// import avatar from "../../assets/images/users/avatar-1.jpg"

const Settings = props => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [ConfirmNewPass, setConfirmNewPass] = useState('');
  const [errorss, setError] = useState('');

  const dispatch = useDispatch();


  const handleSubmit=()=>{
if(ConfirmNewPass == newPass){
  
const payload={
  "oldPassword":currentPass,
  "password":newPass
}
dispatch(changePasswordUsingOldPass(payload));

}
else{
  setError("New Pass Should be Same")
}
  }
  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));
  return (
    // <React.Fragment>
    //   <Col xl={4}>
        
    //     {/* <Card>
    //       <CardBody>
    //         <div className="d-flex flex-wrap align-items-start">
    //           <h5 className="card-title mb-3 me-2">Subscribes</h5>

    //           <UncontrolledDropdown className="ms-auto">
    //             <DropdownToggle tag="a" className="text-muted font-size-16" role="button">
    //               <i className="mdi mdi-dots-horizontal"></i>
    //             </DropdownToggle>

    //             <DropdownMenu className="dropdown-menu-end">
    //               <DropdownItem className="dropdown-item" href="#">Action</DropdownItem>
    //               <DropdownItem className="dropdown-item" href="#">Another action</DropdownItem>
    //               <DropdownItem className="dropdown-item" href="#">Something else here</DropdownItem>
    //               <div className="dropdown-divider"></div>
    //               <DropdownItem className="dropdown-item" href="#">Separated link</DropdownItem>
    //             </DropdownMenu>
    //           </UncontrolledDropdown>
    //         </div>

    //         <div className="d-flex flex-wrap">
    //           <div>
    //             <p className="text-muted mb-1">Total Subscribe</p>
    //             <h4 className="mb-3">10,512</h4>
    //             <p className="text-success mb-0"><span>0.6 % <i className="mdi mdi-arrow-top-right ms-1"></i></span></p>
    //           </div>
    //           <div className="ms-auto align-self-end">
    //             <i className="bx bx-group display-4 text-light"></i>
    //           </div>
    //         </div>
    //       </CardBody>
    //     </Card>

    //     <Card>
    //       <CardBody className="p-4">
    //         <div className="text-center">
    //           <div className="avatar-md mx-auto mb-4">
    //             <div className="avatar-title bg-light rounded-circle text-primary h1">
    //               <i className="mdi mdi-email-open"></i>
    //             </div>
    //           </div>

    //           <Row className="justify-content-center">
    //             <Col xl={10}>
    //               <h4 className="text-primary">Subscribe !</h4>
    //               <p className="text-muted font-size-14 mb-4">
    //                 Subscribe our newletter and get notification to stay update.
    //               </p>

    //               <div className="input-group bg-light rounded">
    //                 <input
    //                   type="email"
    //                   className="form-control bg-transparent border-0"
    //                   placeholder="Enter Email address"
    //                   aria-label="Recipient's username"
    //                   aria-describedby="button-addon2"
    //                 />
    //                 <div className="input-group-append">
    //                   <button
    //                     className="btn btn-primary rounded"
    //                     type="button"
    //                     id="button-addon2"
    //                   >
    //                     <i className="bx bxs-paper-plane"></i>
    //                   </button>
    //                 </div>
    //               </div>
    //             </Col>
    //           </Row>
    //         </div>
    //       </CardBody>
    //     </Card> */}
    //   </Col>
    // </React.Fragment>
  <div className="" style={{ marginTop:'150px'}}>
    <Row>
      <Col md={1}></Col>
      <Col md={10}>
      <Row>
            <Col lg="12">
       

            <Card className="p-3" style={{ width:'60rem'}}>
                
                <CardHeader className=" " style={{ background:'#FFFFFF'}}>
                <Row >
             <Col lg={12} className="text-center d-flex" style={{ textAlign:'center', justifyContent:'center'}}>
             <Breadcrumb title="Bafana" breadcrumbItem="Reset Password" className =" mx-auto text-center" />


             </Col>
             {/* <Col lg={4} className="d-flex"  style={{ justifyContent:'end'}}>
           
             </Col> */}

             </Row>
       
             </CardHeader>
<CardBody>
  {/* <Row className=" pt-3 pb-5 mx-auto text-center">
    <h5>
      Reset Password
    </h5>
  </Row> */}
  <Row>
    <Col md ={12} className="text-danger text-end m-2" >
      {errorss}*
    </Col>
  </Row>
<Row>

<Col lg={2}>


</Col>
<Col lg={8} className="x-auto">
<form onSubmit={()=>handleSubmit()}>
<label>
<span style={{ marginRight:"64px"}}>
Current Password:
</span>
    
     <input className="p-1" type="password"   style={{ width: '300px',  border:'1px solid #b2b4b8'}}
     onChange={(event)=>{
setCurrentPass(event.target.value)
     }}
     />
   </label>
   <br/>

   <label>
   <span style={{ marginRight:"79px"}}>
   New Password :      </span>
    
     <input  className="p-1" type="password" style={{ width: '300px', border:'1px solid #b2b4b8'}} 
      onChange={(event)=>{
        setNewPass(event.target.value)
             }}
     />,

   </label>
   <br/>
   <label>
     <span  style={{ marginRight:"28px"}}>
   Confirm New Password :
     </span>
     <input  className="p-1" type="password"  style={{ width: '300px', border:'1px solid #b2b4b8'}} 
      onChange={(event)=>{
        setConfirmNewPass(event.target.value)
             }}
    />
     
   </label>

   <br/>

   {/* <input type="submit" value="Submit" className="btn-btn-info bg-info border-none text-light" /> */}
 </form>
 <br/>
   <button  className=" btn btn-info " type="submit" value="Submit" style={{ background:'', border:'none', justifyContent:'end'}}
   onClick={()=>handleSubmit()}>
submit
</button>
</Col>
<Col lg={2}>

</Col>
</Row>
</CardBody>
           </Card>
            </Col>
          </Row>
      </Col>
      <Col md={1}></Col>

    </Row>
    </div>

  )
}

export default Settings
