<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	name: 'AAvatar',
	props: {
		link: {
			type: String,
			required: true
		}
	},
})
</script>

<template>
	<div class="a-avatar">
		<img :src="link" alt="user avatar">
	</div>
</template>

<style scoped lang="scss">
.a-avatar {
	@apply relative rounded-full;
	@apply max-w-[230px] max-h-[230px];
}
</style>
