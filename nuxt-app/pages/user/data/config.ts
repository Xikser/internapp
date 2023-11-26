import useRegexp from "@/composables/useRegexp";
import {use} from "h3";

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
			name: 'first-name',
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
			name: 'last-name',
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
		name: 'new-avatar',
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
		name: 'search-input',
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

export default useInputConfig
