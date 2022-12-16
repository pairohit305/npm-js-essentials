export declare function ellipsize(text: string, limit?: number, content?: string): string;
export declare class Case {
    private sentence;
    constructor(sentence: string);
    toUpperCase(): this;
    toLowerCase(): this;
    toStartCase(): this;
    toCamelCase(): this;
    toPascalCase(): this;
    toSnakeCase(): this;
    toKebabCase(): this;
    get(): string;
}
export declare function alphaNumericConvertor(text: string): string;
