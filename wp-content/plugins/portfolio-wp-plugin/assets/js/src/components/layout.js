import {useRef, useState, useEffect } from '@wordpress/element';
import InstallPlugins from '../pages/install-plugins';
import HomeSetup from '../pages/home-setup';
import CreatePages from '../pages/create-pages';
import FinishSetup from '../pages/finish-setup';

const Layout = () => {

	// create the step state but use localstorage to persist the state.
	// if the state is not in localstorage, set the default state to 'install-plugins'
	const [step, setStep] = useState( localStorage.getItem('pwp_setup_step') || 'install-plugins' );

	const handleStep = ( step ) => {
		localStorage.setItem('pwp_setup_step', step);
		setStep( step );
	}

	const handleHomepage = () => {
		localStorage.removeItem('pwp_setup_step');
		window.location.href = window.pwp_data.home_url;
	}

	return (
		<div id="pwp-theme-setup" className="wp-block-columns alignwide are-vertically-aligned-top is-layout-flex wp-block-columns-is-layout-flex">

			<div className="pwp-setup-nav wp-block-column is-layout-flow wp-block-column-is-layout-flow">
				<h3 className="wp-block-heading has-black-color has-medium-font-size">Setup Wizard</h3>
				<p>Kickstart your website using PortfolioWP's Theme Setup Wizard.</p>
				<ul>
					<li className={step === 'install-plugins' ? 'active' : ''}>Install Plugins</li>
					<li className={step === 'create-pages' ? 'active' : ''}>Create Pages</li>
					<li className={step === 'home-setup' ? 'active' : ''}>Homepage Setup</li>
					<li className={step === 'finish-setup' ? 'active' : ''}>Finish</li>
			</ul>
			</div>

			<div className="pwp-setup-steps wp-block-column is-layout-flow wp-block-column-is-layout-flow">

				{step === 'install-plugins' && <InstallPlugins next={ () => { handleStep('create-pages') } } />}
				{step === 'create-pages' && <CreatePages next={ () => { handleStep('home-setup') } } prev={ () => { handleStep('install-plugins') }}  />}
				{step === 'home-setup' && <HomeSetup next={ () => { handleStep('finish-setup') } } prev={ () => { handleStep('create-pages') }}  />}
				{step === 'finish-setup' && <FinishSetup home={ () => { handleHomepage() } } prev={ () => { handleStep('home-setup') }}  />}

			</div>
		</div>

	);
}

export default Layout;