<script lang="ts">
import {defineComponent} from 'vue'
import type {PropType} from "vue";
import type {IInputConfig} from "@/pages/user/data/config";

export default defineComponent({
	name: 'OUserPanel',
	props: {
		inputConfig: {
			type: Object as PropType<IInputConfig[]>
		}
	},
})
</script>

<template>
	<section class="o-user-panel container">
		<div class="o-user-panel__inputs">
			<MoleculesMInput
				v-for="input in inputConfig"
				:key="input.name"
				:config="input"
			/>
		</div>
	</section>
</template>

<style scoped lang="scss">
.o-user-panel {
	@apply relative rounded-sm shadow bg-white pt-24 pb-12;

	&__inputs {
		@apply flex flex-col md:flex-row gap-6;
	}
}
</style>
