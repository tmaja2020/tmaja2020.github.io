import {useRef, useState, useEffect } from '@wordpress/element';
import {Button, CheckboxControl, Spinner} from '@wordpress/components';
import { api } from '../helpers/api';

import check_mark from '../../../../assets/images/check.png';

const InstallPlugins = ( { next } ) => {

	const woocommerce = useRef();
	const jetpack = useRef();

	const [isProcessing, setIsProcessing] = useState(false);
	const [isStepComplete, setIsStepComplete] = useState(false);
	const [checkedPlugins, setCheckedPlugins] = useState([]);
	const [pluginsStatus, setPluginStatus] = useState(window.pwp_data.setup.plugins);

	const handleNextStep = () => {
		next();
	}

	const handleCheckPlugin = ( plugin ) => {
		if ( checkedPlugins.includes(plugin) ) {
			return true;
		}
		return false;
	}

	const handleTogglePluginCheck = ( page ) => {

		if ( handleCheckPlugins(page) ) {
			setCheckedPlugins(checkedPlugins.filter(function (element) {
					return element !== page;
				}
			));
			return;
		}
		setCheckedPlugins([...checkedPlugins, page]);
	}

	const handleCheckPlugins = ( page ) => {
		if ( checkedPlugins.includes(page) ) {
			return true;
		}
		return false;
	}

	const handleInstallPlugins = async () => {

		setIsProcessing(true);
		let data = await api.install_plugins(checkedPlugins);

		if (data.success) {
			setIsProcessing(false);
			setIsStepComplete(true);
			updatePluginStatus();
			next();
		}else{
			console.log('Error');
		}
	}

	const updatePluginStatus = () => {
		let newPluginStatus = pluginsStatus;
		checkedPlugins.map((page) => {
			newPluginStatus.map((status) => {
				if (status.slug === page) {
					status.exists = 1;
				}
			});
		});
		setPluginStatus(newPluginStatus);
	}


	return (
		<div>
			<div id="pwp-setup-install-plugins" className="pwp-setup-step step-one active">
				<h3 className="wp-block-heading">First, let's install some plugins.</h3>
				<p>PortfolioWP supports these plugins out of the box. Select the which plugins below you would like to
					install and activate.</p>

				<div className="pwp-panels">
				<ul>
					{pluginsStatus.map((plugin, index) => (

						plugin.exists ? (
							<div key={index} style={{marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #e0e0e0"}}>
								<span className={"components-checkbox-control__input-container"} style={{fontSize:"20px"}}><img src={check_mark} style={{maxWidth: "24px", marginRight: "6px"}} /></span>
								<span className={"components-checkbox-control__label"}>{plugin.name}</span>
								<span className={"pwp-pill"}>Installed</span>
							</div>
						) : (
							<div style={{marginBottom: "12px", paddingBottom: "8px", borderBottom: "1px solid #e0e0e0"}}>
							<CheckboxControl
								key={index}
								label={'Install '+ plugin.name}
								checked={handleCheckPlugin(plugin.slug)}
								onChange={() => handleTogglePluginCheck(plugin.slug)}
							/>
							</div>
						)
					))}

				</ul>

				</div>

						<br/>

						<div className="wp-block-buttons">

							{isProcessing && ( <Spinner/> )}

							<Button
								onClick={() => handleInstallPlugins()}
								variant="primary"
								style={{
									margin: '0 10px 30px 0'
								}}
							>
								{!isProcessing && !isStepComplete && checkedPlugins.length === 0 && "Activate Plugins and Continue"}
								{!isProcessing && !isStepComplete && checkedPlugins.length > 0 && "Install / Activate Plugins and Continue"}
								{isProcessing && !isStepComplete && "Installing & Activating ..."}
							</Button>
						</div>


			</div>
		</div>
);
}

export default InstallPlugins;