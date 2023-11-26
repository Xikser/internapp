<script lang="ts">
import {defineComponent,} from 'vue'
import type {Ref, PropType} from 'vue'
import debounce from "@/utils/debounce";
import type {IInputConfig} from "@/pages/user/data/config";

export default defineComponent({
	name: 'MInput',
	props: {
		config: {
			type: Object as PropType<IInputConfig>,
			required: true
		}
	},
	emits: ['update:modelValue', 'onError'],
	setup(props, ctx) {
		const {config} = props
		const value = ref('') as Ref<string>
		const isError = ref(false) as Ref<boolean>
		const isSuccess = ref(false) as Ref<boolean>
		const errorMessage = ref('') as Ref<string>

		const validateInput = debounce((event: any) => {
			const {target} = event as any;

			if (target.value === '' && typeof config.errors.empty !== 'undefined') {
				setErrorState(config!.errors!.empty!.message);
			} else if (!config.regexp.test(target.value) && target.value !== '') {
				setErrorState(config!.errors!.invalidValue!.message);
			} else {
				clearErrorState();
			}

			ctx.emit('update:modelValue')
			ctx.emit('onError', isError)
		}, 200);

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
		:max-length="config.maxLength ?? 999999"
		@input="validateInput"
	>
		<template
			v-if="config.label"
			#label
		>
			{{ config.label || '' }}
		</template>

		<template v-if="config.beforeIcon" #before-icon>
			<span class="material-icons a-input__before-icon">{{ config.beforeIcon }}</span>
		</template>

		<template v-if="config.afterIcon" #after-icon>
			<div class="after-icon">
				<span class="material-icons">{{ config.afterIcon }}</span>
			</div>
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

.after-icon {
	@apply absolute right-[15px] top-[18px];
}
</style>
