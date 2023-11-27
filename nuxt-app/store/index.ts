import {defineStore} from 'pinia'
import type {StoreDefinition} from 'pinia'
import type {IUser, IPagesInfo, IConvertedData} from "@/interfaces";
import { reactive } from 'vue';

type TState = {
	users: IUser[]
	pagesInfo: IPagesInfo
}

type TGetters = {
	getUsers: (state: TState) => IUser[]
	getPagesInfo: (state: TState) => IPagesInfo
}

type TActions = {
	saveDataToStore: (payload: any) => void,
	deleteUserFromStore: (payload: number) => void,
	updateUserInStore: (payload: IUser) => void,
}

export type TMainStore = StoreDefinition<'mainStore', TState, TGetters, TActions>

export const useMainStore: TMainStore = defineStore('mainStore', {
	state: (): TState => ({
		users: [] as IUser[],
		pagesInfo: {
			page: 1,
			per_page: null,
			total: null,
			total_pages: null,
		} as IPagesInfo
	}),
	getters: {
		getUsers: (state: TState): IUser[] => state.users,
		getPagesInfo: (state: TState): IPagesInfo => state.pagesInfo
	},
	actions: {
		saveDataToStore(payload: IConvertedData): void {
			this.pagesInfo = payload.pages
			this.users = payload.users;

			console.log('??')
			console.log(payload)
			console.log('??')
		},
		updateUserInStore(payload: IUser): void {
			const userExist: boolean = this.users.some((user: IUser): boolean => user.id === payload.id)

			console.log(payload)

			if (userExist) {
				this.users = this.users.map((user: IUser): IUser =>
					user.id === payload.id ? payload : user
				);
			} else {
				this.users.push(payload)
				this.pagesInfo = {
					...this.pagesInfo,
					total: payload.id,
					total_pages: Math.ceil(payload.id / this.pagesInfo.per_page!)
				}

				console.log(this.pagesInfo)
			}
		},
		deleteUserFromStore(payload: number): void {
			this.users = this.users.filter((user: IUser): boolean => user.id !== payload)
		}
	}
})
