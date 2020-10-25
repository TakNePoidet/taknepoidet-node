<template>
	<app-header />
	<main>
		<router-view />
	</main>
</template>

<script lang="ts">
import Header from '@components/Header/index.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	components: {
		'app-header': Header
	}
});
</script>
