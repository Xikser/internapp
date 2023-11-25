<script lang="ts">
import {defineComponent,} from 'vue'
import type {Ref, PropType} from 'vue'
import useRegexp from "@/composables/useRegexp";
import debounce from "@/utils/debounce";
import type {IInputConfig} from "@/pages/user/data/config";

export default defineComponent({
	name: 'MInput',
	methods: {useRegexp},
	props: {
		config: {
			type: Object as PropType<IInputConfig>,
			required: true
		}
	},
	setup(props) {
		const {config} = props
		const value = ref('') as Ref<string>
		const isError = ref(false) as Ref<boolean>
		const isSuccess = ref(false) as Ref<boolean>
		const errorMessage = ref('') as Ref<string>

		const validateInput = debounce((event: any) => {
			const { target } = event as any;

			if (target.value === '') {
				setErrorState(config!.errors!.empty!.message);
			} else if (!useRegexp().onlyLetters.test(target.value)) {
				setErrorState(config!.errors!.invalidValue!.message);
			} else {
				clearErrorState();
			}
		}, 300);

		const setErrorState = (message: string): void => {
			isError.value = true;
			isSuccess.value = false;
			errorMessage.value = message;
		}

		const clearErrorState = (): void => {
			isError.value = false;
			isSuccess.value = true;
			errorMessage.value = '';
		}

		return {
			validateInput,
			value,
			isError,
			errorMessage,
			isSuccess,
		}
	}
})
</script>
<template>
	<AtomsAInput
		v-model="value"
		:name="config.name"
		:type="config.type"
		:placeholder="config.placeholder"
		:success="isSuccess"
		:error="isError"
		:regexp="config.regexp"
		:max-length="config.maxLength"
		@input="validateInput"
	>
		<template
			v-if="config.label"
			#label
		>
			{{ config.label || '' }}
		</template>

		<template v-if="isError"
		          #errors
		>
			<div class='errors'>
				<p>{{ errorMessage }}</p>
			</div>
		</template>
	</AtomsAInput>
</template>

<style scoped lang="scss">
.errors {
	@apply text-red-700;
}
</style>
