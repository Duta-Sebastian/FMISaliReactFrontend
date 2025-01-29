export const transformFacilitiesToNL = (input: string[]): string[] => {
    return input.map(str =>
        str.replace(/(?<!^)([A-Z])/g, match => ` ${match.toLowerCase()}`)
    );
};

export const transformNLToFacilities = (input: string[]): string[] => {
    return input.map(str =>
        str
            .replace(/\s(.)/g, (match) => match.toUpperCase())
            .replace(/\s+/g, '')
    );
};