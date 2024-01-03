export default {
	async fetch(request: Request, env: any) {
		const url = new URL(request.url);

		if (url.pathname === '/') {
			return new Response(
				`[CDN] eg: https://${request.headers.get('host')}/example.com/file/image.png`
			);
		}

		if (url.pathname === '/favicon.ico') {
			return new Response(null, { status: 204 });
		}

		const parts = url.pathname.split(/\//);
		const domain = parts[1];

		const isDomainName = (str: string) => {
			const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			return domainRegex.test(str);
		};

		let reqURL = await env.datastore.get(domain);
		if (!reqURL && isDomainName(domain)) {
			reqURL = 'https://' + domain;
		}

		let finalURL = '';
		if (reqURL) {
			const queryURL = parts.slice(2).join('/');
			finalURL = `${reqURL}/${queryURL}${url.search}`;
			url.host = reqURL.replace(/^https?:\/\//, '');
		} else {
			const refURL = request.headers.get('referer');
			if (refURL) {
				const refParts = refURL.split(/\//);
				finalURL = request.url.replace(refParts[2], refParts[3] + '/');
				url.host = refParts[2];
			}
		}

		if (!finalURL) {
			return new Response(null, { status: 404 });
		}

		const modifiedRequest = new Request(finalURL, {
			headers: request.headers,
			method: request.method,
			body: request.body,
			redirect: 'follow',
		});

		const response = await fetch(modifiedRequest);
		const modifiedResponse = new Response(response.body, response);

		// 添加允许跨域访问的响应头
		modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

		return modifiedResponse;
	},
};
