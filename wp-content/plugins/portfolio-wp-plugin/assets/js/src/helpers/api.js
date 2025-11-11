

const api = {

	install_plugins:  async ( $plugins ) => {
		let response = await fetch(window.pwp_data.rest_url + 'install_plugins', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': window.pwp_data.rest_nounce
			},
			body: JSON.stringify({
				plugins: $plugins
			})
		});

		if ( ! response.ok) {
			console.log('Error');
		}

		return await response.json();
	},

	create_pages:  async ( $pages ) => {
		let response = await fetch(window.pwp_data.rest_url + 'create_pages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': window.pwp_data.rest_nounce
			},
			body: JSON.stringify({
				pages: $pages
			})
		});

		if ( ! response.ok) {
			console.log('Error');
		}

		return await response.json();
	},
	clear_cobwebs:  async () => {
		let response = await fetch(window.pwp_data.rest_url + 'clear_cobwebs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': window.pwp_data.rest_nounce
			},
			body: JSON.stringify({
				'broom': 'sweep'
			})
		});

		return true;
	},
	get_pages:  async () => {
		let response = await fetch(window.pwp_data.rest_root_url + 'wp/v2/pages?' + new URLSearchParams({
			context: 'edit',
			per_page: 25,
			order: 'asc',
			status: 'publish',
			_locale: 'user'
		}).toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': window.pwp_data.rest_nounce
			},

		});

		if ( ! response.ok) {
			console.log('Error');
		}

		return await response.json();
	},
	save_homepage_settings:  async ( $data ) => {
		let response = await fetch(window.pwp_data.rest_url + 'save_homepage_settings', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': window.pwp_data.rest_nounce
			},
			body: JSON.stringify($data)
		});

		if ( ! response.ok) {
			console.log('Error');
		}

		return await response.json();
	}
}

export { api };