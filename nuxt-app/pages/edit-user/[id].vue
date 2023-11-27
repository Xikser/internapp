<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import {useRoute} from 'vue-router'
import type {Ref} from "vue";

import useInputConfig from "@/pages/user/data/config";
import {useMainStore} from "@/store";
import {storeToRefs} from "pinia";
import type {IUser} from "@/interfaces";
import useUpdateData from "@/composables/useUpdateData";

export default defineComponent({
	name: 'Edit',
	setup() {
		const route = useRoute()
		const {getUsers} = storeToRefs(useMainStore())
		const currentUserID = ref(route.params.id) as Ref<string>

		const currentUser = computed((): IUser => {
			return getUsers!.value.find((user: IUser) => user.id === Number(currentUserID.value))!
		})

		const userFullName = computed((): string => {
			return `${currentUser!.value.first_name || ''} ${currentUser!.value.last_name || ''}`
		})

		return {
			route,
			useInputConfig,
			currentUserID,
			currentUser,
			userFullName,
			useUpdateData
		}
	}
})
</script>

<template>
	<section
		v-if="currentUser"
		class="user-panel container"
	>
		<div class="user-panel__title">
			<h1>Edit User: {{ userFullName }}</h1>
		</div>

		<div class="user-panel__content">
			<OrganismsOUserPanel
				:user="currentUser"
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
