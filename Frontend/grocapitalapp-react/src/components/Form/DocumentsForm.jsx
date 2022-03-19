import { useState, useContext, createRef } from "react";
import { Link } from "react-router-dom";
import { AppControlContext } from "../../context/AppControlContext";
import SideBar from "../SideBar/SideBar";
import logo from "../../static/logo.svg";
import Button from '@material-ui/core/Button';
import addUserDocs from "../../services/Forms/addUserDocs";
import patchFormStep from "../../services/Forms/patchFormStep";
import { useHistory } from "react-router-dom";
import chk from "../../static/checkmark.svg"
import BackButton from "../navigations";


const DocumentsForm = (props) => {
  const history = useHistory();
  const { docsForm, setDocsForm } = useContext(AppControlContext);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [imageType, setImageType] = useState("");
  const imageUpload = createRef();
  const { setFormStep, setFormBackSteps, formBackSteps } = useContext(AppControlContext);

  const handleInput = (e) => {
    setImageType(e.target.value)
  }

  const handleImageItemDelete = (e) => {
    docsForm.splice(e.target.id, 1)
    setDocsForm([...docsForm])
  }

  const imageUploadHandler = (e) => {
    docsForm.some((item) => {
      if (item.ImageType === imageType)
        console.log(imageType, docsForm)
        setErrorState(true);
        console.log(item.ImageType === imageType)
        return
    });

    if (!errorState && imageType !== ""){
      const image = e.target.files[0];
      setDocsForm([...docsForm, {Image:image, ImageType:imageType}])
      setErrorState(false);
    }
  }
  
  const Next = () => {
    setFormBackSteps(formBackSteps > 0 ? formBackSteps-1:formBackSteps);
    docsForm.map( async (item) => {
      const userDoc = await addUserDocs(item)
    })
    setFormStep(5)
  }
  return (
      <div id="registration-page">
        <section className="dashboard">
          <div className="wrap wrap-custom">
            <div className="dashboard__row">
              <div className="dashboard__content dashboard__content--sm form_custom">
              <div className="registration-header">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
                <div className="registration-header__steps">
                  <div className="registration-header__step active"></div>
                  <div className="registration-header__line active"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                </div>
              </div>
                {apiErrorState && (
                  <div className="alert alert--error">
                    <p>{apiErrorMessage}</p>
                  </div>
                )}
                {errorState && (
                  <div className="alert alert--error">
                    <p>This type of document has already been uploaded</p>
                  </div>
                )}
                <form action="#" className="registration">
                  <div className="registration__top">
                    <h1>Upload Documents</h1>
                    <div className="row">
                    {/* <div className="col-12" style={{paddingBottom:"12px"}}>
                        <div style={{
                          display:"flex",
                          justifyContent:"space-between",
                          border:"1px solid #80B6A9",
                          borderRadius:"4px"
                          }}>
                          <div style={{display:"flex"}}>
                            <img src={chk} alt="" style={{paddingLeft:"10px"}}/>
                            <p style={{
                                  paddingLeft:"20px",
                                  color:"#016D53",
                                  fontWeight:"600"
                            }}>ID</p>
                          </div>
                          <p style={{
                                paddingRight:"40px",
                                color:"#7D7D7D"
                          }}>Synced by Plaid</p>
                        </div>
                      </div> */}
                      {docsForm.map((item, index) => (
                        <div className="col-12" style={{paddingBottom:"12px"}}>
                        { item["Image"] &&(
                        <div style={{
                          display:"flex",
                          justifyContent:"space-between",
                          border:"1px solid #80B6A9",
                          borderRadius:"4px"
                          }}>
                          <div style={{display:"flex"}}>
                            <img src={chk} alt="" style={{paddingLeft:"10px"}}/>
                            <p style={{
                                  paddingLeft:"20px",
                                  color:"#016D53",
                                  fontWeight:"600"
                            }}>{item["ImageType"]}</p>
                          </div>
                          <div style={{display:"flex"}}>
                            <p style={{
                                  paddingRight:"10px",
                                  color:"#7D7D7D"
                            }}>{item["Image"]["name"]}</p>
                            <i id={index} onClick={handleImageItemDelete} class="fa fa-close" 
                            style={{
                              cursor:"pointer",
                              fontSize:"23px",
                              color:"#7D7D7D", 
                              alignSelf:"center", 
                              paddingRight:"10px", 
                              paddingBottom:"5px"
                            }}></i>
                          </div>
                        </div>
                        )}
                      </div>
                      ))}
                      <div className="col-12">
                        <h3 style={{marginTop:"40px"}}>Additional Information to Assist us with a decision:</h3>
                      </div>
                      <div className="col-12 col-sm-9">
                        <div className="form-group">
                          <select name="Title" onChange={handleInput}>
                            <option value="" disabled selected hidden>Please Select Type</option>
                            <option value="One Page Executive Summary">One Page Executive Summary</option>
                            <option value="Business Plan">Business Plan</option>
                            <option value="Projected Financial Statements">Projected Financial Statements</option>
                            <option value="Pitch Deck">Pitch Deck</option>
                            <option value="Resume">Resume</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-3" 
                        style={{
                          paddingLeft:"30px",
                          display:"flex",
                          justifyContent:"space-around"
                          }}
                        >
                        <input
                            id="img-fld"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx, .txt"
                            name="avatar"
                            style={{display:"none"}}
                            onChange={imageUploadHandler}
                          />
                        <label htmlFor="img-fld">
                        <Button variant="contained" color="green" component="span"
                          style={{
                            boxShadow:"none", 
                            height:"45px", 
                            width:"150px",
                            color:"#7D7D7D",
                            backgroundColor:"#EDF5F5",
                            textTransform:"capitalize",
                            fontSize:"16px"
                            }}
                        >
                          Browse
                        </Button>
                      </label>
                      </div>
                    </div>
                    {/* <div className="registration__linkedin">
                    </div> */}
                  </div>
                  <div style={{display:"flex",marginTop:"2%"}}>
                    <BackButton
                      step={4}
                    />
                  <div
                    onClick={Next}
                    className="btn btn--full btn--green open-popup"
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="21"
                      viewBox="0 0 12 21"
                    >
                      <path
                        d="M-0.293106781,-0.293106781 C0.0673771804,-0.653590743 0.634608236,-0.681320278 1.02689944,-0.376295388 L1.12110678,-0.293106781 L10.9652136,9.551 L1.12110678,19.3951068 C0.730582489,19.7856311 0.0974175106,19.7856311 -0.293106781,19.3951068 C-0.653590743,19.0346228 -0.681320278,18.4673918 -0.376295388,18.0751006 L-0.293106781,17.9808932 L8.136,9.551 L-0.293106781,1.12110678 C-0.653590743,0.76062282 -0.681320278,0.193391764 -0.376295388,-0.198899443 L-0.293106781,-0.293106781 Z"
                        transform="translate(1 1)"
                      />
                    </svg>
                  </div>
                </div>
                </form>
              </div>
              <SideBar
                heading1="Let's build your company profile"
                description="The more information we have about your business the more chances we will find you necessary financial help."
              />
            </div>
          </div>
        </section>
      </div>
  );
};

export default DocumentsForm;