<script lang="ts">
import {defineComponent, ref} from 'vue'
import {storeToRefs} from 'pinia'
import type {Ref} from 'vue'
import {useMainStore} from '@/store'
import OUserList from "@/components/organisms/OUserList.vue";

export default defineComponent({
	components: {OUserList},
	async setup() {
		const mainStore = useMainStore()
		const {saveDataToStore} = mainStore
		let page = ref(1) as Ref<number>
		let totalPages = ref(0) as Ref<number>

		const {
			data: users,
		} = await useAsyncData('users', async (): Promise<any> =>
				await $fetch('https://reqres.in/api/users', {
					params: {
						page: page.value
					}
				}), {
				watch: [page]
			}
		)

		watch(users, (newData) => {
			if (newData) {
				saveDataToStore(newData);
				totalPages.value = newData.total_pages
			}
		}, {immediate: true, deep: true});

		const updateCurrentPage = (newPage: number): void => {
			console.log(newPage)
			page.value = newPage
		}

		const onClick = (): void => {
			console.log('click')
		}

		return {
			onClick,
			users,
			page,
			totalPages,
			updateCurrentPage
		}
	}
})
</script>

<template>
	<section class="users container">
		<div class="users__title">
			<h1>User List</h1>
		</div>

		<div class="users__content">
			<div class="users__top-belt">
				<!--				<MoleculesMInput-->
				<!--					class="users__search-input"-->
				<!--				/>-->

				<input type="text" style="border: 2px solid black;">

				<AtomsAButton
					text="Add User"
					variant="tertiary"
					class="max-w-[130px]"
					@click="() => {console.log('click')}"
				>
					<template #before-text>
						<span class="material-icons">add</span>
					</template>
				</AtomsAButton>
			</div>

			<OUserList v-if="users.data && users.data.length" :users="users.data"/>

			<MoleculesMPagination
				:curr-page="page"
				:total-pages="totalPages"
				@update-page="updateCurrentPage"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
.users {
	@apply flex flex-col gap-y-6 py-24;

	&__title {
		@apply text-4xl;
	}

	&__top-belt {
		@apply flex flex-col md:flex-row gap-y-8 items-center justify-between;
	}

	&__content {
		@apply w-full;
		@apply p-12;
		@apply bg-white shadow rounded-md;
		@apply flex flex-col gap-y-12;
	}
}
</style>
