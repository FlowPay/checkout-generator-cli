export class Loader {
	constructor(
		max: number,
		text = "",
		char = "#",
		charEmpty = " ",
		startIndex = 0,
	) {
		this.max = max;
		this.text = text;
		this.char = char;
		this.charEmpty = charEmpty;
		this.i = startIndex;
	}

	max: number;
	text: string;
	char: string;
	charEmpty: string;
	i: number;

	start = () => this.progressBar(this.i);

	next(i?: number) {
		if (!i) {
			this.i++;
			i = this.i;
		}
		this.progressBar(i);
	}

	progressBar(i: number) {
		/* using 20 to make the progress bar length 20 charactes, multiplying by 5 below to arrive to 100 */

		const dots = this.char.repeat(i);
		const left = this.max - i;
		const empty = this.charEmpty.repeat(left);
		const percentage = Math.round((i * 100) / this.max);

		/* Set max length progress bar to fix impagination */
		if (this.max > 50) {
			process.stdout.write(`\r${this.text}${percentage}%`);
			return;
		}

		/* need to use  `process.stdout.write` becuase console.log print a newline character */
		/* \r clear the current line and then print the other characters making it looks like it refresh*/
		process.stdout.write(`\r${this.text}[${dots}${empty}] ${percentage}%`);
	}

	/**
	 * Create and display a loader in the console.
	 *
	 * @param {string} [text=""] Text to display after loader
	 * @param {array.<string>} [chars=["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"]]
	 * Array of characters representing loader steps
	 * @param {number} [delay=100] Delay in ms between loader steps
	 * @example
	 * let loader = loadingAnimation("Loading…");
	 *
	 * // Stop loader after 1 second
	 * setTimeout(() => clearInterval(loader), 1000);
	 * @returns {number} An interval that can be cleared to stop the animation
	 */
	loadingAnimation(
		text = "",
		chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
		delay = 100,
	) {
		let x = 0;

		return setInterval(function () {
			process.stdout.write("\r" + chars[x++] + " " + text);
			x = x % chars.length;
		}, delay);
	}
}
