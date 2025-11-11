import {useRef, useState, useEffect } from '@wordpress/element';
import { Button,Spinner } from '@wordpress/components';

const FinishSetup = ( { home, prev } ) => {

	const handleHomeLink = () => {
		home();
	}

	const handlePrevStep = () => {
		prev();
	}

	return (
		<div>
			<h2>🎉 All done!</h2>
			<p>Checkout your new site!</p>
			<div className="wp-block-buttons">

				<Button
					onClick={() => handlePrevStep()}
					style={{
						margin: '0 10px 10px 0'
					}}
					variant="secondary"
				>Previous
				</Button>

				<Button
					onClick={() => handleHomeLink()}
					style={{
						margin: '0 10px 10px 0'
					}}
					variant="primary"
				>Let's see it!
				</Button>

			</div>
		</div>
	);
}

export default FinishSetup;