import { BiExit } from "react-icons/bi"

const Return = () => {
    return (
        <a className="return" href={process.env.REACT_APP_API_URI!}>
            <BiExit
                className="return_btn"
                size={30}
            />
        </a>
    )
}

export default Return
