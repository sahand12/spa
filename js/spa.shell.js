/**
 * spa.shell.js
 * Shell module for SPA
 */

/*jslint
 * browser: true, continue: true,
 * devel: true, indent: 4, maxerr: 50,
 * newcap: true, nomen: true, plusplus: true,
 * reqexp: true, sloppy: true, vars: true,
 * white: true
 */

/** global $, spa */

spa.shell = (function () {

	// ---- Begin module scope varaibles ----
	var
		configMap = {
			main_html: String() +
				'<div class="spa-shell-head">' +
					'<div class="spa-shell-head-logo"></div>' +
					'<div class="spa-shell-head-acct"></div>' +
					'<div class="spa-shell-head-search"></div>' +
				'</div>' +
				'<div class="spa-shell-main">' +
					'<div class="spa-shell-main-nav"></div>' +
					'<div class="spa-shell-main-content"></div>' +
				'</div>' +
				'<div class="spa-shell-foot"></div>' +
				'<div class="spa-shell-chat"></div>' +
				'<div class="spa-shell-modal"></div>',
			chat_extend_height: 450,
			chat_retract_height: 15,
			chat_extend_time: 1000,
			chat_retract_time: 300
		},

		// place dynamic information shared across the module in stateMap
		stateMap = { $container: null },

		// cache jquery collections in jqueryMap
		jqueryMap = {},

		// declare all module scope variables in this section. Many are assgined later
		setJqueryMap, toggleChat, initModule;
	// ---- end module scope variables ----
	

	// ---- begin utility methods ----
	// ---- end utility methods ----
	

	// ---- begin DOM methods ----
	// begin DOM methods /setJqueryMap/
	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container: $container,
			$chat: $container.find('.spa-shell-chat') 
		};
	};

	// Begin DOM method /toggleChat/
	// purpose: Extends or retracts chat slider
	// arguments: 
	// 		* extendFlag - if true, extends slider; if false or none retracts
	// 		* callbakc - optional function to execure at end of animation
	// settings: 
	// 		* chat_extend_time, chat_retract_time,
	// 		* chat_extend_height, chat_retract_height
	// returns: boolean
	// 		* true: slider animatin activated
	// 		* false: slider animatin not activated
	toggleChat = function (extendFlag, callback) {
		if (!callback && typeof extendFlag === 'function') {
			callback = extendFlag;
			extendFlag = undefined;
		}

		var chatHeight = jqueryMap.$chat.height(),
			isOpen = chatHeight === configMap.chat_extend_height,
			isClosed = chatHeight === configMap.chat_retract_height,
			isSliding = !isOpen && !isClosed;

		// avoid race conditions
		if (isSliding) {
			return false;
		}

		// begin extend chat slider
		if (extendFlag) {
			jqueryMap.$chat
				.animate(
					{ height: configMap.chat_extend_height }, 
					configMap.chat_extend_time, 
					function () {
						if (callback) {
							callback(jqueryMap.$chat)
						}
					} 
				);
		}
		else {
			jqueryMap.$chat.
				animate(
					{ height: configMap.chat_retract_height }, 
					configMap.chat_retract_time,
					function () {
						if (callback) {
							callback(jqueryMap.$chat);
						}
					}
				);
		}
		return true;
	};
	// ---- end DOM methods ----


	// ---- begin Event Handlers ----
	
	// ---- End Event Handlers ----
	

	// ---- Begin Public Methods ----
	// begin public method /initModule/
	initModule = function ($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();

		// test toggle
		setTimeout(function () {
			toggleChat(true, console.info.bind(console, "extending the chat div"));
		}, 3000);
		setTimeout(function () {
			toggleChat(console.info.bind(console, 'retracting the chat div'));
		}, 8000);
	};

	return { initModule: initModule };
	// ---- End Public Methods ----
})();