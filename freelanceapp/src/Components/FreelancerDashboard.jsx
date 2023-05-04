import FreelancerProfileCreate from './FreelancerProfileCreate';
import FreelancerView from './FreelancerView';
import FreelancerProfileView from './FreelancerProfileView';
import FreelancersProfileView from './FreelancersProfileView';
import FreelancerProfileEdit from './FreelancerProfileEdit'; 
import Test from './test';
import BusinessList from './BusinessList';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJobs, fetchSearchJob} from '../actions/jobAction';
import {getIndFreelancerProfile, getAllFreelancerProfiles} from '../actions/freelancerAction';
import {LogOut} from '../actions/freelancerAuthAction';
import {loadFreelancer} from '../actions/freelancerAuthAction';
import FreelancerDivContent from './FreelancerDivContent';
import AssignedJob from './AssignedJob';

const FreelancerDashboard = () => {
  
  const dispatch = useDispatch();
  const {jobs, searchJob} = useSelector((state) => state.jobReducer);
  const {freelancerProfile} = useSelector((state) => state.freelancerReducer);
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showFreelancersDiv, setShowFreelancersDiv] = useState(false);
  const [assignedJobClick, setAssignedJobClick] = useState(false);
  

 useEffect(() => {
    dispatch(loadFreelancer());
  },[dispatch])

  useEffect(() => {
    dispatch(getIndFreelancerProfile());
  },[dispatch])
 
  useEffect(()=>{
    dispatch(fetchJobs());
  },[dispatch])
  
    
  const handleEditProfile = (e) =>{
    e.preventDefault();
    navigate("/editfreelancerprofile")
  }
  
  const handleOpenFreelancersProfile = (e) =>{
    e.preventDefault();
    setShowFreelancersDiv(true);
    setAssignedJobClick(false);
  }
  
  const handleAssignedJob = (e) =>{
    e.preventDefault();
    setAssignedJobClick(true);
  }
  
  const handleOpenDashboard = (e) =>{
    e.preventDefault();
    setShowFreelancersDiv(false);
    setAssignedJobClick(false);
  }
  
  const handleShowProfileModal = (e) =>{
    e.preventDefault();
    setShowProfileModal(true);
  }
  
  const handleOnClose = (e) =>{
    setShowProfileModal(false);
  }

  const handleSearch = (e) =>{
    dispatch(fetchSearchJob(searchValue));
  }
  
  const handleLogOut = (e) =>{
    e.preventDefault();
    dispatch(LogOut())
    navigate("/")   
  }

  if(freelancerProfile === null){
    return(
      <FreelancerProfileCreate />
    )
  }

  return(
  <>
  <FreelancerProfileView visible={showProfileModal} onClose={handleOnClose}/>
  <div className="border border-gray-800 bg-laracast_mainbg items-center pt-2">
    <form className="mx-32 my-3 bg-gray-900 flex gap-4 rounded-full">
      <input type="search" value= {searchValue} onChange={(e)=> setSearchValue(e.target.value)} className="w-full px-24 py-1 text-base rounded-full font-normal text-gray-900 bg-laracast_hoverbg rounded transition ease-in-out m-0 focus:text-black focus:bg-gray-100 focus:border-black focus:outline-none" placeholder="Type your programming language/skills here..." aria-label="Search" aria-describedby="button-addon3" />
      <button onClick={handleSearch} className="btn block px-6 py-2.5 bg-laracast_hoverbg text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="white" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </button>
    </form>
  </div>

  <div className= "flex border border-gray-900  bg-laracast_mainbg flex-col-3 space-x-0  gap-4">
    <div className="w-42 pt-6">
    
   <div className=" w-40 h-42 mt-0 pl-0 py-2 bg-laracast_bg  rounded-lg overflow-y-auto border-0 border-red-500">
      <ul className="space-y-2">
         <li>
            <button onClick={handleOpenDashboard}className="flex items-center p-2 font-light text-gray-300 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="w-6 h-6 fill-blue-600 stroke-gray-300 text-gray-100 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3 text-lg text-gray-100">Dashboard</span>
            </button>
         </li>
         <li>
            <button onClick={handleEditProfile} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0  fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
               <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
               <span className="flex-1 ml-3 text-lg text-gray-100 whitespace-nowrap">Edit Profile</span>
            </button>
         </li>
         <li>
            <button onClick={handleOpenFreelancersProfile} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Freelancers </span>
            </button>
         </li>
         <li>
            <button onClick={handleShowProfileModal} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Your Profile</span>
            </button>
         </li>
        <li>
          <button onClick={handleAssignedJob} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
              <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Assigned Job</span>
          </button>
        </li>
        <li>
            <button onClick={handleLogOut} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="flex-shrink-0 fill-blue-600 stroke-gray-300 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
               <span className="flex-1 text-lg text-gray-100 ml-3 whitespace-nowrap">Log Out</span>
            </button>
         </li>
      </ul>
   </div>
    </div>
    
    {assignedJobClick && <AssignedJob />}
    

    {!assignedJobClick && <div className=" w-8/12 rounded-lg items-center justify-center overflow-hidden  py-2 pl-4 pr-4  sm:py-12">
      {
        (searchJob.length >0 && searchValue) ?
        (
          <>
            {
              searchJob.map((job,i)=>{
              return <FreelancerView 
                key={i}
                id={job._id}
                date={job.date}
                jobTitle={job.jobTitle}
                jobDescription= {job.jobDescription}
                skillSetReq= {job.skillSetReq}
                jobBudget= {job.jobBudget}
                business= {job.business}
                interested= {job.interested}
                jobCategory={job.jobCategory}
                />
                })
            }
          </>
        )
        :( 
            <FreelancerDivContent showFreelancersDiv={showFreelancersDiv}  jobs={jobs}/>
        )
      }
   </div>
    }

<div className="bg-laracast_bg  mt-12 w-60 h-1/2 ">
  
<div className="max-w-2xl mx-auto">

	<div className="pl-4 w-42  rounded-lg  shadow-md sm:p-8">
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-red-500">Businesses</h3>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a>
    </div>
        <BusinessList />
      </div>
    </div>  
  </div>
  


  </div>
    </>
  )
}
export default FreelancerDashboard;
