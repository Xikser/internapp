<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import type {PropType, Ref} from "vue";
import type {IUser} from "@/interfaces";

export default defineComponent({
	name: 'OUserPanel',
	props: {
		configs: {
			type: Function,
			default: () => {
			}
		},
		user: {
			type: Object as PropType<IUser>,
			required: true
		}
	},
	emits: ['update'],
	setup(props, ctx) {
		const {user} = props
		const showAvatarInput = ref(false) as Ref<boolean>
		const avatarLink = ref(user.avatar) as Ref<string>
		const newAvatarValue = ref('') as Ref<string>
		const avatarButtonStatus = ref(false) as Ref<boolean>;

		const inputErrors = ref({
			first_name: true,
			last_name: true
		});

		const newUserData: IUser = {
			id: user.id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			avatar: avatarLink.value
		}

		const toggleAvatarInput = (): void => {
			showAvatarInput.value = !showAvatarInput.value
		}

		const updateAvatar = (): void => {
			avatarLink.value = newAvatarValue.value || avatarLink.value;
			newUserData.avatar = avatarLink.value
			showAvatarInput.value = false;

			ctx.emit('update', newUserData)
		}
		const handleAvatarButtonStatus = (e: any): void => {
			avatarButtonStatus.value = e.value
		}

		const updateNewAvatarValue = (event: any): void => {
			newAvatarValue.value = event.target.value
		}

		// https://static.thenounproject.com/png/5163891-200.png
		// https://i.pngimg.me/thumb/f/720/5ff843fbee.jpg

		const updateInfo = (e: Event): void => {
			const target = e.target as HTMLInputElement;
			const {name, value} = target;

			if (name in newUserData) {
				(newUserData as Record<string, any>)[name] = value
			}
		}

		const handleInputsStatus = (hasError: boolean, inputName: string): void => {
			inputErrors.value[inputName] = hasError;
		};

		const isButtonDisabled = computed((): boolean => {
			return Object.values(inputErrors.value).some(error => error);
		});

		return {
			toggleAvatarInput,
			showAvatarInput,
			newAvatarValue,
			avatarLink,
			updateAvatar,
			updateNewAvatarValue,
			handleAvatarButtonStatus,
			avatarButtonStatus,
			updateInfo,
			newUserData,
			handleInputsStatus,
			isButtonDisabled
		}
	}
})
</script>

<template>
	<section class="o-user-panel">
		<div class="o-user-panel__left-col">
			<div class="o-user-panel__inputs">
				<MoleculesMInput
					v-for="input in configs().inputConfig"
					:key="input.name"
					:config="input"
					@input="updateInfo"
					@on-error="handleInputsStatus"
				/>
			</div>

			<AtomsAButton
				text="Update Details"
				class="max-w-[150px]"
				:disabled="isButtonDisabled"
				@click="$emit('update', newUserData)"
			/>
		</div>

		<div class="o-user-panel__avatar">
			<AtomsAAvatar :link="avatarLink"/>

			<div class="flex flex-col gap-y-6 w-full">
				<MoleculesMInput
					v-if="showAvatarInput"
					:config="configs().avatarInputConfig"
					@input="updateNewAvatarValue"
					@on-error="handleAvatarButtonStatus"
				/>

				<AtomsAButton
					v-if="!showAvatarInput"
					text="Change Photo"
					variant="secondary"
					@click="toggleAvatarInput"
				>
					<template #before-text>
						<span class="material-icons">photo_camera</span>
					</template>
				</AtomsAButton>

				<AtomsAButton
					v-else
					text="Update"
					variant="primary"
					:disabled="avatarButtonStatus"
					@click="updateAvatar"
				>
				</AtomsAButton>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
.o-user-panel {
	@apply relative flex flex-col lg:flex-row gap-12;

	&__left-col {
		@apply w-full lg:max-w-[65%];
		@apply pt-24 pb-6 px-8;
		@apply rounded-md shadow bg-white;
		@apply flex flex-col justify-between gap-y-8;
	}

	&__inputs {
		@apply w-full;
		@apply flex flex-col md:flex-row gap-6;
	}

	&__avatar {
		@apply w-full lg:max-w-[35%];
		@apply pt-16 pb-6 px-8;
		@apply bg-white rounded-md shadow;
		@apply flex flex-col items-center justify-center gap-6;
	}
}
</style>
