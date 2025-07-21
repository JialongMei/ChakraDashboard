export interface SimpleTestPlugin {
    hello(options: {
        name: string;
    }): Promise<{
        message: string;
    }>;
}
