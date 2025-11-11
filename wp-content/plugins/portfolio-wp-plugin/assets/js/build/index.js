/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/importer.js":
/*!************************************!*\
  !*** ./src/components/importer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const Importer = () => {
  var _window$pwp_data$impo, _window$pwp_data$tota, _parseInt;
  const [importStatus, setImportStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)((_window$pwp_data$impo = window.pwp_data.import_status) !== null && _window$pwp_data$impo !== void 0 ? _window$pwp_data$impo : 'new');
  const [isImporting, setIsImporting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [importTotal, setImportTotal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)((_window$pwp_data$tota = window.pwp_data.total_posts) !== null && _window$pwp_data$tota !== void 0 ? _window$pwp_data$tota : 0);
  const [importCount, setImportCount] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)((_parseInt = parseInt(window.pwp_data.imported_posts)) !== null && _parseInt !== void 0 ? _parseInt : 0);
  const [importProgress, setImportProgress] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
  const [importMessage, setImportMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');

  // On new page load, set state if we are importing.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    console.log('Importer mounted.');
    if (importStatus === 'started') {
      setImportMessage('Importing');
      setIsImporting(true);
      updateProgress(0);
      // Start polling
      importRequest();
    }
    if (importStatus === 'success') {
      setIsImporting(false);
      setImportProgress(100);
      setImportCount(importTotal);
      setImportMessage('Import done.');
      setImportStatus('success');
    }
  }, []);
  const handleImport = () => {
    // Start the import process.
    setIsImporting(true);
    setImportMessage('Importing');
    setImportStatus('started');

    // Start polling
    importRequest();
  };
  const updateProgress = num_of_imported_posts => {
    let new_import_total = importCount + num_of_imported_posts;
    let total = parseInt(importTotal);
    let progress = new_import_total / importTotal * 100;
    setImportProgress(Math.floor(progress > 100 ? 100 : progress));
  };
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
    });
    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      console.error('Error:', response);
      return result;
    }

    // Update the imported count
    if (result.num_of_imported_posts) {
      let num_of_imported_posts = parseInt(result.num_of_imported_posts) === 0 ? 1 : parseInt(result.num_of_imported_posts);
      updateProgress(num_of_imported_posts);
    }

    // If not done, continue polling.
    if (result.status === 'newAJAX' || result.status === 'started' || result.status === 'post-import') {
      if (result.status === 'started') {
        setImportTotal(parseInt(result.total_posts));
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
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-importer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "pwp-importer__button",
    onClick: handleImport,
    disabled: isImporting
  }, "Start Import"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-importer__progress"
  }, importStatus === 'started' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "Please DO NOT leave the page while importing."), importStatus === 'success' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "Success! Import complete."), importStatus !== 'new' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, importMessage), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-importer__progress-bar",
    style: {
      width: `${importProgress}%`,
      background: 'green'
    }
  }, `${importProgress}%`), importTotal > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Imported ", importCount, " of ", importTotal, " items."))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Importer);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_install_plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/install-plugins */ "./src/pages/install-plugins.js");
/* harmony import */ var _pages_home_setup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/home-setup */ "./src/pages/home-setup.js");
/* harmony import */ var _pages_create_pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/create-pages */ "./src/pages/create-pages.js");
/* harmony import */ var _pages_finish_setup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pages/finish-setup */ "./src/pages/finish-setup.js");






