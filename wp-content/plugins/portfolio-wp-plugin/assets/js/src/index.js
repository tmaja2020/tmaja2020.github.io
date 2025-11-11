import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import Importer from "./components/importer";
import Layout from "./components/layout";

domReady( () => {
	const root = createRoot(
		document.getElementById( 'pwp-react-importer' )
	);

	root.render( <Layout/> );
} );