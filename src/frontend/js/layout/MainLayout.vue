<template>
	<app-header />
	<main>
		<Suspense>
			<template #default>
				<router-view />
			</template>
			<template #fallback>
				<span>Loading...</span>
			</template>
		</Suspense>
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
