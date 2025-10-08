export interface InteractiveItem {
    text: string;
    position: [number, number, number] | number[];
    description?: string;
    image?: string;
}

export interface Section {
    id: string;
    title: string;
    subtitle: string;
    items: InteractiveItem[];
}
