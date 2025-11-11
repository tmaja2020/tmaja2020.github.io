import {useRef, useState, useEffect } from '@wordpress/element';

const Importer = () => {

	const [importStatus, setImportStatus] = useState( window.pwp_data.import_status ?? 'new' );
	const [isImporting, setIsImporting] = useState( false );
	const [importTotal, setImportTotal] = useState( window.pwp_data.total_posts ?? 0 );
	const [importCount, setImportCount] = useState( parseInt( window.pwp_data.imported_posts ) ?? 0 );
	const [importProgress, setImportProgress] = useState( 1 );
	const [importMessage, setImportMessage] = useState('');

	// On new page load, set state if we are importing.
	useEffect(() => {
		console.log('Importer mounted.');
		if ( importStatus === 'started') {
			setImportMessage('Importing');
			setIsImporting(true);
			updateProgress( 0 );
			// Start polling
			importRequest();
		}
		if ( importStatus === 'success') {
			setIsImporting(false);
			setImportProgress(100);
			setImportCount( importTotal );
			setImportMessage('Import done.');
			setImportStatus('success');
		}
	},[])


	const  handleImport = () => {

		// Start the import process.
		setIsImporting(true);
		setImportMessage('Importing');
		setImportStatus('started');

		// Start polling
		importRequest();
	}

	const updateProgress = (num_of_imported_posts) => {
		let new_import_total =  importCount + num_of_imported_posts ;
		let total = parseInt( importTotal );
		let progress =  ( new_import_total / importTotal ) * 100;

		setImportProgress( Math.floor(progress > 100 ? 100 : progress ) );
	}

	const importRequest = async () => {

		console.log('Import request fired.');

		const data = new URLSearchParams();
		data.append('action', 'pwp_import');
		data.append('_nonce', window.pwp_data.nonce);

		const response = await fetch(window.pwp_data.ajax_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: data
		})

		const result = await response.json();
		console.log(result);

		if ( ! response.ok ) {
			console.error( 'Error:', response );
			return result;
		}

		// Update the imported count
		if (result.num_of_imported_posts) {
			let num_of_imported_posts = parseInt( result.num_of_imported_posts ) === 0 ? 1 : parseInt( result.num_of_imported_posts );
			updateProgress( num_of_imported_posts );
		}

		// If not done, continue polling.
		if (result.status === 'newAJAX' || result.status === 'started' || result.status === 'post-import') {
			if (result.status === 'started') {
				setImportTotal( parseInt( result.total_posts ) );
			}
			if (result.status === 'post-import') {
				setImportMessage('Post processing steps...');
				setImportStatus('post-import');
			}
			setTimeout(importRequest, 1000); // Rerun after 1 second.
			return result;
		}

		// If we reach here, it means the import is done.
		setIsImporting(false);
		setImportProgress(100);
		setImportMessage('Import done.');
		setImportStatus('success');
		console.log('Import done.');
	}

	return (
		<div className="pwp-importer">


			<button
				className="pwp-importer__button"
				onClick={handleImport}
				disabled={isImporting}
			>
				Start Import
			</button>

			<div className="pwp-importer__progress">
				{ importStatus === 'started' && (
					<>Please DO NOT leave the page while importing.</>
				)}

				{ importStatus === 'success' && (
					<>Success! Import complete.</>
				)}

				{ importStatus !== 'new' && (
				<>
					<div>
						{importMessage}
					</div>
					<div className="pwp-importer__progress-bar"
						 style={{width: `${importProgress}%`, background: 'green'}}>
						{`${importProgress}%`}
					</div>
					{ importTotal > 1 && (
					<div>
						Imported {importCount} of {importTotal} items.
					</div>
					)}
				</>
				)}

			</div>

		</div>
	);
}

export default Importer;