import { Link } from "react-router-dom";
const Header=()=>{
    const profession = localStorage.getItem('profession');
    return(
        <div className="flex justify-between bg-rose-900 shadow-lg m-2">
            <div className="logo container">
                <img alt="logo not loaded" className="w-12" src={require('../utils/Aidar_logo2.png')}/>
            </div>
            <div className="flex items-center">
            <ul className="flex">
            <li className="px-4 text-white"><Link to="/home">Home</Link></li>
            <Link to="https://www.aidar.com/company" target="_blank" rel="noopener noreferrer">
                <li className="text-nowrap px-4 text-white cursor-pointer">About Us</li>
            </Link>
            { profession== "Doctor" ?
                <li className="text-nowrap px-4 text-white"> <Link to="createsurvey">Create Survey</Link></li>
                : <li className="text-nowrap px-4 text-white"> <Link to="showsurvey">Show Survey</Link></li>
            }
            
        { profession== "Doctor" &&  <li className="text-nowrap px-4 text-white"><Link to="AnsweredSurvey">Answered Survey</Link></li>}
            <li className="text-nowrap px-4 text-white"><Link to="Profile">Profile</Link></li>
            <li className="text-nowrap px-4 text-white"><Link to="logout">Logout</Link></li>
            </ul>
            </div>
        </div>
    )

}

export default Header;