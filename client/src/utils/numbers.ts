/**
 * Check if the value is a valid number,
 * Check if the string only has numbers and at most one dot
 */
export function isStringValidNumber(value: string | undefined): boolean {
    if (typeof value === "undefined") {
        return false;
    }

    return /^\d*\.?\d*$/.test(value.trim());
}