const Layout = () => {
  // create the step state but use localstorage to persist the state.
  // if the state is not in localstorage, set the default state to 'install-plugins'
  const [step, setStep] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(localStorage.getItem('pwp_setup_step') || 'install-plugins');
  const handleStep = step => {
    localStorage.setItem('pwp_setup_step', step);
    setStep(step);
  };
  const handleHomepage = () => {
    localStorage.removeItem('pwp_setup_step');
    window.location.href = window.pwp_data.home_url;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "pwp-theme-setup",
    className: "wp-block-columns alignwide are-vertically-aligned-top is-layout-flex wp-block-columns-is-layout-flex"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-setup-nav wp-block-column is-layout-flow wp-block-column-is-layout-flow"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wp-block-heading has-black-color has-medium-font-size"
  }, "Setup Wizard"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Kickstart your website using PortfolioWP's Theme Setup Wizard."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: step === 'install-plugins' ? 'active' : ''
  }, "Install Plugins"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: step === 'create-pages' ? 'active' : ''
  }, "Create Pages"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: step === 'home-setup' ? 'active' : ''
  }, "Homepage Setup"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: step === 'finish-setup' ? 'active' : ''
  }, "Finish"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-setup-steps wp-block-column is-layout-flow wp-block-column-is-layout-flow"
  }, step === 'install-plugins' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pages_install_plugins__WEBPACK_IMPORTED_MODULE_2__["default"], {
    next: () => {
      handleStep('create-pages');
    }
  }), step === 'create-pages' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pages_create_pages__WEBPACK_IMPORTED_MODULE_4__["default"], {
    next: () => {
      handleStep('home-setup');
    },
    prev: () => {
      handleStep('install-plugins');
    }
  }), step === 'home-setup' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pages_home_setup__WEBPACK_IMPORTED_MODULE_3__["default"], {
    next: () => {
      handleStep('finish-setup');
    },
    prev: () => {
      handleStep('create-pages');
    }
  }), step === 'finish-setup' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pages_finish_setup__WEBPACK_IMPORTED_MODULE_5__["default"], {
    home: () => {
      handleHomepage();
    },
    prev: () => {
      handleStep('home-setup');
    }
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/helpers/api.js":
/*!****************************!*\
  !*** ./src/helpers/api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   api: () => (/* binding */ api)
/* harmony export */ });
const api = {
  install_plugins: async $plugins => {
    let response = await fetch(window.pwp_data.rest_url + 'install_plugins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.pwp_data.rest_nounce
      },
      body: JSON.stringify({
        plugins: $plugins
      })
    });
    if (!response.ok) {
      console.log('Error');
    }
    return await response.json();
  },
  create_pages: async $pages => {
    let response = await fetch(window.pwp_data.rest_url + 'create_pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.pwp_data.rest_nounce
      },
      body: JSON.stringify({
        pages: $pages
      })
    });
    if (!response.ok) {
      console.log('Error');
    }
    return await response.json();
  },
  clear_cobwebs: async () => {
    let response = await fetch(window.pwp_data.rest_url + 'clear_cobwebs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.pwp_data.rest_nounce
      },
      body: JSON.stringify({
        'broom': 'sweep'
      })
    });
    return true;
  },
  get_pages: async () => {
    let response = await fetch(window.pwp_data.rest_root_url + 'wp/v2/pages?' + new URLSearchParams({
      context: 'edit',
      per_page: 25,
      order: 'asc',
      status: 'publish',
      _locale: 'user'
    }).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.pwp_data.rest_nounce
      }
    });
    if (!response.ok) {
      console.log('Error');
    }
    return await response.json();
  },
  save_homepage_settings: async $data => {
    let response = await fetch(window.pwp_data.rest_url + 'save_homepage_settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': window.pwp_data.rest_nounce
      },
      body: JSON.stringify($data)
    });
    if (!response.ok) {
      console.log('Error');
    }
    return await response.json();
  }
};


/***/ }),

/***/ "./src/pages/create-pages.js":
/*!***********************************!*\
  !*** ./src/pages/create-pages.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/api */ "./src/helpers/api.js");
/* harmony import */ var _assets_images_check_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../assets/images/check.png */ "../images/check.png");
/* harmony import */ var _assets_images_thumbnails_home_pro_webp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/home-pro.webp */ "../images/thumbnails/home-pro.webp");
/* harmony import */ var _assets_images_thumbnails_home_free_webp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/home-free.webp */ "../images/thumbnails/home-free.webp");
/* harmony import */ var _assets_images_thumbnails_about_pro_webp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/about-pro.webp */ "../images/thumbnails/about-pro.webp");
/* harmony import */ var _assets_images_thumbnails_about_free_webp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/about-free.webp */ "../images/thumbnails/about-free.webp");
/* harmony import */ var _assets_images_thumbnails_contact_pro_webp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/contact-pro.webp */ "../images/thumbnails/contact-pro.webp");
/* harmony import */ var _assets_images_thumbnails_contact_free_webp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/contact-free.webp */ "../images/thumbnails/contact-free.webp");
/* harmony import */ var _assets_images_thumbnails_case_study_pro_webp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/case-study-pro.webp */ "../images/thumbnails/case-study-pro.webp");
/* harmony import */ var _assets_images_thumbnails_case_study_free_webp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/case-study-free.webp */ "../images/thumbnails/case-study-free.webp");
/* harmony import */ var _assets_images_thumbnails_portfolio_pro_webp__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/portfolio-pro.webp */ "../images/thumbnails/portfolio-pro.webp");
/* harmony import */ var _assets_images_thumbnails_portfolio_free_webp__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/portfolio-free.webp */ "../images/thumbnails/portfolio-free.webp");
/* harmony import */ var _assets_images_thumbnails_testimonials_pro_webp__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/testimonials-pro.webp */ "../images/thumbnails/testimonials-pro.webp");
/* harmony import */ var _assets_images_thumbnails_services_pro_webp__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/services-pro.webp */ "../images/thumbnails/services-pro.webp");
/* harmony import */ var _assets_images_thumbnails_awards_pro_webp__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/awards-pro.webp */ "../images/thumbnails/awards-pro.webp");
/* harmony import */ var _assets_images_thumbnails_blog_free_webp__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../assets/images/thumbnails/blog-free.webp */ "../images/thumbnails/blog-free.webp");



















