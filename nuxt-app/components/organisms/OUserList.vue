<script lang="ts">
import {defineComponent, computed} from 'vue'
import type {PropType} from "vue";
import type {IUser} from "@/interfaces";

export default defineComponent({
	name: 'OUserList',
	props: {
		users: {
			type: Object as PropType<IUser[]>,
			required: false
		},
		searchValue: {
			type: String,
			default: ''
		}
	},
	setup(props) {
		const computedUsers = computed((): IUser[] => {
			return props!.users!.map((user: IUser) => ({
				...user,
				fullName: `${user.first_name} ${user.last_name}`
			}));
		})

		const filteredUsers = computed(() => {
			if (!computedUsers) return [];

			return computedUsers.value.filter((user: IUser) => {
				return user!.fullName!.toLowerCase().includes(props.searchValue.toLowerCase())
			});
		});

		return {
			filteredUsers
		}
	}
})
</script>

<template>
	<ul class="users-list">
		<li class="users-list__item">
			<p class="users-list__title users-list__title--avatar"></p>
			<p class="users-list__title users-list__title--full-name">Full Name</p>
			<p class="users-list__title users-list__title--action">Action</p>
		</li>

		<li
			v-for="user in filteredUsers"
			:key="user.id"
			class="users-list__item"
		>
			<div class="users-list__avatar">
				<AtomsAAvatar :link="user.avatar || 'https://i.pngimg.me/thumb/f/720/5ff843fbee.jpg'"/>
			</div>
			<p class="users-list__fullname">{{ user.fullName }}</p>

			<div class="users-list__actions">
				<AtomsAButton
					text=""
					variant="icon"
				>
					<template #before-text>
						<span class="material-icons text-gray-400">edit_square</span>
					</template>
				</AtomsAButton>
				<AtomsAButton
					text=""
					variant="icon"
				>
					<template #before-text><span class="material-icons text-gray-400">delete</span></template>
				</AtomsAButton>
			</div>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.users-list {
	@apply w-full;
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
