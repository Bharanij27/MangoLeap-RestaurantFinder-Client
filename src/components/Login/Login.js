import React, { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import Loading from '../Loading/Loading';
import { useHistory } from "react-router-dom";
import callAPI from "../../common/callAPI";
import Input from "../Input/Input";
import { setUser } from "../../common/user";
import Select from "../Select/Select";

const Login = ({ title, setIsLogin }) => {
    let formDetails = { email: "", pass: "", type: "User" };
    const [formData, setFormData] = useState(formDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookie] = useCookies(["resUser"]);
    const history = useHistory();
    
    const onInputChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
    };
    
    const loginUser = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        try {
            let response = await callAPI("https://restaurantfinder-server.herokuapp.com/", { ...formData }, 'POST');
            if (response.status === 200) {
                cookies && setCookie("resUser", { token: response.token }, { path: "/" });
                setIsLoading(false);
                setFormData(formDetails);
                setUser(formData.type);
                history.push("/selectCity");
            } else {
                setIsLoading(false);
                alert(response.message);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };
    
    return (
        <Fragment>
            {isLoading && <Loading/>}
            <form className="form-signin" onSubmit={(e) => loginUser(e)}>
                <Input id="inputEmail" type="email" placeholder="Email Address" value={formData.email} name="email" setValue={onInputChange}/>
                <Input id="inputPassword" type="password" placeholder="Password" value={formData.pass} name="pass" setValue={onInputChange}/>
                <Select setValue={onInputChange} options={['User', 'Admin']} />
                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit"> {title} </button>
            </form>
            <hr className="my-4" />
            <div className="text-center">
                Didn't have an account?
                <p className="d-block text-center mt-2 link cursor" onClick={() => setIsLogin(false)}>
                    Sign In
                </p>
            </div>
        </Fragment>
    );
  };

export default Login;
