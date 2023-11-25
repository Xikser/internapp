<script lang="ts">
import {defineComponent} from 'vue'
import {useMainStore} from '@/store'

export default defineComponent({
	setup() {
		const mainStore = useMainStore()

		const onClick = (): void => {
			console.log('click')
		}

		return {
			onClick
		}
	}
})
</script>

<template>
	<section id="main" class="container flex items-center flex-col gap-20 p-10">
		<AtomsAButton
			text="Click me"
			variant="secondary"
			@click="onClick"
		>
			<template #before-text>
				<i class="material-icons mr-2">photo_camera</i>
			</template>
		</AtomsAButton>

		<AtomsAAvatar link="https://static-00.iconduck.com/assets.00/avatar-default-icon-248x256-bdv8pdld.png"/>

<!--		<MoleculesMInput/>-->
	</section>
</template>

<style scoped lang="scss">

</style>
