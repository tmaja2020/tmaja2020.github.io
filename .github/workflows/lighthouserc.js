module.exports = {
  ci: {
    collect: {
      staticDistDir: './',
    },
    upload: {

      target: 'temporary-public-storage',

  
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['warn', {minScore: 0.8}],
        'categories:seo': ['warn', {minScore: 0.8}],
        'categories:best-practices': ['warn', {minScore: 0.8}]
      }
    }
  },
};