const CreatePages = ({
  next,
  prev
}) => {
  const [licenseStatus, setLicenseStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(window.pwp_data.setup.license.valid);
  const [isProcessing, setIsProcessing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isStepComplete, setIsStepComplete] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [checkedPages, setCheckedPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [pagesStatus, setPagesStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(window.pwp_data.setup.pages);
  const pageImages = {
    'home-free': _assets_images_thumbnails_home_free_webp__WEBPACK_IMPORTED_MODULE_6__,
    'home-pro': _assets_images_thumbnails_home_pro_webp__WEBPACK_IMPORTED_MODULE_5__,
    'about-free': _assets_images_thumbnails_about_free_webp__WEBPACK_IMPORTED_MODULE_8__,
    'about-pro': _assets_images_thumbnails_about_pro_webp__WEBPACK_IMPORTED_MODULE_7__,
    'contact-free': _assets_images_thumbnails_contact_free_webp__WEBPACK_IMPORTED_MODULE_10__,
    'contact-pro': _assets_images_thumbnails_contact_pro_webp__WEBPACK_IMPORTED_MODULE_9__,
    'case-study-free': _assets_images_thumbnails_case_study_free_webp__WEBPACK_IMPORTED_MODULE_12__,
    'case-study-pro': _assets_images_thumbnails_case_study_pro_webp__WEBPACK_IMPORTED_MODULE_11__,
    'portfolio-free': _assets_images_thumbnails_portfolio_free_webp__WEBPACK_IMPORTED_MODULE_14__,
    'portfolio-pro': _assets_images_thumbnails_portfolio_pro_webp__WEBPACK_IMPORTED_MODULE_13__,
    'testimonials-pro': _assets_images_thumbnails_testimonials_pro_webp__WEBPACK_IMPORTED_MODULE_15__,
    'services-pro': _assets_images_thumbnails_services_pro_webp__WEBPACK_IMPORTED_MODULE_16__,
    'awards-pro': _assets_images_thumbnails_awards_pro_webp__WEBPACK_IMPORTED_MODULE_17__,
    'blog': _assets_images_thumbnails_blog_free_webp__WEBPACK_IMPORTED_MODULE_18__
  };
  const handleNextStep = () => {
    next();
  };
  const handlePrevStep = () => {
    prev();
  };
  const handleTogglePageCheck = page => {
    if (handleCheckPages(page)) {
      setCheckedPages(checkedPages.filter(function (element) {
        return element !== page;
      }));
      return;
    }
    setCheckedPages([...checkedPages, page]);
  };
  const handleCheckPages = page => {
    if (checkedPages.includes(page)) {
      return true;
    }
    return false;
  };
  const updatePagesStatus = () => {
    let newPageStatus = pagesStatus;
    checkedPages.map(page => {
      newPageStatus.map(status => {
        if (status.slug === page) {
          status.exists = 1;
        }
      });
    });
    setPagesStatus(newPageStatus);
  };
  const handleCreatePages = async () => {
    if (checkedPages.length === 0) {
      setIsStepComplete(true);
      next();
      return;
    }
    setIsProcessing(true);
    await _helpers_api__WEBPACK_IMPORTED_MODULE_3__.api.clear_cobwebs();
    let data = await _helpers_api__WEBPACK_IMPORTED_MODULE_3__.api.create_pages(checkedPages);
    if (data.success) {
      setIsProcessing(false);
      setIsStepComplete(true);
      updatePagesStatus();
      next();
    }
    setIsProcessing(false);
  };
  const clear_cobwebs = async () => {
    let data = await _helpers_api__WEBPACK_IMPORTED_MODULE_3__.api.clear_cobwebs();
    return data;
  };
  const handleContainerClick = page => {
    if (page.pro && !licenseStatus) {
      return;
    }
    handleTogglePageCheck(page.pattern);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Create some pages."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Choose your first pages to create and be used as a guide."), !licenseStatus && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Want more? ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://portfoliowp.com",
    target: "_blank"
  }, "Upgrade to Pro"), " and ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: pwp_data.license_url
  }, "enter your license"), " key to get access to premium pages and patterns."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: 'pwp-tool-button',
    variant: "secondary",
    onClick: e => {
      e.preventDefault();
      let filtered_pages = pagesStatus.filter(page => {
        return !page.pro && !page.exists || page.pro && !page.exists && licenseStatus;
      });
      let pages = filtered_pages.map(page => {
        return page.pattern;
      });
      setCheckedPages(pages);
    }
  }, "Select All"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: 'pwp-tool-button',
    variant: "secondary",
    onClick: e => {
      e.preventDefault();
      setCheckedPages([]);
    }
  }, "Deselect All"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("hr", {
    style: {
      marginBottom: '15px'
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-page-selection"
  }, pagesStatus.map((page, index) => {
    return page.exists ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pwp-box"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: index,
      className: "components-checkbox-control created"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pwp-checked"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "components-checkbox-control__input-container",
      style: {
        fontSize: "20px"
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _assets_images_check_png__WEBPACK_IMPORTED_MODULE_4__,
      style: {
        maxWidth: "20px"
      }
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "components-checkbox-control__label"
    }, page.name)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pwp-pill"
    }, "Created")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pwp-page-thumb"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: pageImages[page.pattern],
      alt: page.title
    }))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pwp-box",
      key: index,
      onClick: () => handleContainerClick(page),
      style: {
        cursor: 'pointer'
      } // Change cursor to pointer
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pwp-box-select"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
      label: page.name,
      checked: handleCheckPages(page.pattern),
      onChange: e => {
        //e.stopPropagation();
        handleTogglePageCheck(page.pattern);
      },
      disabled: page.pro && !licenseStatus ? true : false
    }), page.pro && !licenseStatus && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "pwp-pill pro"
    }, "Pro Only")), pageImages[page.pattern] && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "pwp-page-thumb"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: pageImages[page.pattern],
      alt: page.name
    })));
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => handlePrevStep(),
    variant: "secondary",
    style: {
      margin: '0 10px 10px 0'
    }
  }, "Previous"), isProcessing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => handleCreatePages(),
    variant: "primary",
    disabled: isProcessing,
    style: {
      margin: '10px 10px 30px 0'
    }
  }, !isProcessing && !isStepComplete && checkedPages.length === 0 && "Continue", !isProcessing && !isStepComplete && checkedPages.length > 0 && "Create Pages and Continue", isProcessing && !isStepComplete && "Creating Pages...")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreatePages);

