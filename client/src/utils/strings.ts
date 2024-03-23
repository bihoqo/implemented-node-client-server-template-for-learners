export function shortenId(id: string, numberOfCharsToDisplayOnBothSide = 4): string {
    return `${id.substring(0, numberOfCharsToDisplayOnBothSide)}...${id.substring(id.length - numberOfCharsToDisplayOnBothSide)}`;
}
