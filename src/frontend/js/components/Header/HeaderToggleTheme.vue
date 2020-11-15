<template>
	<div class="toggle-theme">
		<transition name="component-fade" mode="out-in">
			<img
				v-if="!isNightTheme"
				:src="require('@images/moon.svg')"
				alt=""
				@click="setNightTheme(true)"
			/>
			<img
				v-else
				:src="require('@images/sun.svg')"
				alt=""
				@click="setNightTheme(false)"
			/>
		</transition>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	setup() {
		const store = useStore();
		const isNightTheme = computed(() => store.getters['app/isNightTheme']);

		function setNightTheme(value: boolean) {
			// document.body.classList.add('app-theme-change-animation');
			store.commit('app/setNightTheme', value);
			// setTimeout(() => {
			// 	document.body.classList.remove('app-theme-change-animation');
			// }, 500);
		}
		watch(isNightTheme, (value) => {
			document.body.classList.toggle('app-night-theme', value);
		});
		console.log(isNightTheme.value);
		return { isNightTheme, setNightTheme };
	}
});
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
	transition: all 0.1s cubic-bezier(0.62, -0.26, 0.74, 0.05);
}
/* .component-fade-leave-active до версии 2.1.8 */
.component-fade-enter,
.component-fade-leave-to {
	transform: scale(2);
	opacity: 0;
}
</style>
