<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useRoute} from 'vue-router'
import type {Ref} from "vue";

import useInputConfig, {defaultUserObject} from "@/pages/user/data/config";
import type {IUser} from "@/interfaces";
import useUpdateData from "@/composables/useUpdateData";

export default defineComponent({
	name: 'UserView',
	setup() {
		const route = useRoute()
		const currentUserID = ref(route.params.id) as Ref<string>

		const user: IUser = {
			...defaultUserObject,
			id: Number(currentUserID.value)
		}

		return {
			route,
			useInputConfig,
			currentUserID,
			user,
			useUpdateData,
		}
	}
})
</script>

<template>
	<section
		class="user-panel container"
	>
		<div class="user-panel__title">
			<h1>Add User</h1>
		</div>

		<div class="user-panel__content">
			<OrganismsOUserPanel
				:user="user"
				:configs="useInputConfig"
				@update="useUpdateData"
			/>
		</div>

		<nuxt-link to="/">Back to Users List</nuxt-link>
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
