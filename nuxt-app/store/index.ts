import {defineStore} from 'pinia'
import type {StoreDefinition} from 'pinia'
import type {IUser} from "@/interfaces";

type TState = {
	pages: {
		currentPage: number | null
		perPage: number | null
		total: number | null
		totalPages: number | null
	}
	users: IUser[]
}

type TGetters = {
	getUsers: (state: TState) => IUser[]
}

type TActions = {
	saveDataToStore: (payload: any) => void
}

export const useMainStore: StoreDefinition<'mainStore', TState, TGetters, TActions> = defineStore('mainStore', {
	state: (): TState => ({
		pages: {
			currentPage: 1,
			perPage: null,
			total: null,
			totalPages: null
		},
		users: [] as IUser[],
	}),
	getters: {
		getUsers: (state: TState) => state.users
	},
	actions: {
		saveDataToStore (payload: any): void {
			this.pages = {
				currentPage: payload.page,
				perPage: payload.per_page,
				total: payload.total,
				totalPages: payload.total_pages,
			}
			this.users = payload.data
		}
	}
})
