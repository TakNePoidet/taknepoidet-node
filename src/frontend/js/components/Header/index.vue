<template>
	<header id="app-header" ref="header" class="header">
		<div class="header-wrap">
			<div class="header-container">
				<div class="header-bar">
					<button><span /></button>
				</div>
				<div class="header-logo">
					<router-link to="/"><logo /></router-link>
				</div>
				<div style="flex: 1" />
				<div><header-toggle-theme /></div>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import Logo from '@components/Logo.vue';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import HeaderToggleTheme from './HeaderToggleTheme.vue';

export default defineComponent({
	name: 'AppHeader',
	components: {
		Logo,
		HeaderToggleTheme
	},
	setup() {
		const header = ref<HTMLElement>(null);

		function onScrollHeader() {
			let height = 0;
			if (header.value) {
				height = header.value.getBoundingClientRect().height;
			}
			header.value.classList.toggle(
				'header--scroll',
				height + 1 < window.pageYOffset
			);
		}
		onMounted(() => {
			window.addEventListener('scroll', onScrollHeader);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', onScrollHeader);
		});
		return { header };
	}
});
</script>
