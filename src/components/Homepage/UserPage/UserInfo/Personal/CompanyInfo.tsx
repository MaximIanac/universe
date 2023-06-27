import { UserInterface } from "../../../../../services/userService/user-service.interface";
import workImage from "../../../../../assets/img/job.png";
import mailImage from "../../../../../assets/img/mail.png"

type Props = {
    userInfo: UserInterface | undefined
}

const CompanyInfo = ({ userInfo }: Props) => {
    return (
        <div className="text-gray-600">
            <div className="flex flex-wrap justify-between items-center">
                <span className="text-gray-600 text-lg">{userInfo?.email}</span>
                <img src={mailImage} className="w-12 md:max-w-auto h-auto" alt="mailImage" />
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="flex flex-wrap justify-between items-center text-lg font-normal">
                <span className="text-lg">Company</span>
                <img src={workImage} className="w-12 md:max-w-auto h-auto" alt="mailImage" />
            </div>
            <div className="flex flex-wrap justify-between items-center mt-2">
                <span className="text-lg font-normal">Name </span>
                <span className="text-sm">{userInfo?.company.name}</span>
            </div>
            <div className="flex flex-wrap justify-between items-center">
                <span className="text-lg font-normal">Title </span>
                <span className="text-sm">{userInfo?.company.title}</span>
            </div>
            <div className="flex flex-wrap justify-between items-center">
                <span className="text-lg font-normal">Department </span>
                <span className="text-sm">{userInfo?.company.department}</span>
            </div>
        </div>
    )
}

export default CompanyInfo;