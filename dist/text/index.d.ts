export declare function ellipsize(text: string, limit?: number, content?: string): string;
export declare class Case {
    private sentence;
    constructor(sentence: string);
    /**
     * "type case" 👉 "TYPE CASE"
     */
    toUpperCase(): this;
    /**
     * "tYpE cASE" 👉 type case"
     */
    toLowerCase(): this;
    /**
     * "tYpe cAse" 👉 "Type Case"
     */
    toStartCase(): this;
    /**
     * "type cAsE" 👉 "typeCase"
     */
    toCamelCase(): this;
    /**
     * "tyPe cAsE" 👉 "TypeCase"
     */
    toPascalCase(): this;
    /**
     * "tyPe cAsE" 👉 "type_case"
     */
    toSnakeCase(): this;
    /**
     * "tyPe cAsE" 👉 "type-case"
     */
    toKebabCase(): this;
    get(): string;
}
/**
 * a0b#z 👉 a0b35z
 *
 * Char that are not alpha numeric, will be replaced with its char code
 * eg. # => 35
 */
export declare function alphaNumericConvertor(text: string): string;
//# sourceMappingURL=index.d.ts.map