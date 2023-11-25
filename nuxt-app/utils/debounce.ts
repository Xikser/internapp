function debounce(func: Function, wait: number) {
	let TIMEOUT: number | undefined;

	return function (...args: any[]): void {
		const later = (): void => {
			clearTimeout(TIMEOUT);
			func(...args);
		};

		clearTimeout(TIMEOUT);
		TIMEOUT = window.setTimeout(later, wait);
	};
}


export default debounce
