<script setup lang="ts">

</script>

<template>
	<ul class="users-list">
		<li class="users-list__item">
			<p class="users-list__title users-list__title--avatar"></p>
			<p class="users-list__title users-list__title--full-name">Full Name</p>
			<p class="users-list__title users-list__title--action">Action</p>
		</li>

		<li
			class="users-list__item"
		>
			<div class="users-list__avatar">
				<AtomsAAvatar link="https://i.pngimg.me/thumb/f/720/5ff843fbee.jpg"/>
			</div>
			<p class="users-list__fullname">full name</p>

			<div class="users-list__actions">
				<AtomsAButton
					text=""
					variant="icon"
				>
					<template #before-text><span class="material-icons">add</span></template>
				</AtomsAButton>
				<AtomsAButton
					text=""
					variant="icon"
				>
					<template #before-text><span class="material-icons">remove</span></template>
				</AtomsAButton>
			</div>
		</li>

		<li
			class="users-list__item"
		>
			<div class="users-list__avatar">
				<AtomsAAvatar link="https://i.pngimg.me/thumb/f/720/5ff843fbee.jpg"/>
			</div>
			<p class="users-list__fullname">full name</p>

			<div class="users-list__actions">
				<AtomsAButton
					text=""
					variant="icon"
				>
					<template #before-text><span class="material-icons">add</span></template>
				</AtomsAButton>
				<AtomsAButton
					text=""
					variant="icon"
				>
					<template #before-text><span class="material-icons">remove</span></template>
				</AtomsAButton>
			</div>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.users-list {
	@apply w-full pt-8;
	@apply flex flex-col gap-y-4;
	@apply relative;

	&__item {
		@apply flex flex-col sm:flex-row items-center gap-y-4 gap-x-10;
		@apply p-4 sm:py-2 sm:pl-4 sm:pr-16 rounded-md;
		@apply relative;

		&:nth-child(1) {
			@apply flex items-center;
		}

		&:nth-child(even) {
			@apply bg-gray-100;
		}
	}

	&__title {
		@apply font-bold relative z-10;

		&--avatar {
			@apply w-full max-w-[5%] min-w-[40px] block;
		}

		&--full-name {
			@apply hidden sm:inline-block;
		}

		&--action {
			@apply hidden sm:inline-block;
			@apply ml-auto w-[70px];
		}
	}

	&__avatar {
		@apply w-full max-w-[5%] min-w-[40px];
	}
	//
	//&__fullname {
	//	@apply w-full;
	//}

	&__actions {
		@apply w-full max-w-[80px] sm:ml-auto;
		@apply flex items-center gap-x-2;
	}
}
</style>