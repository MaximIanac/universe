
type Props = {
    handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>

    setUsername: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>

    username: string
    password: string
}

const SignIn = ({ handleSignIn, setUsername, setPassword, username, password }: Props) => {

    let onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className="backgroundUni min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative text-center font-sans flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-gradient-to-r opacity-50 from-gray-100 to-gray-300 shadow-lg transform -skew-y-12 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <form onSubmit={handleSignIn} className="relative bg-black w-[500px] appearance-none shadow rounded text-black-700 leading-tight">
                        <div className="p-6">
                            <p className="text-2xl underline text-slate-200 font-medium mb-4">Sign In</p>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-slate-200 shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                                type="text"
                            />
                            <input
                                value={password}
                                onChange={onPasswordChange}
                                className="bg-slate-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                                type="password"
                            />
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center">
                                    <input type="checkbox" id="rememberMe" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-200">Remember Me</label>
                                </div>
                                <div className="text-sm text-white font-medium">
                                    Sign Up?
                                </div>
                            </div>
                            <button
                                disabled={!username && !password}
                                className="w-full bg-slate-200 text-black p-2 font-medium rounded disabled:opacity-30"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;