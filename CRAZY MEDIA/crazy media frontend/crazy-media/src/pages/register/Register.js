import { Cancel, PermMedia } from '@material-ui/icons';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './register.css'

function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const from = useRef();
    const desc = useRef();
    
    const navigate = useNavigate();
    const [gender, setGender] = useState(1);
    const [relationship, setRelationship] = useState(1);
    // eslint-disable-next-line
    const [file, setFile] = useState(null);
    const [coverImg, setCoverImg] = useState(null);


    const genderChange = (e)=>{
        setGender(e.target.value)
    }

    const relationshipChange = (e)=>{
        setRelationship(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(confirmPassword.current.value !== password.current.value){
            password.current.setCustomValidity("Passwords don't match");
        }else{

            if(file){
                let data = new FormData();
                var fileName = Date.now() + file.name;
                data.append('name', fileName)
                data.append('file',file)
                try {
                    await axios.post("/upload",data);
                } catch (err) {
                    console.log(err);
                }
            }

            if(coverImg){
                let coverImgData = new FormData();
                var coverFileName = Date.now() + coverImg.name;
                coverImgData.append('name', coverFileName)
                coverImgData.append('file',coverImg)
                try {
                    await axios.post("/upload",coverImgData);
                } catch (err) {
                    console.log(err);
                }
            }

            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                from: from.current.value,
                desc: desc.current.value,
                gender: gender,
                relationship: relationship,
                profilePicture: fileName,
                coverPicture: coverFileName,
            }
            try{
                await axios.post("/auth/register", user);
                navigate('/login');
            }catch(err){

            }
        }
    }

    return (
        <div className="register">
            <div className="background"></div>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Crazy Media</h3>
                    <span className="registerDesc">
                        Connect with us and show the world how much crazy you are.
                    </span>
                </div>
                <div className="registerRight">
                    <form onSubmit={handleSubmit} className="registerContainer">
                        <input type="text" ref={username} placeholder="Name" className="registerInput" required/>
                        <input type="email" ref={email} placeholder="Email" className="registerInput" required/>
                        <input type="password" ref={password} placeholder="Password" minLength="5" className="registerInput" required/>
                        <input type="password" ref={confirmPassword} placeholder="Confirm Password" minLength="5" className="registerInput" required/>
                        <input type="text" ref={from} placeholder="Where are you from?" minLength="5" className="registerInput" required/>
                        <input type="text" ref={desc} placeholder="Tell me about yourself?" minLength="5" maxLength="70" className="registerInput" required/>
                        <div className="radioInputContainer" onChange={genderChange}>
                            <label className='primaryLabel'>Gender:</label>
                            <div className="radioInputs">
                                <input id='male' type="radio" value='1' name='gender' defaultChecked/>
                                <label htmlFor="male" className="secondaryLabel">Male</label>
                            </div>
                            <div className="radioInputs">
                                <input id='female' type="radio" value='2' name='gender'/>
                                <label htmlFor='female' className="secondaryLabel">Female</label>
                            </div>
                            <div className="radioInputs">
                                <input id='other' type="radio" value='3' name='gender'/>
                                <label htmlFor='other' className="secondaryLabel">Other</label>
                            </div>
                        </div>
                        <div className="radioInputContainer" onChange={relationshipChange}>
                            <label className='primaryLabel'>Relationship:</label>
                            <div className="radioInputs">
                                <input id='single' type="radio" value='1' name='relationship' defaultChecked/>
                                <label htmlFor="single" className="secondaryLabel">Single</label>
                            </div>
                            <div className="radioInputs">
                                <input id='married' type="radio" value='2' name='relationship'/>
                                <label htmlFor='married' className="secondaryLabel">Married</label>
                            </div>
                            <div className="radioInputs">
                                <input id='otherRelationship' type="radio" value='3' name='relationship'/>
                                <label htmlFor='otherRelationship' className="secondaryLabel">Other</label>
                            </div>
                        </div>
                        <div className="imageContainer">
                            <label className="primaryLabel">Profile Image:</label>
                            <label htmlFor="profileImg" className="imgFile">
                                <PermMedia htmlColor="white" className='imgIcon'/>
                                <input type="file" name="profileImg" id="profileImg" accept=".png,.jpeg,.jpg" className='fileInput' onChange={(e)=>setFile(e.target.files[0])}/>
                            </label>
                            {file && (
                                    <span className="imgPreviewContainer">
                                        <img src={URL.createObjectURL(file)} alt="" className="previewImg" />
                                        <Cancel className='cancelPreviewImg' onClick={()=>setFile(null)} />
                                    </span>
                                )}
                        </div>
                        <div className="imageContainer">
                            <label className="primaryLabel">Cover Image:</label>
                            <label htmlFor="coverImg" className="imgFile">
                                <PermMedia htmlColor="white" className='imgIcon'/>
                                <input type="file" name="coverImg" id="coverImg" accept=".png,.jpeg,.jpg" className='fileInput' onChange={(e)=>setCoverImg(e.target.files[0])}/>
                            </label>
                            {coverImg && (
                                    <span className="imgPreviewContainer">
                                        <img src={URL.createObjectURL(coverImg)} alt="" className="previewImg" />
                                        <Cancel className='cancelPreviewImg' onClick={()=>setCoverImg(null)} />
                                    </span>
                                )}
                        </div>
                        <button type="submit" className="loginButton">Signup</button>
                        <div className='registerButton'>
                            <Link to="/login">Login into account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