/***/ }),

/***/ "./src/pages/finish-setup.js":
/*!***********************************!*\
  !*** ./src/pages/finish-setup.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);



const FinishSetup = ({
  home,
  prev
}) => {
  const handleHomeLink = () => {
    home();
  };
  const handlePrevStep = () => {
    prev();
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "\uD83C\uDF89 All done!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Checkout your new site!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => handlePrevStep(),
    style: {
      margin: '0 10px 10px 0'
    },
    variant: "secondary"
  }, "Previous"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => handleHomeLink(),
    style: {
      margin: '0 10px 10px 0'
    },
    variant: "primary"
  }, "Let's see it!")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FinishSetup);

/***/ }),

/***/ "./src/pages/home-setup.js":
/*!*********************************!*\
  !*** ./src/pages/home-setup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/api */ "./src/helpers/api.js");






const HomeSetup = ({
  next,
  prev
}) => {
  const [pages, setPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [homepageStyle, setHomepageStyle] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('custom');
  const [customPageId, setCustomPageId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [isProcessing, setIsProcessing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isStepComplete, setIsStepComplete] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const handlePrevStep = () => {
    prev();
  };
  const handleHomePageSettings = () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    let data = {
      homepageStyle: homepageStyle
    };
    _helpers_api__WEBPACK_IMPORTED_MODULE_5__.api.save_homepage_settings({
      style: homepageStyle,
      page_id: customPageId
    }).then(response => {
      setIsProcessing(false);
      setIsStepComplete(true);
      next();
    });
  };
  const getPages = data => {
    let tempPages = [];
    data.map(page => {
      tempPages.push({
        label: page.title.raw,
        value: page.id
      });
    });
    return [{
      disabled: true,
      label: 'Select a Page',
      value: ''
    }, ...tempPages];
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (homepageStyle === 'posts') {
      return;
    }
    _helpers_api__WEBPACK_IMPORTED_MODULE_5__.api.get_pages().then(data => {
      setPages(data);
      setCustomPageId(data[0].id);
    });
  }, [homepageStyle]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-setup-homepage"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "Homepage Setup"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "It's the front-door of your website. Let's make it nice!"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-panels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: "50%"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RadioControl, {
    label: "Choose a style",
    onChange: value => {
      setHomepageStyle(value);
    },
    options: [{
      label: 'Latest Posts - Displays a blog on your home page.',
      value: 'posts'
    }, {
      label: 'Custom page - Select a created page as your home page.',
      value: 'custom'
    }],
    selected: homepageStyle
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), homepageStyle === 'custom' && pages.length === 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null), " Loading pages..."), homepageStyle === 'custom' && pages.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: "Select a page",
    options: getPages(pages),
    onChange: value => {
      setCustomPageId(value);
    }
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-buttons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: () => handlePrevStep(),
    variant: "secondary",
    style: {
      margin: '0 10px 10px 0'
    }
  }, "Previous"), isProcessing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: () => handleHomePageSettings(),
    variant: "primary",
    style: {
      margin: '10px 10px 30px 0'
    }
  }, !isProcessing && "Save Settings & Continue", isProcessing && !isStepComplete && "Saving...", isStepComplete && "Settings Saved!")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HomeSetup);

