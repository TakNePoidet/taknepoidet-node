<template>
	<component :is="layout" />
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@layout/MainLayout.vue';

export default defineComponent({
	components: {
		MainLayout
	},
	setup() {
		const layout = computed(() => {
			const { meta } = useRoute();
			return `${meta.layout}-layout`;
		});
		return { layout };
	}
});
</script>
