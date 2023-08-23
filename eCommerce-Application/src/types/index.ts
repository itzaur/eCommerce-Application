export type ModalProps = {
    active: boolean;
    setActive(arg: boolean): void;
    children: React.ReactNode;
};
export type Categories = {
    parent: string;
    children: string[];
};
