import { UserInterface } from "../../../../services/userService/user-service.interface";
import Personalinfo from "./Personal/Personalinfo";
import CompanyInfo from "./Personal/CompanyInfo";
import PostsAPI from "./Posts/PostsAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    userInfo: UserInterface | undefined,
    handleSearchUser: (query: string) => void,
    usersBySearching: UserInterface[] | undefined,
    setUsersBySearching: React.Dispatch<React.SetStateAction<UserInterface[] | undefined>>
}

const UserInfo = ({ userInfo, handleSearchUser, usersBySearching, setUsersBySearching }: Props) => {

    const [isMenuCompanyOpen, setOpeningCompanyMenu] = useState<boolean>(false);
    const [isMenuPersonalOpen, setOpeningPersonalMenu] = useState<boolean>(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");

    const handleToggleCompanyMenu = () => {
        setOpeningCompanyMenu(!isMenuCompanyOpen);
    };

    const handleToggleParsonalMenu = () => {
        setOpeningPersonalMenu(!isMenuPersonalOpen);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && search) {
            handleSearchUser(search);
        }
    };

    const handleSearchEmpty = () => {
        setSearch("");
        handleSearchUser("");
        setUsersBySearching(undefined);
    }

    return (
        <div className="my-8 max-w-screen-xl px-4 m-auto">
            <div className="flex-wrap gap-8 md:flex-nowrap md:flex md:justify-between w-full">
                <div className="w-full md:w-1/3 m-auto md:m-0">
                    <div className="rounded-lg m-auto max-w-md max-h-md md:w-full shadow-lg bg-blue-500 shadow-gray-300 font-sans border-slate-300 text-center p-4 mb-8">
                        <img src={userInfo?.image} className="mb-6 rounded-full m-auto" alt="avatar" />
                        <div className="mb-2 text-2xl font-semibold text-white">{userInfo?.username}</div>
                        <div className="mb-2 text-lg font-semibold text-white">{userInfo?.phone}</div>
                        <div className="mb-2 text-lg font-semibold text-white">Age: {userInfo?.age} years</div>
                    </div>

                    <div className="relative w-full ">
                        <div className="absolute inset-y-0 flex items-center pl-3 p-4 md:space-x-8">
                            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div onClick={handleSearchEmpty} className="cursor-pointer absolute inset-y-0 flex items-center right-0 pl-3 p-4 md:space-x-8">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={search}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block mt-4 w-full h-12 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-t-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Search User..."
                            />
                        </div>
                    </div>
                    {usersBySearching &&
                        <div className="w-full font-sans bg-gray-50 border border-t-0 border-gray-300 p-4 mt-0">
                            {usersBySearching.length > 0 ? (usersBySearching.map(item => (
                                <div onClick={() => {navigate(`../${item.id}`); setUsersBySearching(undefined)}} className="mt-3 pb-1 cursor-pointer border-b first:mt-0 last:pb-0 last:border-b-0">
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex justify-start gap-2 items-center">
                                            <div>
                                                <img className="w-10 h-10 p-1 rounded-full ring-2 ring-blue-400 mb-2" src={item.image} alt="" />
                                            </div>
                                            <div className="text-lg font-semibold tracking-tight text-gray-900">{item.username}</div>
                                            <div className="font-normal text-gray-500">{item.firstName} {item.lastName}</div>
                                        </div>
                                        <div>
                                            <svg className="w-5 h-5" fill="none" stroke="gray" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))) : (<div className="flex justify-center text-gray-400 text-md font-light">User does not exist</div>)}
                        </div>
                    }


                    <button className={`${isMenuCompanyOpen ? 'border-0 mt-5' : 'border-b-2 border-gray-400 my-5'
                        } flex p-2 w-full md:hidden`}
                        onClick={handleToggleCompanyMenu}
                    >
                        <span className="mr-2 text-xl">Company Info</span>
                        {isMenuCompanyOpen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        )}
                    </button>

                    <div className={`${isMenuCompanyOpen ? '' : 'hidden'
                        } md:block rounded-lg w-full shadow-lg shadow-gray-300 font-sans border-slate-300 text-center p-4 mt-8`}>
                        <CompanyInfo userInfo={userInfo} />
                    </div>
                </div>

                <div className="w-full md:w-2/3">

                    <button className={`${isMenuPersonalOpen ? 'border-0 mt-5' : 'border-b-2 border-gray-400 my-5'
                        } flex p-2 w-full md:hidden`}
                        onClick={handleToggleParsonalMenu}
                    >
                        <span className="mr-2 text-xl">Personal Info</span>
                        {isMenuPersonalOpen ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        )}
                    </button>

                    <div className={`${isMenuPersonalOpen ? '' : 'hidden'
                        } md:block`}>
                        <Personalinfo userInfo={userInfo} />
                    </div>

                    <PostsAPI userAvatar={userInfo?.image} />
                </div>
            </div>
        </div>
    )
}

export default UserInfo;