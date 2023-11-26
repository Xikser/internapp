import {defineStore} from 'pinia'
import type {StoreDefinition} from 'pinia'

interface IUsers {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
}

type TState = {
	users: IUsers[]
}

type TGetters = {
	getUsers: () => IUsers[]
}

type TActions = {
	// fetchUsers: () => Promise<void>
}

export const useMainStore: StoreDefinition<'mainStore', TState, TGetters, TActions> = defineStore('mainStore', {
	state: (): TState => ({
		users: [],
	}),
	getters: {
		getUsers: (state: TState) => state.users
	},
	actions: {

		// saveDataToStore () {
		//
		// }
	}
})
