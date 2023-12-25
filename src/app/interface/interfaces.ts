export interface Item {
    id: number;
    name: string;
    description: string;
    price: string;
    location: string;
    status: number;
    available: number;
    creation_date: Date;
    user: User;
    category: Category;
    images: string[];
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    city: string;
    email: string;
    telephone: string;
    status: number;
    avatar: string;
}

export interface Category {
    id: number;
    name: string;
    status: number;
}

export interface Attribute {
    id: number;
    name: string;
    status: number;
    category: Category;
}

export interface Attr {
    item: any;
    attribute: Attribute;
    value: string;
}

export interface ItemAttribute {
    id: number;
    item: Item;
    attribute: Attribute;
    value: string;
}

export interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

export interface Message {
    text: string;
    status: number;
    user: any;
}

export interface MessageNode {
    name: string;
    children?: MessageNode[];
}

export interface UserWithPin {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    city: string;
    email: string;
    telephone: string;
    status: number;
    pin: string;
}

export interface UsernamePassword {
    username: string;
    password: string;
    pin: string;
}
