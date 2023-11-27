import useRegexp from "@/composables/useRegexp";
import type {IUser} from "@/interfaces";

export interface IInputConfig {
	label: string
	name: string
	type: string
	placeholder: string
	maxLength: number | null
	regexp: RegExp
	beforeIcon?: string
	afterIcon?: string
	errors: IError
}

interface IError {
	empty?: {
		message: string
	},
	invalidValue?: {
		message: string
	}
}

export interface IUseInputConfig {
	inputConfig: IInputConfig[]
	avatarInputConfig: IInputConfig
	searchInputConfig: IInputConfig
}

const useInputConfig = (): IUseInputConfig => {

	const inputConfig: IInputConfig[] = [
		{
			label: 'First Name',
			name: 'first_name',
			type: 'text',
			placeholder: 'Enter value',
			maxLength: 32,
			regexp: useRegexp().onlyLetters,
			errors: {
				empty: {
					message: 'Input can\'t be empty!'
				},
				invalidValue: {
					message: 'You entered an invalid value!'
				}
			}
		},
		{
			label: 'Last Name',
			name: 'last_name',
			type: 'text',
			placeholder: 'Enter value',
			maxLength: 32,
			regexp: useRegexp().onlyLetters,
			errors: {
				empty: {
					message: 'Input can\'t be empty!'
				},
				invalidValue: {
					message: 'You entered an invalid value!'
				}
			}
		},
	]

	const avatarInputConfig: IInputConfig = {
		label: 'New Avatar',
		name: 'new_avatar',
		type: 'url',
		placeholder: 'Paste new avatar link (https)',
		maxLength: null,
		regexp: useRegexp().httpsUrlRegexp,
		errors: {
			empty: {
				message: 'Input can\'t be empty!'
			},
			invalidValue: {
				message: 'You entered an invalid value!'
			}
		}
	}

	const searchInputConfig: IInputConfig = {
		label: '',
		name: 'search_input',
		type: 'text',
		placeholder: 'Search for users...',
		maxLength: 32,
		regexp: useRegexp().onlyLetters,
		afterIcon: 'search',
		errors: {
			invalidValue: {
				message: 'You entered an invalid value!'
			}
		}
	}

	return {
		inputConfig,
		avatarInputConfig,
		searchInputConfig
	}
}

export const defaultUserObject: IUser = {
	id: 0,
	email: '',
	first_name: '',
	last_name: '',
	avatar: 'https://i.pngimg.me/thumb/f/720/5ff843fbee.jpg'
}

export default useInputConfig
