export declare function textLimitor(text: string, limit?: number, content?: string): string;
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
export declare function onlyAlphanumeric(text: string): string;
//# sourceMappingURL=index.d.ts.map