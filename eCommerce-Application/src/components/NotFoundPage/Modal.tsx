import { ModalProps } from '../../types';

function Modal({ active, setActive, children }: ModalProps): JSX.Element {
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={(): void => setActive(false)}
            role="presentation"
        >
            <div
                className="modal__content"
                onClick={(e): void => e.stopPropagation()}
                role="presentation"
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
