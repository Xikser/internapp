export interface IUser {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
	fullName?: string
}

export interface IPagesInfo {
	page: number | null
	per_page: number | null
	total: number | null
	total_pages: number | null
}

export interface IConvertedData {
	pages: IPagesInfo
	users: IUser[]
}
