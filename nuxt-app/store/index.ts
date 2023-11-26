import {defineStore} from 'pinia'
import type {StoreDefinition} from 'pinia'
import type {IUser} from "@/interfaces";

type TState = {
	users: IUser[]
}

type TGetters = {
	getUsers: (state: TState) => IUser[]
}

type TActions = {
	saveDataToStore: (payload: any) => void,
	deleteUserFromStore: (payload: number) => void,
	updateUserInStore: (payload: IUser) => void,
}

export const useMainStore: StoreDefinition<'mainStore', TState, TGetters, TActions> = defineStore('mainStore', {
	state: (): TState => ({
		users: [] as IUser[]
	}),
	getters: {
		getUsers: (state: TState): IUser[] => state.users,
	},
	actions: {
		saveDataToStore(payload: any): void {
			this.users = payload.data;
		},
		updateUserInStore(payload: IUser): void {
			this.users = this.users.map((user: IUser): IUser =>
				user.id === payload.id ? payload : user
			);
		},
		deleteUserFromStore(payload: number): void {
			this.users = this.users.filter((user: IUser): boolean => user.id !== payload)
		}
	}
})
