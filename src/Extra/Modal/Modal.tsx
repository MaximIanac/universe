import classes from './Modal.module.css';

type Props = {
    active: boolean,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    children: any
}

const ModalUser = ({active, setModalActive, children}: Props) => {
    return (
        <div className={active ? `${classes.modal} ${classes.active}` : classes.modal} onClick={() => {setModalActive(false)}}>
            <div className={active ? `${classes.modalContent} ${classes.active}` : classes.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalUser;