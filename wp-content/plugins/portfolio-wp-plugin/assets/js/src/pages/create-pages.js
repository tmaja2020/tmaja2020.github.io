import {useRef, useState, useEffect } from '@wordpress/element';
import { Button,CheckboxControl, Spinner } from '@wordpress/components';
import {api} from "../helpers/api";

import check_mark from '../../../../assets/images/check.png';

import home_pro from '../../../../assets/images/thumbnails/home-pro.webp';
import home_free from '../../../../assets/images/thumbnails/home-free.webp';
import about_pro from '../../../../assets/images/thumbnails/about-pro.webp';
import about_free from '../../../../assets/images/thumbnails/about-free.webp';
import contact_pro from '../../../../assets/images/thumbnails/contact-pro.webp';
import contact_free from '../../../../assets/images/thumbnails/contact-free.webp';
import case_pro from '../../../../assets/images/thumbnails/case-study-pro.webp';
import case_free from '../../../../assets/images/thumbnails/case-study-free.webp';
import portfolio_pro from '../../../../assets/images/thumbnails/portfolio-pro.webp';
import portfolio_free from '../../../../assets/images/thumbnails/portfolio-free.webp';
import testimonials_pro from '../../../../assets/images/thumbnails/testimonials-pro.webp';
import services_pro from '../../../../assets/images/thumbnails/services-pro.webp';
import awards_pro from '../../../../assets/images/thumbnails/awards-pro.webp';
import blog_free from '../../../../assets/images/thumbnails/blog-free.webp';

const CreatePages = ( { next, prev } ) => {

	const [licenseStatus, setLicenseStatus] = useState(window.pwp_data.setup.license.valid);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isStepComplete, setIsStepComplete] = useState(false);
	const [checkedPages, setCheckedPages] = useState([]);
	const [pagesStatus, setPagesStatus] = useState(window.pwp_data.setup.pages);

	const pageImages = {
        'home-free': home_free,
		'home-pro': home_pro,
		'about-free': about_free,
		'about-pro': about_pro,
		'contact-free': contact_free,
		'contact-pro': contact_pro,
		'case-study-free': case_free,
		'case-study-pro': case_pro,
		'portfolio-free': portfolio_free,
		'portfolio-pro': portfolio_pro,
		'testimonials-pro': testimonials_pro,
		'services-pro': services_pro,
		'awards-pro': awards_pro,
		'blog': blog_free,
    };

	const handleNextStep = () => {
		next();
	}

	const handlePrevStep = () => {
		prev();
	}

	const handleTogglePageCheck = ( page ) => {

		if ( handleCheckPages(page) ) {
			setCheckedPages(checkedPages.filter(function (element) {
					return element !== page;
				}
			));
			return;
		}
		setCheckedPages([...checkedPages, page]);
	}

	const handleCheckPages = ( page ) => {
		if ( checkedPages.includes(page) ) {
			return true;
		}
		return false;
	}

	const updatePagesStatus = () => {
		let newPageStatus = pagesStatus;
		checkedPages.map((page) => {
			newPageStatus.map((status) => {
				if (status.slug === page) {
					status.exists = 1;
				}
			});
		});
		setPagesStatus(newPageStatus);
	}

	const handleCreatePages = async () => {

		if (checkedPages.length === 0) {
			setIsStepComplete(true);
			next();
			return;
		}

		setIsProcessing(true);
		await api.clear_cobwebs();
		let data = await api.create_pages(checkedPages);

		if (data.success) {
			setIsProcessing(false);
			setIsStepComplete(true);
			updatePagesStatus();

			next();
		}

		setIsProcessing(false);

	}

	const clear_cobwebs = async () => {
		let data = await api.clear_cobwebs();
		return data;
	}

	const handleContainerClick = (page) => {
        if (page.pro && !licenseStatus) {
            return;
        }
        handleTogglePageCheck(page.pattern);
    }

	return (
		<div>
			<h3>Create some pages.</h3>
			<p>Choose your first pages to create and be used as a guide.</p>
			{!licenseStatus && (
				<p>Want more? <a href="https://portfoliowp.com" target="_blank">Upgrade to Pro</a> and <a
					href={pwp_data.license_url}>enter your license</a> key to get access to premium pages and patterns.
				</p>)}
			<br/>

			<Button
				className={'pwp-tool-button'}
				variant="secondary"
				onClick={(e) => {
					e.preventDefault();
					let filtered_pages = pagesStatus.filter((page) => {
						return !page.pro && !page.exists || (page.pro && !page.exists && licenseStatus);
					});
					let pages = filtered_pages.map((page) => {
						return page.pattern;
					});
					setCheckedPages(pages);
				}}
			>Select All
			</Button>

			<Button
				className={'pwp-tool-button'}
				variant="secondary"
				onClick={(e) => {
					e.preventDefault();
					setCheckedPages([]);
				}}
			>Deselect All
			</Button>

			<hr style={{marginBottom:'15px'}}/>

			<div className="pwp-page-selection">

				{pagesStatus.map((page, index) => {

					return page.exists ? (
						<div className="pwp-box">
							<div key={index} className="components-checkbox-control created">
								<div className="pwp-checked">
									<span className={"components-checkbox-control__input-container"}
										  style={{fontSize: "20px"}}><img src={check_mark} style={{maxWidth: "20px"}}/></span>
									<span className={"components-checkbox-control__label"}>{page.name}</span>
								</div>
								<span className={"pwp-pill"}>Created</span>
							</div>
							<div className="pwp-page-thumb">
								<img src={pageImages[page.pattern]} alt={page.title}/>
							</div>

						</div>
					) : (
						<div
							className="pwp-box"
							key={index}
							onClick={() => handleContainerClick(page)}
							style={{cursor: 'pointer'}} // Change cursor to pointer
						>
							<div className="pwp-box-select">
								<CheckboxControl
									label={page.name}
									checked={handleCheckPages(page.pattern)}
									onChange={(e) => {
										//e.stopPropagation();
										handleTogglePageCheck(page.pattern);
									}}
									disabled={page.pro && !licenseStatus ? true : false}
								/>
								{page.pro && !licenseStatus && (
									<span className={"pwp-pill pro"}>Pro Only</span>
								)}
							</div>
							{pageImages[page.pattern] && (
								<div className="pwp-page-thumb">
									<img src={pageImages[page.pattern]} alt={page.name}/>
								</div>
							)}
						</div>
					)
				})}
			</div>


			<div className="wp-block-buttons">
				<br/>
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
					onClick={() => handleCreatePages()}
					variant="primary"
					disabled={isProcessing}
					style={{
						margin: '10px 10px 30px 0'
					}}
				>
					{!isProcessing && !isStepComplete && checkedPages.length === 0 && "Continue"}
					{!isProcessing && !isStepComplete && checkedPages.length > 0 && "Create Pages and Continue"}
					{isProcessing && !isStepComplete && "Creating Pages..."}

				</Button>
			</div>
		</div>
	);
}

export default CreatePages;