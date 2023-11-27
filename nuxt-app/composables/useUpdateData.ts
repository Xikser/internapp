import type {IUser} from "@/interfaces";
import {useMainStore} from "@/store";
import type {RuntimeConfig} from "nuxt/schema";
const useUpdateData = async (user: IUser): Promise<void> => {
	const runtimeConfig: RuntimeConfig = useRuntimeConfig()
	const mainStore = useMainStore()
	const {updateUserInStore} = mainStore

	await $fetch(`${runtimeConfig.public.apiBase}/users/${user.id}`, {
		method: 'PUT',
		body: user
	}).then((): void => {
		updateUserInStore(user)
	}).catch(e => console.error(`Update user ERROR --- ${e}`))
}

export default useUpdateData
