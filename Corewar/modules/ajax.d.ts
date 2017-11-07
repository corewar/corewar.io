
interface ajax {
    send(
        url: string,
        callback: (response: string) => void,
        method: string,
        data: any,
        sync?: boolean): void;

    get(
        url: string,
        data: any,
        callback: (response: string) => void,
        sync?: boolean): void;

    post(
        url: string,
        data: any,
        callback: (response: string) => void,
        sync?: boolean): void;
}

declare var ajax: ajax;