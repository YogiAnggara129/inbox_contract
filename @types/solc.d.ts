declare module 'solc' {
    export function compile(source: string, options?: any): any;
    export function setupMethods(contract: any): any;
    // Tambahkan fungsi dan tipe lainnya sesuai kebutuhan
}
