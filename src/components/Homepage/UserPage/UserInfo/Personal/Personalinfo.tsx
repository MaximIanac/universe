import { UserInterface } from "../../../../../services/userService/user-service.interface";

type Props = {
    userInfo: UserInterface | undefined
}

const Personalinfo = ({userInfo}: Props) => {
    return (
        <div className="rounded-lg w-auto md:w-full shadow-lg shadow-gray-300 font-sans border-slate-200 md:text-center p-4 md:p-8 mb-8">
            <div className="flex flex-wrap justify-between md:grid md:grid-cols-2 text-left w-auto md:w-3/4 py-4 first:pt-0">
                <div className="text-lg font-normal pr-2">Full name</div>
                <div className="text-gray-600 text-lg">{userInfo?.firstName} {userInfo?.lastName} {userInfo?.maidenName}</div>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-wrap justify-between md:grid md:grid-cols-2 text-left w-auto md:w-3/4 py-4 first:pt-0">
                <div className="text-lg font-normal pr-2">Email</div>
                <div className="text-gray-600 text-lg">{userInfo?.email}</div>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-wrap justify-between md:grid md:grid-cols-2 text-left w-auto md:w-3/4 py-4 first:pt-0">
                <div className="text-lg font-normal pr-2">Address</div>
                <div className="text-gray-600 text-lg">{userInfo?.address.address}</div>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-wrap justify-between md:grid md:grid-cols-2 text-left w-auto md:w-3/4 py-4 first:pt-0">
                <div className="text-lg font-normal pr-2">Birth Date</div>
                <div className="text-gray-600 text-lg">{userInfo?.birthDate}</div>
            </div>
            <hr className="border-gray-300" />
            <div className="flex flex-wrap justify-between md:grid md:grid-cols-2 text-left w-auto md:w-3/4 py-4 first:pt-0">
                <div className="text-lg font-normal pr-2">University</div>
                <div className="text-gray-600 text-lg">{userInfo?.university}</div>
            </div>
        </div>
    )
}

export default Personalinfo;