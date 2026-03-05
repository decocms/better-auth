const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

const RE =
	/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i;

export type StringValue = `${number}${"ms" | "s" | "m" | "h" | "d" | "w" | "y"}`;

/**
 * Parse a time string (e.g. "7d", "30m", "5s") into milliseconds.
 */
export function ms(val: StringValue | string): number {
	const str = String(val);
	if (str.length > 100) {
		throw new Error(`Value exceeds max length: ${str}`);
	}
	const match = RE.exec(str);
	if (!match) {
		throw new Error(`Invalid time string: ${str}`);
	}
	const n = parseFloat(match[1]!);
	const type = (match[2] ?? "ms").toLowerCase();
	switch (type) {
		case "years":
		case "year":
		case "yrs":
		case "yr":
		case "y":
			return n * y;
		case "weeks":
		case "week":
		case "w":
			return n * w;
		case "days":
		case "day":
		case "d":
			return n * d;
		case "hours":
		case "hour":
		case "hrs":
		case "hr":
		case "h":
			return n * h;
		case "minutes":
		case "minute":
		case "mins":
		case "min":
		case "m":
			return n * m;
		case "seconds":
		case "second":
		case "secs":
		case "sec":
		case "s":
			return n * s;
		case "milliseconds":
		case "millisecond":
		case "msecs":
		case "msec":
		case "ms":
			return n;
		default:
			throw new Error(`Invalid time unit: ${type}`);
	}
}
