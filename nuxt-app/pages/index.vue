<script lang="ts">
import {defineComponent, ref} from 'vue'
import type {Ref} from 'vue'
import {useMainStore} from '@/store'
import OUserList from "@/components/organisms/OUserList.vue";

export default defineComponent({
	components: {OUserList},
	async setup() {
		const mainStore = useMainStore()

		const page = ref(1) as Ref<number>

		const {data} = await useAsyncData('users', (): Promise<any> => $fetch('https://reqres.in/api/users', {
				params: {
					page: page.value
				}
			}), {
				watch: [page]
			}
		)

		const onClick = (): void => {
			console.log('click')
		}

		return {
			onClick,
			data
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
					class="max-w-[150px]"
					@click="() => {console.log('click')}"
				>
					<template #before-text>
						<span class="material-icons">add</span>
					</template>
				</AtomsAButton>
			</div>

			<OUserList />
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
	}
}
</style>
