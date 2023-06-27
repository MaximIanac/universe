import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getUser, searchUser } from "../../../../services/userService/userService";
import { UserInterface } from "../../../../services/userService/user-service.interface";
import UserInfo from "./UserInfo";
import Preloader from "../../../../Extra/Preloader";

const UserInfoAPI = () => {

    const [userInfo, setUserInfo] = useState<UserInterface>();
    const [usersBySearching, setUsersBySearching] = useState<UserInterface[]>();
    const [isLoaded, setLoading] = useState<boolean>(false);
    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(false);
        if (id) {
            getUser(parseInt(id))
                .then(data => {
                    setLoading(true);
                    setUserInfo(data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [id])

    const handleSearchUser = (query: string) => {
        if (query) {
            navigate(`?searchUser=${query}`);

            searchUser(query)
                .then( data => {
                    setUsersBySearching(data);
                })
        } else {
            navigate("");
        }
    }

    useEffect(() => {
        const params = searchParams.get("searchUser")?.trim();
        if (params) {
            handleSearchUser(params);
        }
    }, []);

    return (
        <div>
            {isLoaded ? (
                <UserInfo
                    userInfo={userInfo}
                    usersBySearching={usersBySearching}
                    setUsersBySearching={setUsersBySearching}
                    handleSearchUser={handleSearchUser}
                />) : (<Preloader />)
            }
        </div>
    )
}

export default UserInfoAPI;