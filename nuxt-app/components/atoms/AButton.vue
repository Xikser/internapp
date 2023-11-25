<script lang="ts">
import {defineComponent} from 'vue'
import type {PropType} from 'vue'

type TVariant = 'primary' | 'secondary' | 'tertiary'

export default defineComponent({
	name: "AButton",
	props: {
		text: {
			type: String,
			default: 'Button Text'
		},
		variant: {
			type: String as PropType<TVariant>,
			default: 'primary'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ['click'],
	setup(props, ctx) {
		const onClick = (): void => {
			ctx.emit('click')
		}

		return {
			onClick
		}
	}
})
</script>

<template>
	<button
		class="a-button"
		:class="{
			'a-button--primary': variant === 'primary',
			'a-button--secondary': variant === 'secondary',
			'a-button--tertiary': variant === 'tertiary',
			'a-button--disabled': disabled
		}"
		:disabled="disabled"
		@click="onClick"
	>
		<slot name="before-text"/>
		{{ text }}
		<slot name="after-text"/>
	</button>
</template>

<style scoped lang="scss">
.a-button {
	@apply relative py-2 px-4 rounded-md w-full flex items-center text-center justify-center;
	@apply transition-all duration-300;

	&--primary {
		@apply bg-green-700 text-white;
		@apply active:hover:bg-green-600;
	}

	&--secondary {
		@apply bg-white text-black border border-black border-solid;
		@apply active:hover:bg-gray-200;
	}

	&--tertiary {
		@apply rounded-full #{!important};
		@apply bg-green-700 text-white;
		@apply active:hover:bg-green-600;
	}

	&--disabled {
		@apply bg-gray-400 text-gray-700 pointer-events-none;
	}
}
</style>
