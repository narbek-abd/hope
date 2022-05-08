import { onUnmounted, watch } from "vue";

let timer;

function useDebounce(input, callback) {
	watch(input, () => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			callback();
		}, 500);
	});

	onUnmounted(() => {
		clearTimeout(timer);
	});
}

export default useDebounce;
