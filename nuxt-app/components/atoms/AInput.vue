<script lang="ts">
import {defineComponent, computed} from 'vue'

export default defineComponent({
	name: 'AInput',
	props: {
		modelValue: {
			type: String,
			required: true
		},
		label: {
			type: String,
			default: 'First Name'
		},
		name: {
			type: String,
			default: 'default-input'
		},
		placeholder: {
			type: String,
			default: 'Enter value'
		},
		type: {
			type: String,
			default: 'text'
		},
		success: {
			type: Boolean,
			default: false
		},
		error: {
			type: Boolean,
			default: false
		},
		maxLength: {
			type: Number,
			default: 99999
		},
		regexp: {
			type: RegExp,
			default: new RegExp('.*')
		}
	},
	emits: ['update:modelValue'],
	setup(props, ctx) {
		const {label, name, regexp} = props

		const ariaLabel = computed((): string => {
			return label || name
		})

		const updateValue = (event: any): void => {
			ctx.emit('update:modelValue', event.target.value)
		}

		return {
			updateValue,
			ariaLabel,
		}
	}
})
</script>

<template>
	<div class="a-input">
		<label
			v-if="label"
			:for="name"
			class="a-input__label"
		>
			<slot name="label"/>
		</label>

		<input
			ref="input"
			:value="modelValue"
			class="a-input__input"
			:class=" {
                'a-input__input--success' : success,
                'a-input__input--error' : error,
            }"
			:name="name"
			:type="type"
			:placeholder="placeholder"
			:aria-label="ariaLabel"
			:maxlength="maxLength"
			autocomplete="off"
			@input="updateValue"
		/>

		<slot name="errors"/>
	</div>
</template>

<style scoped lang="scss">
.a-input {
	@apply relative flex flex-col gap-2 w-full;

	&__input {
		@apply w-full rounded-md border border-solid border-black;
		@apply py-2 px-4;

		&--error {
			@apply border-red-700 text-red-700;
		}

		&--success {
			@apply border-green-700 text-green-700;
		}
	}
}
</style>
