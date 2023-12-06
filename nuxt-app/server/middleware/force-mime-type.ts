export default defineEventHandler((event: any): void => {
	const req = event.node.req
	const res = event.node.res

	if (req.url.endsWith('.js')) {
		res.setHeader('Content-Type', 'text/javascript');
	}
})
