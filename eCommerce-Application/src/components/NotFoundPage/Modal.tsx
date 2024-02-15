import { ModalProps } from '../../types';

function Modal({ active, setActive, children }: ModalProps): JSX.Element {
    return (
        <div className={active ? 'modal active' : 'modal'} role="presentation">
            <div
                className="modal__content"
                onClick={(e): void => e.stopPropagation()}
                role="presentation"
            >
                {children}
                <button
                    className="btn btn--close"
                    type="button"
                    onClick={(): void => {
                        setActive(false);
                    }}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default Modal;
