<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'UserList',
	setup() {
		return {}
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

			<ul class="users__list">

			</ul>
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
		@apply flex items-center justify-between;
	}

	&__content {
		@apply w-full;
		@apply p-12;
		@apply bg-white shadow rounded-md;
	}
}
</style>
