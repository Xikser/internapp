import useRegexp from "@/composables/useRegexp";

export interface IInputConfig {
	label: string
	name: string
	type: string
	placeholder: string
	maxLength: number
	regexp: RegExp
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

export default inputConfig
