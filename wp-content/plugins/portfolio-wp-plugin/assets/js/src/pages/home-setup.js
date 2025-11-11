import { useRef, useState, useEffect } from '@wordpress/element';
import { useEntityRecords } from '@wordpress/core-data';
import { useSelect, select } from '@wordpress/data';
import { Button,Spinner, Flex, FlexItem, FlexBlock, RadioControl, SelectControl  } from '@wordpress/components';
import { api } from "../helpers/api";

const HomeSetup = ( { next, prev } ) => {

	const [pages, setPages] = useState([]);
	const [homepageStyle, setHomepageStyle] = useState('custom');
	const [customPageId, setCustomPageId] = useState(0);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isStepComplete, setIsStepComplete] = useState(false);

	const handlePrevStep = () => {
		prev();
	}

	const handleHomePageSettings = () => {
		if (isProcessing) {
			return;
		}
		setIsProcessing(true);
		let data = {
			homepageStyle: homepageStyle
		};
		api.save_homepage_settings({
			style: homepageStyle,
			page_id: customPageId
		})
			.then((response) => {
				setIsProcessing(false);
				setIsStepComplete(true);
				next();
			});
	}

	const getPages = (data) => {
		let tempPages = [];
		data.map((page) => {
			tempPages.push({
				label: page.title.raw,
				value: page.id
			});
		});
		return [{disabled:true,label:'Select a Page',value:''}, ...tempPages];
	}

	useEffect(() => {
		if (homepageStyle === 'posts') {
			return;
		}
		api.get_pages().then((data) => {
			setPages(data);
			setCustomPageId(data[0].id);
		});
	}, [homepageStyle]);


	return (
		<div className="pwp-setup-homepage">
			<h2>Homepage Setup</h2>
			<p>It's the front-door of your website. Let's make it nice!</p>

			<div className="pwp-panels">
				{/* <div style={{width: "50%"}}>
					<div style={{width: "80%", fontSize: "16px"}}>
						<p><strong>Homepage Style</strong></p>
						<p>Choose which kind of homepage style you would like.</p>
					</div>
				</div> */}
				<div style={{width: "50%"}}>
					<RadioControl
						label="Choose a style"
						onChange={ ( value ) => {
							setHomepageStyle(value);
						} }
						options={[
							{
								label: 'Latest Posts - Displays a blog on your home page.',
								value: 'posts'
							},
							{
								label: 'Custom page - Select a created page as your home page.',
								value: 'custom'
							}
						]}
						selected={homepageStyle}
					/>
					<br/>
					{ homepageStyle === 'custom' && pages.length === 0 && (
						<>
							<Spinner/> Loading pages...
						</>
					)}
					{ homepageStyle === 'custom' && pages.length > 0 && (
						<SelectControl
							label={"Select a page"}
							options={getPages(pages)}
							onChange={(value) => {
								setCustomPageId(value);
							}}
						/>
					)}
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
				{isProcessing && (<Spinner/>)}
				<Button
					onClick={() => handleHomePageSettings()}
					variant="primary"
					style={{
						margin: '10px 10px 30px 0'
					}}
				>
					{!isProcessing && "Save Settings & Continue"}
					{isProcessing && !isStepComplete && "Saving..."}
					{isStepComplete && "Settings Saved!"}

				</Button>
			</div>
		</div>
	);
}

export default HomeSetup;