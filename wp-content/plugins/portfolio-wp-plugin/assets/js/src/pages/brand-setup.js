import {useRef, useState, useEffect } from '@wordpress/element';
import { Button,Spinner, Flex, FlexItem, FlexBlock, SelectControl, ColorIndicator  } from '@wordpress/components';

const HomeSetup = ( { next, prev } ) => {

	const [styles, setStyles] = useState('');
	const [brandColor, setBrandColor] = useState('#0073aa');
	const [logo, setLogo] = useState('');
	const [siteIcon, setSiteIcon] = useState('');

	const handleNextStep = () => {
		next();
	}

	const handlePrevStep = () => {
		prev();
	}

	return (
		<div className="pwp-setup-homepage">
			<h2>Homepage Setup</h2>
			<p>It's the front-door of your website. Let's make it nice!</p>

			<div className="pwp-panels">
				<div style={{width: "50%"}}>
					<div style={{width: "80%", fontSize: "16px"}}>
						<p><strong>Color Palette</strong></p>
						<p>Choose a color palette that closely matches your brand. You can customize this later in
							Global Styles.</p>
					</div>
				</div>
				<div style={{width: "50%"}}>
					<SelectControl
						label="Styles"
						options={[
							{
								disabled: true,
								label: 'Select an Option',
								value: ''
							},
							{
								label: 'Option A',
								value: 'a'
							},
							{
								label: 'Option B',
								value: 'b'
							},
							{
								label: 'Option C',
								value: 'c'
							}
						]}
					/>
				</div>
			</div>

			<div className="pwp-panels">
				<div style={{width: "50%"}}>
					<div style={{width: "80%", fontSize: "16px"}}>
						<p><strong>Brand Color</strong></p>
						<p>Use the accent color above, or add your brand color to be used as the main accent color on your site.</p>
					</div>
				</div>
				<div style={{width: "50%"}}>
					<ColorIndicator colorValue={brandColor}/>
				</div>
			</div>

			<div className="wp-block-buttons">
				<Button
					onClick={() => handlePrevStep()}
					variant="secondary"
					style={{
						margin: '0 10px 10px 0'
					}}
				>Previous
				</Button>
				<Button
					onClick={() => handleNextStep()}
					variant="secondary"
					style={{
						margin: '0 10px 10px 0'
					}}
				>Next
				</Button>
			</div>
		</div>
	);
}

export default HomeSetup;