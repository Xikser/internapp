<script lang="ts">
import {defineComponent} from 'vue'
import useInputConfig from "@/pages/user/data/config";

export default defineComponent({
	name: 'UserView',
	setup() {
		return {
			useInputConfig,
		}
	}
})
</script>

<template>
	<section class="user-panel container">
		<div class="user-panel__title">
			<h1>Page title</h1>
		</div>

		<div class="user-panel__content">
			<OrganismsOUserPanel
				:configs="useInputConfig"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
.user-panel {
	@apply flex flex-col gap-6 py-32;

	&__title {
		@apply text-4xl
	}
}
</style>
