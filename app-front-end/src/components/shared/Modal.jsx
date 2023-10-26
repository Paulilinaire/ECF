import classes from "./Modal.module.css"

const Modal = (props) => {

    const handleBackgroundClick = () => {
        props.onClose()
    }

    return ( 
        <div className={classes.modal}>
            <div className={classes.modalContent}>
                <div className="text-end">
                    <button onClick={handleBackgroundClick} className="btn btn-danger"><i class="bi bi-x-lg"></i></button>
                </div>
                {props.children}
            </div>
        </div>
     );
}
 
export default Modal;