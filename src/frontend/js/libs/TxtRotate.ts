export default class TxtRotate {
	private period = 2000;

	private loopNum: number;

	private isDeleting: boolean;

	private txt: string;

	private timeout: NodeJS.Timeout | null = null;

	constructor(
		private el: HTMLElement,
		private toRotate: string[],
		period: string | number
	) {
		if (typeof period === 'string') {
			this.period = parseInt(period, 10) || 2000;
		} else {
			this.period = period || 2000;
		}
		this.loopNum = 0;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	}

	private tick(): void {
		const i = this.loopNum % this.toRotate.length;
		const fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = this.txt;

		let delta = 200 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}
		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum += 1;
			delta = 500;
		}
		this.timeout = setTimeout(() => {
			this.tick();
		}, delta);
	}

	public destory(): void {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
	}
}
