
export interface User {
    id: string;
    name: string;
    email: string;
    tabGroups: TabGroup[];
}

export interface Tab{
    id: string;
    name: string;
    link: string;
}

export interface TabGroup{
    id: string;
    name: string;
    tabs: Tab[];
}