/***/ }),

/***/ "./src/pages/install-plugins.js":
/*!**************************************!*\
  !*** ./src/pages/install-plugins.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/api */ "./src/helpers/api.js");
/* harmony import */ var _assets_images_check_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../assets/images/check.png */ "../images/check.png");





const InstallPlugins = ({
  next
}) => {
  const woocommerce = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const jetpack = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const [isProcessing, setIsProcessing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [isStepComplete, setIsStepComplete] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [checkedPlugins, setCheckedPlugins] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [pluginsStatus, setPluginStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(window.pwp_data.setup.plugins);
  const handleNextStep = () => {
    next();
  };
  const handleCheckPlugin = plugin => {
    if (checkedPlugins.includes(plugin)) {
      return true;
    }
    return false;
  };
  const handleTogglePluginCheck = page => {
    if (handleCheckPlugins(page)) {
      setCheckedPlugins(checkedPlugins.filter(function (element) {
        return element !== page;
      }));
      return;
    }
    setCheckedPlugins([...checkedPlugins, page]);
  };
  const handleCheckPlugins = page => {
    if (checkedPlugins.includes(page)) {
      return true;
    }
    return false;
  };
  const handleInstallPlugins = async () => {
    setIsProcessing(true);
    let data = await _helpers_api__WEBPACK_IMPORTED_MODULE_3__.api.install_plugins(checkedPlugins);
    if (data.success) {
      setIsProcessing(false);
      setIsStepComplete(true);
      updatePluginStatus();
      next();
    } else {
      console.log('Error');
    }
  };
  const updatePluginStatus = () => {
    let newPluginStatus = pluginsStatus;
    checkedPlugins.map(page => {
      newPluginStatus.map(status => {
        if (status.slug === page) {
          status.exists = 1;
        }
      });
    });
    setPluginStatus(newPluginStatus);
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "pwp-setup-install-plugins",
    className: "pwp-setup-step step-one active"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "wp-block-heading"
  }, "First, let's install some plugins."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "PortfolioWP supports these plugins out of the box. Select the which plugins below you would like to install and activate."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pwp-panels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, pluginsStatus.map((plugin, index) => plugin.exists ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: index,
    style: {
      marginBottom: "12px",
      paddingBottom: "8px",
      borderBottom: "1px solid #e0e0e0"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "components-checkbox-control__input-container",
    style: {
      fontSize: "20px"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: _assets_images_check_png__WEBPACK_IMPORTED_MODULE_4__,
    style: {
      maxWidth: "24px",
      marginRight: "6px"
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "components-checkbox-control__label"
  }, plugin.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "pwp-pill"
  }, "Installed")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "12px",
      paddingBottom: "8px",
      borderBottom: "1px solid #e0e0e0"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CheckboxControl, {
    key: index,
    label: 'Install ' + plugin.name,
    checked: handleCheckPlugin(plugin.slug),
    onChange: () => handleTogglePluginCheck(plugin.slug)
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-buttons"
  }, isProcessing && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    onClick: () => handleInstallPlugins(),
    variant: "primary",
    style: {
      margin: '0 10px 30px 0'
    }
  }, !isProcessing && !isStepComplete && checkedPlugins.length === 0 && "Activate Plugins and Continue", !isProcessing && !isStepComplete && checkedPlugins.length > 0 && "Install / Activate Plugins and Continue", isProcessing && !isStepComplete && "Installing & Activating ..."))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InstallPlugins);

