
export interface InteractiveItem {
    text: string;
    position: [number, number, number] | number[];
}

export interface Section {
    id: string;
    title: string;
    subtitle: string;
    items: InteractiveItem[];
}
