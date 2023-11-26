<script lang="ts">
import {defineComponent, computed, toRefs} from 'vue'
import type {Ref} from 'vue'

export default defineComponent({
	name: 'MPagination',
	props: {
		currPage: {
			type: Number,
			default: 1
		},
		totalPages: {
			type: Number,
			required: true
		}
	},
	emits: ['updatePage'],
	setup(props, ctx) {
		const {currPage, totalPages} = toRefs(props)
		const currentActivePage = ref(1) as Ref<number>

		const changePage = (page: number | 'prev' | 'next'): void => {
			if (typeof page === 'number') {
				currentActivePage.value = page
				ctx.emit('updatePage', currentActivePage.value)
			}
			if (currPage.value !== 1 && page === 'prev') {
				currentActivePage.value = currPage.value - 1
				ctx.emit('updatePage', currentActivePage.value)
			}
			if (currPage.value + 1 <= totalPages.value && page === 'next') {
				currentActivePage.value = currPage.value + 1
				ctx.emit('updatePage', currentActivePage.value)
			}
		}

		return {
			changePage,
			currentActivePage
		}
	}
})
</script>
<template>
	<div class="m-pagination">
		<ul class="m-pagination__list">
			<li class="m-pagination__item">
				<AtomsAButton
					text=""
					variant="quaternary"
					class="m-pagination__button m-pagination__button--prev"
					:disabled="currentActivePage === 1"
					@click="changePage('prev')"
				>
					<template #before-text><span class="material-icons">keyboard_double_arrow_left</span>
					</template>
				</AtomsAButton>
				<AtomsAButton
					v-for="page in totalPages"
					:key="`${page}--idx`"
					:text="page.toString()"
					variant="quaternary"
					class="m-pagination__button m-pagination__button--page"
					:class="{'a-button--quaternary-active': page === currentActivePage}"
					@click="changePage(page)"
				/>
				<AtomsAButton
					text=""
					variant="quaternary"
					class="m-pagination__button m-pagination__button--next"
					:disabled="currentActivePage === totalPages"
					@click="changePage('next')"
				>
					<template #before-text><span class="material-icons">keyboard_double_arrow_right</span>
					</template>
				</AtomsAButton>
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
.m-pagination {
	@apply relative;

	&__list {
		@apply flex items-center max-w-[50%] w-full;
	}

	&__item {
		@apply flex grow;
	}
}
</style>