/***/ }),

/***/ "../images/check.png":
/*!***************************!*\
  !*** ../images/check.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/check.d059d3d9.png";

/***/ }),

/***/ "../images/thumbnails/about-free.webp":
/*!********************************************!*\
  !*** ../images/thumbnails/about-free.webp ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/about-free.d60eef73.webp";

/***/ }),

/***/ "../images/thumbnails/about-pro.webp":
/*!*******************************************!*\
  !*** ../images/thumbnails/about-pro.webp ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/about-pro.6289a01c.webp";

/***/ }),

/***/ "../images/thumbnails/awards-pro.webp":
/*!********************************************!*\
  !*** ../images/thumbnails/awards-pro.webp ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/awards-pro.481b848d.webp";

/***/ }),

/***/ "../images/thumbnails/blog-free.webp":
/*!*******************************************!*\
  !*** ../images/thumbnails/blog-free.webp ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/blog-free.7f86c461.webp";

/***/ }),

/***/ "../images/thumbnails/case-study-free.webp":
/*!*************************************************!*\
  !*** ../images/thumbnails/case-study-free.webp ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/case-study-free.5b3bc7d7.webp";

/***/ }),

/***/ "../images/thumbnails/case-study-pro.webp":
/*!************************************************!*\
  !*** ../images/thumbnails/case-study-pro.webp ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/case-study-pro.8dd2acad.webp";

/***/ }),

/***/ "../images/thumbnails/contact-free.webp":
/*!**********************************************!*\
  !*** ../images/thumbnails/contact-free.webp ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/contact-free.9e6ca3e8.webp";

/***/ }),

/***/ "../images/thumbnails/contact-pro.webp":
/*!*********************************************!*\
  !*** ../images/thumbnails/contact-pro.webp ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/contact-pro.6949ea36.webp";

/***/ }),

/***/ "../images/thumbnails/home-free.webp":
/*!*******************************************!*\
  !*** ../images/thumbnails/home-free.webp ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/home-free.f99764fe.webp";

/***/ }),

/***/ "../images/thumbnails/home-pro.webp":
/*!******************************************!*\
  !*** ../images/thumbnails/home-pro.webp ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/home-pro.28dc58d2.webp";

/***/ }),

/***/ "../images/thumbnails/portfolio-free.webp":
/*!************************************************!*\
  !*** ../images/thumbnails/portfolio-free.webp ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/portfolio-free.26f0377b.webp";

/***/ }),

/***/ "../images/thumbnails/portfolio-pro.webp":
/*!***********************************************!*\
  !*** ../images/thumbnails/portfolio-pro.webp ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/portfolio-pro.d0051a81.webp";

/***/ }),

/***/ "../images/thumbnails/services-pro.webp":
/*!**********************************************!*\
  !*** ../images/thumbnails/services-pro.webp ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/services-pro.0382e82d.webp";

/***/ }),

/***/ "../images/thumbnails/testimonials-pro.webp":
/*!**************************************************!*\
  !*** ../images/thumbnails/testimonials-pro.webp ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/testimonials-pro.9d65ab77.webp";

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_importer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/importer */ "./src/components/importer.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/layout */ "./src/components/layout.js");





_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_1___default()(() => {
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createRoot)(document.getElementById('pwp-react-importer'));
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_layout__WEBPACK_IMPORTED_MODULE_4__["default"], null));
});
/******/ })()
;
//# sourceMappingURL=index.js.map