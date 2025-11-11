/**
 * Register the Article Categories variation for the Post Terms block.
 */
wp.domReady( () => {

  console.log('Registering block variation');
  wp.blocks.registerBlockVariation(
      'core/post-terms',
      {
        name: 'jetpack-portfolio-type',
        title: 'Project Types',
        icon: 'category',
        isDefault: false,
        attributes: { taxonomy: 'jetpack-portfolio-type' },
      },
  );

} );