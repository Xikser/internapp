import {defineStore} from 'pinia'
import type {StoreDefinition} from 'pinia'

type TState = {
	test: string
}

type TGetters = {}

type TActions = {}

export const useMainStore: StoreDefinition<'mainStore', TState, TGetters, TActions> = defineStore('mainStore', {
	state: (): TState => ({
		test: ''
	})
})
