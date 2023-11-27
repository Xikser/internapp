<script lang="ts">
import type {Ref} from 'vue'
import {defineComponent, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useMainStore} from '@/store'
import OUserList from "@/components/organisms/OUserList.vue";
import useInputConfig from '@/pages/user/data/config'
import {useRouter} from "vue-router";
import type {IConvertedData} from "@/interfaces";

export default defineComponent({
	components: {OUserList},
	async setup(props, ctx) {
		const runtimeConfig = useRuntimeConfig()
		const mainStore = useMainStore()
		const router = useRouter()
		const {getUsers, getPagesInfo} = storeToRefs(useMainStore())
		const {saveDataToStore} = mainStore
		let page = ref(1) as Ref<number>
		const searchValue = ref('') as Ref<string>

		const {
			data: users,
		} = await useAsyncData('users', async (): Promise<any> =>
				await $fetch(`${runtimeConfig.public.apiBase}/users`, {
					params: {
						page: page.value
					}
				}).catch(function (e) {
					console.error(`Fetch data problem -- ${e}`)
				}), {
				watch: [page]
			}
		)

		watch(users, (newData) => {
			if (newData) {
				const convertedData: IConvertedData = {
					pages: {
						page: newData.page,
						per_page: newData.per_page,
						total: newData.total,
						total_pages: newData.total_pages,
					},
					users: newData.data
				}

				saveDataToStore(convertedData);
			}
		}, {immediate: true, deep: true});

		const updateCurrentPage = (newPage: number): void => {
			page.value = newPage
		}

		const updateSearchValue = (e: Event): void => {
			const target = e.target as HTMLInputElement
			searchValue.value = target.value
		}

	    const addUser = (): void => {
			router.push({ path: `/user/${getPagesInfo.value.total! + 1}` })
		}

		return {
			users,
			page,
			updateCurrentPage,
			useInputConfig,
			searchValue,
			updateSearchValue,
			getUsers,
			addUser,
			getPagesInfo
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
				<MoleculesMInput
					@input="updateSearchValue"
					:config="useInputConfig().searchInputConfig"
					class="users__search-input max-w-[350px]"
				/>
				<AtomsAButton
					text="Add User"
					variant="tertiary"
					class="max-w-[130px]"
					@click="addUser"
				>
					<template #before-text>
						<span class="material-icons">add</span>
					</template>
				</AtomsAButton>
			</div>

			<OUserList
				v-if="getUsers && getUsers.length"
				:users="getUsers"
				:search-value="searchValue"
			/>

			<MoleculesMPagination
				:curr-page="page"
				:total-pages="getPagesInfo.total_pages!"
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

.users__search-input :deep(.a-input__input) {
	@apply bg-gray-100 border-0 rounded-md;
}
</style>
