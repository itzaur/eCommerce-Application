export type ModalProps = {
    active: boolean;
    setActive(arg: boolean): void;
    children: React.ReactNode;
};
export type Category = {
    parent: { name: string; path: string };
    items: { name: string; path: string }[];
};
