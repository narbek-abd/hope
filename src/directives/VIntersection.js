const VIntersection = {
	mounted: (el, binding) => {
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0,
		};

		function checkEntry(entry) {
			if (entry[0].isIntersecting) {
				binding.value();
			}
		}
		el.observer = new IntersectionObserver(checkEntry, options);
		if (el) el.observer.observe(el);
	},
	unmounted: (el) => {
		el.observer.disconnect();
	},
};

export default VIntersection;
