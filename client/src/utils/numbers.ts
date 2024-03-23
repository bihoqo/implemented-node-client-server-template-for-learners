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

/**
 * Check if the value is a valid integer,
 * @param min The minimum value
 * @param max The maximum value
 */
export function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const GLOBAL_APP_LOCALE = "en-US";

const options = {
    currency: "USD",
    style: "currency",
};

const intlFraction = new Intl.NumberFormat(GLOBAL_APP_LOCALE, {
    ...options,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const intl = new Intl.NumberFormat(GLOBAL_APP_LOCALE, {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function decimalFormatter(amount: number | string) {
    const value = Number(amount);

    if (Number.isNaN(value)) {
        return null;
    }

    let fn = intlFraction.format;

    if (value % 1 === 0) {
        fn = intl.format;
    }

    return fn(value);
}

export function returnPNLColor(amount: number) {
    switch (true) {
        case amount > 0:
            return "text-greenMid";
        case amount < 0:
            return "text-redMid";
        case amount === 0:
            return "text-whiteMid";
        default:
            break;
    }
};

export function returnPNLString(amount: number) {
    switch (true) {
        case amount > 0:
            return `+${decimalFormatter(amount)}`;
        case amount < 0:
            return `-${decimalFormatter(Math.abs(amount))}`;
        default:
            return decimalFormatter(amount);
    }
};

export function returnROIString(roi: number) {
    switch (true) {
        case roi > 0:
            return `+${roi.toFixed(2)}%`;
        case roi < 0:
            return `${roi.toFixed(2)}%`;
        default:
            return `${roi.toFixed(2)}%`;
    }
};
