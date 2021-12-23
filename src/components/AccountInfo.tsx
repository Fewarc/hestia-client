import React from "react";
import { useSelector } from "react-redux";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";

const AccoutnInfo: React.FC = () => {
    const user = useSelector<UserType, UserType>(state => getUserData(state));

    console.log(user);
    

    return (
        <div className='w-full h-full p-10 pt-24'>
            <div className='w-full h-full rounded-md shadow-md flex'>
                
            </div>
        </div>
    );
}

export default AccoutnInfo;