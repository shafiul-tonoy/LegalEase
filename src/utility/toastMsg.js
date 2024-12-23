import toast from "react-hot-toast"
const success = () =>toast.success("Successful!")
const errorToast = (msg) => toast.error(msg)
export {success, errorToast}