<template>
	<header class="header">
		<div class="header-wrap">
			<div class="header-container">
				<div class="header-bar">
					<button><span /></button>
				</div>
				<div class="header-logo">
					<a href="/"><logo /></a>
				</div>
				<div style="flex: 1" />
				<div><header-toogle-theme /></div>
			</div>
		</div>
	</header>
</template>

<script lang="ts">
import Logo from '@components/Logo.vue';
import { defineComponent } from 'vue';
import HeaderToogleTheme from './HeaderToogleTheme.vue';

export default defineComponent({
	name: 'AppHeader',
	components: {
		Logo,
		HeaderToogleTheme
	},
	setup() {
		return {};
	}
});
</script>
