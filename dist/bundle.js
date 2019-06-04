/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "73ca4a5989465b1d2ab4";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/define-properties/index.js":
/*!*************************************************!*\
  !*** ./node_modules/define-properties/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar keys = __webpack_require__(/*! object-keys */ \"./node_modules/object-keys/index.js\");\nvar hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';\n\nvar toStr = Object.prototype.toString;\nvar concat = Array.prototype.concat;\nvar origDefineProperty = Object.defineProperty;\n\nvar isFunction = function (fn) {\n\treturn typeof fn === 'function' && toStr.call(fn) === '[object Function]';\n};\n\nvar arePropertyDescriptorsSupported = function () {\n\tvar obj = {};\n\ttry {\n\t\torigDefineProperty(obj, 'x', { enumerable: false, value: obj });\n\t\t// eslint-disable-next-line no-unused-vars, no-restricted-syntax\n\t\tfor (var _ in obj) { // jscs:ignore disallowUnusedVariables\n\t\t\treturn false;\n\t\t}\n\t\treturn obj.x === obj;\n\t} catch (e) { /* this is IE 8. */\n\t\treturn false;\n\t}\n};\nvar supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();\n\nvar defineProperty = function (object, name, value, predicate) {\n\tif (name in object && (!isFunction(predicate) || !predicate())) {\n\t\treturn;\n\t}\n\tif (supportsDescriptors) {\n\t\torigDefineProperty(object, name, {\n\t\t\tconfigurable: true,\n\t\t\tenumerable: false,\n\t\t\tvalue: value,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\tobject[name] = value;\n\t}\n};\n\nvar defineProperties = function (object, map) {\n\tvar predicates = arguments.length > 2 ? arguments[2] : {};\n\tvar props = keys(map);\n\tif (hasSymbols) {\n\t\tprops = concat.call(props, Object.getOwnPropertySymbols(map));\n\t}\n\tfor (var i = 0; i < props.length; i += 1) {\n\t\tdefineProperty(object, props[i], map[props[i]], predicates[props[i]]);\n\t}\n};\n\ndefineProperties.supportsDescriptors = !!supportsDescriptors;\n\nmodule.exports = defineProperties;\n\n\n//# sourceURL=webpack:///./node_modules/define-properties/index.js?");

/***/ }),

/***/ "./node_modules/es-abstract/GetIntrinsic.js":
/*!**************************************************!*\
  !*** ./node_modules/es-abstract/GetIntrinsic.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* globals\n\tSet,\n\tMap,\n\tWeakSet,\n\tWeakMap,\n\n\tPromise,\n\n\tSymbol,\n\tProxy,\n\n\tAtomics,\n\tSharedArrayBuffer,\n\n\tArrayBuffer,\n\tDataView,\n\tUint8Array,\n\tFloat32Array,\n\tFloat64Array,\n\tInt8Array,\n\tInt16Array,\n\tInt32Array,\n\tUint8ClampedArray,\n\tUint16Array,\n\tUint32Array,\n*/\n\nvar undefined; // eslint-disable-line no-shadow-restricted-names\n\nvar ThrowTypeError = Object.getOwnPropertyDescriptor\n\t? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())\n\t: function () { throw new TypeError(); };\n\nvar hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';\n\nvar getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto\n\nvar generator; // = function * () {};\nvar generatorFunction = generator ? getProto(generator) : undefined;\nvar asyncFn; // async function() {};\nvar asyncFunction = asyncFn ? asyncFn.constructor : undefined;\nvar asyncGen; // async function * () {};\nvar asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;\nvar asyncGenIterator = asyncGen ? asyncGen() : undefined;\n\nvar TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);\n\nvar INTRINSICS = {\n\t'$ %Array%': Array,\n\t'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,\n\t'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,\n\t'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,\n\t'$ %ArrayPrototype%': Array.prototype,\n\t'$ %ArrayProto_entries%': Array.prototype.entries,\n\t'$ %ArrayProto_forEach%': Array.prototype.forEach,\n\t'$ %ArrayProto_keys%': Array.prototype.keys,\n\t'$ %ArrayProto_values%': Array.prototype.values,\n\t'$ %AsyncFromSyncIteratorPrototype%': undefined,\n\t'$ %AsyncFunction%': asyncFunction,\n\t'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,\n\t'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,\n\t'$ %AsyncGeneratorFunction%': asyncGenFunction,\n\t'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,\n\t'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,\n\t'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,\n\t'$ %Boolean%': Boolean,\n\t'$ %BooleanPrototype%': Boolean.prototype,\n\t'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,\n\t'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,\n\t'$ %Date%': Date,\n\t'$ %DatePrototype%': Date.prototype,\n\t'$ %decodeURI%': decodeURI,\n\t'$ %decodeURIComponent%': decodeURIComponent,\n\t'$ %encodeURI%': encodeURI,\n\t'$ %encodeURIComponent%': encodeURIComponent,\n\t'$ %Error%': Error,\n\t'$ %ErrorPrototype%': Error.prototype,\n\t'$ %eval%': eval, // eslint-disable-line no-eval\n\t'$ %EvalError%': EvalError,\n\t'$ %EvalErrorPrototype%': EvalError.prototype,\n\t'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,\n\t'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,\n\t'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,\n\t'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,\n\t'$ %Function%': Function,\n\t'$ %FunctionPrototype%': Function.prototype,\n\t'$ %Generator%': generator ? getProto(generator()) : undefined,\n\t'$ %GeneratorFunction%': generatorFunction,\n\t'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,\n\t'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,\n\t'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,\n\t'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,\n\t'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,\n\t'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,\n\t'$ %isFinite%': isFinite,\n\t'$ %isNaN%': isNaN,\n\t'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,\n\t'$ %JSON%': JSON,\n\t'$ %JSONParse%': JSON.parse,\n\t'$ %Map%': typeof Map === 'undefined' ? undefined : Map,\n\t'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),\n\t'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,\n\t'$ %Math%': Math,\n\t'$ %Number%': Number,\n\t'$ %NumberPrototype%': Number.prototype,\n\t'$ %Object%': Object,\n\t'$ %ObjectPrototype%': Object.prototype,\n\t'$ %ObjProto_toString%': Object.prototype.toString,\n\t'$ %ObjProto_valueOf%': Object.prototype.valueOf,\n\t'$ %parseFloat%': parseFloat,\n\t'$ %parseInt%': parseInt,\n\t'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,\n\t'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,\n\t'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,\n\t'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,\n\t'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,\n\t'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,\n\t'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,\n\t'$ %RangeError%': RangeError,\n\t'$ %RangeErrorPrototype%': RangeError.prototype,\n\t'$ %ReferenceError%': ReferenceError,\n\t'$ %ReferenceErrorPrototype%': ReferenceError.prototype,\n\t'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,\n\t'$ %RegExp%': RegExp,\n\t'$ %RegExpPrototype%': RegExp.prototype,\n\t'$ %Set%': typeof Set === 'undefined' ? undefined : Set,\n\t'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),\n\t'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,\n\t'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,\n\t'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,\n\t'$ %String%': String,\n\t'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,\n\t'$ %StringPrototype%': String.prototype,\n\t'$ %Symbol%': hasSymbols ? Symbol : undefined,\n\t'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,\n\t'$ %SyntaxError%': SyntaxError,\n\t'$ %SyntaxErrorPrototype%': SyntaxError.prototype,\n\t'$ %ThrowTypeError%': ThrowTypeError,\n\t'$ %TypedArray%': TypedArray,\n\t'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,\n\t'$ %TypeError%': TypeError,\n\t'$ %TypeErrorPrototype%': TypeError.prototype,\n\t'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,\n\t'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,\n\t'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,\n\t'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,\n\t'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,\n\t'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,\n\t'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,\n\t'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,\n\t'$ %URIError%': URIError,\n\t'$ %URIErrorPrototype%': URIError.prototype,\n\t'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,\n\t'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,\n\t'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,\n\t'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype\n};\n\nmodule.exports = function GetIntrinsic(name, allowMissing) {\n\tif (arguments.length > 1 && typeof allowMissing !== 'boolean') {\n\t\tthrow new TypeError('\"allowMissing\" argument must be a boolean');\n\t}\n\n\tvar key = '$ ' + name;\n\tif (!(key in INTRINSICS)) {\n\t\tthrow new SyntaxError('intrinsic ' + name + ' does not exist!');\n\t}\n\n\t// istanbul ignore if // hopefully this is impossible to test :-)\n\tif (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {\n\t\tthrow new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');\n\t}\n\treturn INTRINSICS[key];\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/GetIntrinsic.js?");

/***/ }),

/***/ "./node_modules/es-abstract/es5.js":
/*!*****************************************!*\
  !*** ./node_modules/es-abstract/es5.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ./GetIntrinsic */ \"./node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $Object = GetIntrinsic('%Object%');\nvar $TypeError = GetIntrinsic('%TypeError%');\nvar $String = GetIntrinsic('%String%');\n\nvar assertRecord = __webpack_require__(/*! ./helpers/assertRecord */ \"./node_modules/es-abstract/helpers/assertRecord.js\");\nvar $isNaN = __webpack_require__(/*! ./helpers/isNaN */ \"./node_modules/es-abstract/helpers/isNaN.js\");\nvar $isFinite = __webpack_require__(/*! ./helpers/isFinite */ \"./node_modules/es-abstract/helpers/isFinite.js\");\n\nvar sign = __webpack_require__(/*! ./helpers/sign */ \"./node_modules/es-abstract/helpers/sign.js\");\nvar mod = __webpack_require__(/*! ./helpers/mod */ \"./node_modules/es-abstract/helpers/mod.js\");\n\nvar IsCallable = __webpack_require__(/*! is-callable */ \"./node_modules/is-callable/index.js\");\nvar toPrimitive = __webpack_require__(/*! es-to-primitive/es5 */ \"./node_modules/es-to-primitive/es5.js\");\n\nvar has = __webpack_require__(/*! has */ \"./node_modules/has/src/index.js\");\n\n// https://es5.github.io/#x9\nvar ES5 = {\n\tToPrimitive: toPrimitive,\n\n\tToBoolean: function ToBoolean(value) {\n\t\treturn !!value;\n\t},\n\tToNumber: function ToNumber(value) {\n\t\treturn +value; // eslint-disable-line no-implicit-coercion\n\t},\n\tToInteger: function ToInteger(value) {\n\t\tvar number = this.ToNumber(value);\n\t\tif ($isNaN(number)) { return 0; }\n\t\tif (number === 0 || !$isFinite(number)) { return number; }\n\t\treturn sign(number) * Math.floor(Math.abs(number));\n\t},\n\tToInt32: function ToInt32(x) {\n\t\treturn this.ToNumber(x) >> 0;\n\t},\n\tToUint32: function ToUint32(x) {\n\t\treturn this.ToNumber(x) >>> 0;\n\t},\n\tToUint16: function ToUint16(value) {\n\t\tvar number = this.ToNumber(value);\n\t\tif ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }\n\t\tvar posInt = sign(number) * Math.floor(Math.abs(number));\n\t\treturn mod(posInt, 0x10000);\n\t},\n\tToString: function ToString(value) {\n\t\treturn $String(value);\n\t},\n\tToObject: function ToObject(value) {\n\t\tthis.CheckObjectCoercible(value);\n\t\treturn $Object(value);\n\t},\n\tCheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {\n\t\t/* jshint eqnull:true */\n\t\tif (value == null) {\n\t\t\tthrow new $TypeError(optMessage || 'Cannot call method on ' + value);\n\t\t}\n\t\treturn value;\n\t},\n\tIsCallable: IsCallable,\n\tSameValue: function SameValue(x, y) {\n\t\tif (x === y) { // 0 === -0, but they are not identical.\n\t\t\tif (x === 0) { return 1 / x === 1 / y; }\n\t\t\treturn true;\n\t\t}\n\t\treturn $isNaN(x) && $isNaN(y);\n\t},\n\n\t// https://www.ecma-international.org/ecma-262/5.1/#sec-8\n\tType: function Type(x) {\n\t\tif (x === null) {\n\t\t\treturn 'Null';\n\t\t}\n\t\tif (typeof x === 'undefined') {\n\t\t\treturn 'Undefined';\n\t\t}\n\t\tif (typeof x === 'function' || typeof x === 'object') {\n\t\t\treturn 'Object';\n\t\t}\n\t\tif (typeof x === 'number') {\n\t\t\treturn 'Number';\n\t\t}\n\t\tif (typeof x === 'boolean') {\n\t\t\treturn 'Boolean';\n\t\t}\n\t\tif (typeof x === 'string') {\n\t\t\treturn 'String';\n\t\t}\n\t},\n\n\t// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type\n\tIsPropertyDescriptor: function IsPropertyDescriptor(Desc) {\n\t\tif (this.Type(Desc) !== 'Object') {\n\t\t\treturn false;\n\t\t}\n\t\tvar allowed = {\n\t\t\t'[[Configurable]]': true,\n\t\t\t'[[Enumerable]]': true,\n\t\t\t'[[Get]]': true,\n\t\t\t'[[Set]]': true,\n\t\t\t'[[Value]]': true,\n\t\t\t'[[Writable]]': true\n\t\t};\n\n\t\tfor (var key in Desc) { // eslint-disable-line\n\t\t\tif (has(Desc, key) && !allowed[key]) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\tvar isData = has(Desc, '[[Value]]');\n\t\tvar IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');\n\t\tif (isData && IsAccessor) {\n\t\t\tthrow new $TypeError('Property Descriptors may not be both accessor and data descriptors');\n\t\t}\n\t\treturn true;\n\t},\n\n\t// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1\n\tIsAccessorDescriptor: function IsAccessorDescriptor(Desc) {\n\t\tif (typeof Desc === 'undefined') {\n\t\t\treturn false;\n\t\t}\n\n\t\tassertRecord(this, 'Property Descriptor', 'Desc', Desc);\n\n\t\tif (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t},\n\n\t// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2\n\tIsDataDescriptor: function IsDataDescriptor(Desc) {\n\t\tif (typeof Desc === 'undefined') {\n\t\t\treturn false;\n\t\t}\n\n\t\tassertRecord(this, 'Property Descriptor', 'Desc', Desc);\n\n\t\tif (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t},\n\n\t// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3\n\tIsGenericDescriptor: function IsGenericDescriptor(Desc) {\n\t\tif (typeof Desc === 'undefined') {\n\t\t\treturn false;\n\t\t}\n\n\t\tassertRecord(this, 'Property Descriptor', 'Desc', Desc);\n\n\t\tif (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\t},\n\n\t// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4\n\tFromPropertyDescriptor: function FromPropertyDescriptor(Desc) {\n\t\tif (typeof Desc === 'undefined') {\n\t\t\treturn Desc;\n\t\t}\n\n\t\tassertRecord(this, 'Property Descriptor', 'Desc', Desc);\n\n\t\tif (this.IsDataDescriptor(Desc)) {\n\t\t\treturn {\n\t\t\t\tvalue: Desc['[[Value]]'],\n\t\t\t\twritable: !!Desc['[[Writable]]'],\n\t\t\t\tenumerable: !!Desc['[[Enumerable]]'],\n\t\t\t\tconfigurable: !!Desc['[[Configurable]]']\n\t\t\t};\n\t\t} else if (this.IsAccessorDescriptor(Desc)) {\n\t\t\treturn {\n\t\t\t\tget: Desc['[[Get]]'],\n\t\t\t\tset: Desc['[[Set]]'],\n\t\t\t\tenumerable: !!Desc['[[Enumerable]]'],\n\t\t\t\tconfigurable: !!Desc['[[Configurable]]']\n\t\t\t};\n\t\t} else {\n\t\t\tthrow new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');\n\t\t}\n\t},\n\n\t// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5\n\tToPropertyDescriptor: function ToPropertyDescriptor(Obj) {\n\t\tif (this.Type(Obj) !== 'Object') {\n\t\t\tthrow new $TypeError('ToPropertyDescriptor requires an object');\n\t\t}\n\n\t\tvar desc = {};\n\t\tif (has(Obj, 'enumerable')) {\n\t\t\tdesc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);\n\t\t}\n\t\tif (has(Obj, 'configurable')) {\n\t\t\tdesc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);\n\t\t}\n\t\tif (has(Obj, 'value')) {\n\t\t\tdesc['[[Value]]'] = Obj.value;\n\t\t}\n\t\tif (has(Obj, 'writable')) {\n\t\t\tdesc['[[Writable]]'] = this.ToBoolean(Obj.writable);\n\t\t}\n\t\tif (has(Obj, 'get')) {\n\t\t\tvar getter = Obj.get;\n\t\t\tif (typeof getter !== 'undefined' && !this.IsCallable(getter)) {\n\t\t\t\tthrow new TypeError('getter must be a function');\n\t\t\t}\n\t\t\tdesc['[[Get]]'] = getter;\n\t\t}\n\t\tif (has(Obj, 'set')) {\n\t\t\tvar setter = Obj.set;\n\t\t\tif (typeof setter !== 'undefined' && !this.IsCallable(setter)) {\n\t\t\t\tthrow new $TypeError('setter must be a function');\n\t\t\t}\n\t\t\tdesc['[[Set]]'] = setter;\n\t\t}\n\n\t\tif ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {\n\t\t\tthrow new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');\n\t\t}\n\t\treturn desc;\n\t}\n};\n\nmodule.exports = ES5;\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/es5.js?");

/***/ }),

/***/ "./node_modules/es-abstract/helpers/assertRecord.js":
/*!**********************************************************!*\
  !*** ./node_modules/es-abstract/helpers/assertRecord.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar GetIntrinsic = __webpack_require__(/*! ../GetIntrinsic */ \"./node_modules/es-abstract/GetIntrinsic.js\");\n\nvar $TypeError = GetIntrinsic('%TypeError%');\nvar $SyntaxError = GetIntrinsic('%SyntaxError%');\n\nvar has = __webpack_require__(/*! has */ \"./node_modules/has/src/index.js\");\n\nvar predicates = {\n  // https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type\n  'Property Descriptor': function isPropertyDescriptor(ES, Desc) {\n    if (ES.Type(Desc) !== 'Object') {\n      return false;\n    }\n    var allowed = {\n      '[[Configurable]]': true,\n      '[[Enumerable]]': true,\n      '[[Get]]': true,\n      '[[Set]]': true,\n      '[[Value]]': true,\n      '[[Writable]]': true\n    };\n\n    for (var key in Desc) { // eslint-disable-line\n      if (has(Desc, key) && !allowed[key]) {\n        return false;\n      }\n    }\n\n    var isData = has(Desc, '[[Value]]');\n    var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');\n    if (isData && IsAccessor) {\n      throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');\n    }\n    return true;\n  }\n};\n\nmodule.exports = function assertRecord(ES, recordType, argumentName, value) {\n  var predicate = predicates[recordType];\n  if (typeof predicate !== 'function') {\n    throw new $SyntaxError('unknown record type: ' + recordType);\n  }\n  if (!predicate(ES, value)) {\n    throw new $TypeError(argumentName + ' must be a ' + recordType);\n  }\n  console.log(predicate(ES, value), value);\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/helpers/assertRecord.js?");

/***/ }),

/***/ "./node_modules/es-abstract/helpers/isFinite.js":
/*!******************************************************!*\
  !*** ./node_modules/es-abstract/helpers/isFinite.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var $isNaN = Number.isNaN || function (a) { return a !== a; };\n\nmodule.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/helpers/isFinite.js?");

/***/ }),

/***/ "./node_modules/es-abstract/helpers/isNaN.js":
/*!***************************************************!*\
  !*** ./node_modules/es-abstract/helpers/isNaN.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Number.isNaN || function isNaN(a) {\n\treturn a !== a;\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/helpers/isNaN.js?");

/***/ }),

/***/ "./node_modules/es-abstract/helpers/mod.js":
/*!*************************************************!*\
  !*** ./node_modules/es-abstract/helpers/mod.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function mod(number, modulo) {\n\tvar remain = number % modulo;\n\treturn Math.floor(remain >= 0 ? remain : remain + modulo);\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/helpers/mod.js?");

/***/ }),

/***/ "./node_modules/es-abstract/helpers/sign.js":
/*!**************************************************!*\
  !*** ./node_modules/es-abstract/helpers/sign.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function sign(number) {\n\treturn number >= 0 ? 1 : -1;\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-abstract/helpers/sign.js?");

/***/ }),

/***/ "./node_modules/es-to-primitive/es5.js":
/*!*********************************************!*\
  !*** ./node_modules/es-to-primitive/es5.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar toStr = Object.prototype.toString;\n\nvar isPrimitive = __webpack_require__(/*! ./helpers/isPrimitive */ \"./node_modules/es-to-primitive/helpers/isPrimitive.js\");\n\nvar isCallable = __webpack_require__(/*! is-callable */ \"./node_modules/is-callable/index.js\");\n\n// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8\nvar ES5internalSlots = {\n\t'[[DefaultValue]]': function (O) {\n\t\tvar actualHint;\n\t\tif (arguments.length > 1) {\n\t\t\tactualHint = arguments[1];\n\t\t} else {\n\t\t\tactualHint = toStr.call(O) === '[object Date]' ? String : Number;\n\t\t}\n\n\t\tif (actualHint === String || actualHint === Number) {\n\t\t\tvar methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];\n\t\t\tvar value, i;\n\t\t\tfor (i = 0; i < methods.length; ++i) {\n\t\t\t\tif (isCallable(O[methods[i]])) {\n\t\t\t\t\tvalue = O[methods[i]]();\n\t\t\t\t\tif (isPrimitive(value)) {\n\t\t\t\t\t\treturn value;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tthrow new TypeError('No default value');\n\t\t}\n\t\tthrow new TypeError('invalid [[DefaultValue]] hint supplied');\n\t}\n};\n\n// http://ecma-international.org/ecma-262/5.1/#sec-9.1\nmodule.exports = function ToPrimitive(input) {\n\tif (isPrimitive(input)) {\n\t\treturn input;\n\t}\n\tif (arguments.length > 1) {\n\t\treturn ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);\n\t}\n\treturn ES5internalSlots['[[DefaultValue]]'](input);\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-to-primitive/es5.js?");

/***/ }),

/***/ "./node_modules/es-to-primitive/helpers/isPrimitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/es-to-primitive/helpers/isPrimitive.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function isPrimitive(value) {\n\treturn value === null || (typeof value !== 'function' && typeof value !== 'object');\n};\n\n\n//# sourceURL=webpack:///./node_modules/es-to-primitive/helpers/isPrimitive.js?");

/***/ }),

/***/ "./node_modules/for-each/index.js":
/*!****************************************!*\
  !*** ./node_modules/for-each/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isCallable = __webpack_require__(/*! is-callable */ \"./node_modules/is-callable/index.js\");\n\nvar toStr = Object.prototype.toString;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\n\nvar forEachArray = function forEachArray(array, iterator, receiver) {\n    for (var i = 0, len = array.length; i < len; i++) {\n        if (hasOwnProperty.call(array, i)) {\n            if (receiver == null) {\n                iterator(array[i], i, array);\n            } else {\n                iterator.call(receiver, array[i], i, array);\n            }\n        }\n    }\n};\n\nvar forEachString = function forEachString(string, iterator, receiver) {\n    for (var i = 0, len = string.length; i < len; i++) {\n        // no such thing as a sparse string.\n        if (receiver == null) {\n            iterator(string.charAt(i), i, string);\n        } else {\n            iterator.call(receiver, string.charAt(i), i, string);\n        }\n    }\n};\n\nvar forEachObject = function forEachObject(object, iterator, receiver) {\n    for (var k in object) {\n        if (hasOwnProperty.call(object, k)) {\n            if (receiver == null) {\n                iterator(object[k], k, object);\n            } else {\n                iterator.call(receiver, object[k], k, object);\n            }\n        }\n    }\n};\n\nvar forEach = function forEach(list, iterator, thisArg) {\n    if (!isCallable(iterator)) {\n        throw new TypeError('iterator must be a function');\n    }\n\n    var receiver;\n    if (arguments.length >= 3) {\n        receiver = thisArg;\n    }\n\n    if (toStr.call(list) === '[object Array]') {\n        forEachArray(list, iterator, receiver);\n    } else if (typeof list === 'string') {\n        forEachString(list, iterator, receiver);\n    } else {\n        forEachObject(list, iterator, receiver);\n    }\n};\n\nmodule.exports = forEach;\n\n\n//# sourceURL=webpack:///./node_modules/for-each/index.js?");

/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint no-invalid-this: 1 */\n\nvar ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';\nvar slice = Array.prototype.slice;\nvar toStr = Object.prototype.toString;\nvar funcType = '[object Function]';\n\nmodule.exports = function bind(that) {\n    var target = this;\n    if (typeof target !== 'function' || toStr.call(target) !== funcType) {\n        throw new TypeError(ERROR_MESSAGE + target);\n    }\n    var args = slice.call(arguments, 1);\n\n    var bound;\n    var binder = function () {\n        if (this instanceof bound) {\n            var result = target.apply(\n                this,\n                args.concat(slice.call(arguments))\n            );\n            if (Object(result) === result) {\n                return result;\n            }\n            return this;\n        } else {\n            return target.apply(\n                that,\n                args.concat(slice.call(arguments))\n            );\n        }\n    };\n\n    var boundLength = Math.max(0, target.length - args.length);\n    var boundArgs = [];\n    for (var i = 0; i < boundLength; i++) {\n        boundArgs.push('$' + i);\n    }\n\n    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);\n\n    if (target.prototype) {\n        var Empty = function Empty() {};\n        Empty.prototype = target.prototype;\n        bound.prototype = new Empty();\n        Empty.prototype = null;\n    }\n\n    return bound;\n};\n\n\n//# sourceURL=webpack:///./node_modules/function-bind/implementation.js?");

/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/function-bind/implementation.js\");\n\nmodule.exports = Function.prototype.bind || implementation;\n\n\n//# sourceURL=webpack:///./node_modules/function-bind/index.js?");

/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\n\nmodule.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);\n\n\n//# sourceURL=webpack:///./node_modules/has/src/index.js?");

/***/ }),

/***/ "./node_modules/is-callable/index.js":
/*!*******************************************!*\
  !*** ./node_modules/is-callable/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar fnToStr = Function.prototype.toString;\n\nvar constructorRegex = /^\\s*class\\b/;\nvar isES6ClassFn = function isES6ClassFunction(value) {\n\ttry {\n\t\tvar fnStr = fnToStr.call(value);\n\t\treturn constructorRegex.test(fnStr);\n\t} catch (e) {\n\t\treturn false; // not a function\n\t}\n};\n\nvar tryFunctionObject = function tryFunctionToStr(value) {\n\ttry {\n\t\tif (isES6ClassFn(value)) { return false; }\n\t\tfnToStr.call(value);\n\t\treturn true;\n\t} catch (e) {\n\t\treturn false;\n\t}\n};\nvar toStr = Object.prototype.toString;\nvar fnClass = '[object Function]';\nvar genClass = '[object GeneratorFunction]';\nvar hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';\n\nmodule.exports = function isCallable(value) {\n\tif (!value) { return false; }\n\tif (typeof value !== 'function' && typeof value !== 'object') { return false; }\n\tif (typeof value === 'function' && !value.prototype) { return true; }\n\tif (hasToStringTag) { return tryFunctionObject(value); }\n\tif (isES6ClassFn(value)) { return false; }\n\tvar strClass = toStr.call(value);\n\treturn strClass === fnClass || strClass === genClass;\n};\n\n\n//# sourceURL=webpack:///./node_modules/is-callable/index.js?");

/***/ }),

/***/ "./node_modules/node-polyglot/index.js":
/*!*********************************************!*\
  !*** ./node_modules/node-polyglot/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("//     (c) 2012-2016 Airbnb, Inc.\n//\n//     polyglot.js may be freely distributed under the terms of the BSD\n//     license. For all licensing information, details, and documention:\n//     http://airbnb.github.com/polyglot.js\n//\n//\n// Polyglot.js is an I18n helper library written in JavaScript, made to\n// work both in the browser and in Node. It provides a simple solution for\n// interpolation and pluralization, based off of Airbnb's\n// experience adding I18n functionality to its Backbone.js and Node apps.\n//\n// Polylglot is agnostic to your translation backend. It doesn't perform any\n// translation; it simply gives you a way to manage translated phrases from\n// your client- or server-side JavaScript application.\n//\n\n\n\nvar forEach = __webpack_require__(/*! for-each */ \"./node_modules/for-each/index.js\");\nvar warning = __webpack_require__(/*! warning */ \"./node_modules/warning/warning.js\");\nvar has = __webpack_require__(/*! has */ \"./node_modules/has/src/index.js\");\nvar trim = __webpack_require__(/*! string.prototype.trim */ \"./node_modules/string.prototype.trim/index.js\");\n\nvar warn = function warn(message) {\n  warning(false, message);\n};\n\nvar replace = String.prototype.replace;\nvar split = String.prototype.split;\n\n// #### Pluralization methods\n// The string that separates the different phrase possibilities.\nvar delimiter = '||||';\n\nvar russianPluralGroups = function (n) {\n  var end = n % 10;\n  if (n !== 11 && end === 1) {\n    return 0;\n  }\n  if (2 <= end && end <= 4 && !(n >= 12 && n <= 14)) {\n    return 1;\n  }\n  return 2;\n};\n\n// Mapping from pluralization group plural logic.\nvar pluralTypes = {\n  arabic: function (n) {\n    // http://www.arabeyes.org/Plural_Forms\n    if (n < 3) { return n; }\n    var lastTwo = n % 100;\n    if (lastTwo >= 3 && lastTwo <= 10) return 3;\n    return lastTwo >= 11 ? 4 : 5;\n  },\n  bosnian_serbian: russianPluralGroups,\n  chinese: function () { return 0; },\n  croatian: russianPluralGroups,\n  french: function (n) { return n > 1 ? 1 : 0; },\n  german: function (n) { return n !== 1 ? 1 : 0; },\n  russian: russianPluralGroups,\n  lithuanian: function (n) {\n    if (n % 10 === 1 && n % 100 !== 11) { return 0; }\n    return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 1 : 2;\n  },\n  czech: function (n) {\n    if (n === 1) { return 0; }\n    return (n >= 2 && n <= 4) ? 1 : 2;\n  },\n  polish: function (n) {\n    if (n === 1) { return 0; }\n    var end = n % 10;\n    return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;\n  },\n  icelandic: function (n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; },\n  slovenian: function (n) {\n    var lastTwo = n % 100;\n    if (lastTwo === 1) {\n      return 0;\n    }\n    if (lastTwo === 2) {\n      return 1;\n    }\n    if (lastTwo === 3 || lastTwo === 4) {\n      return 2;\n    }\n    return 3;\n  }\n};\n\n\n// Mapping from pluralization group to individual language codes/locales.\n// Will look up based on exact match, if not found and it's a locale will parse the locale\n// for language code, and if that does not exist will default to 'en'\nvar pluralTypeToLanguages = {\n  arabic: ['ar'],\n  bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],\n  chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],\n  croatian: ['hr', 'hr-HR'],\n  german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],\n  french: ['fr', 'tl', 'pt-br'],\n  russian: ['ru', 'ru-RU'],\n  lithuanian: ['lt'],\n  czech: ['cs', 'cs-CZ', 'sk'],\n  polish: ['pl'],\n  icelandic: ['is'],\n  slovenian: ['sl-SL']\n};\n\nfunction langToTypeMap(mapping) {\n  var ret = {};\n  forEach(mapping, function (langs, type) {\n    forEach(langs, function (lang) {\n      ret[lang] = type;\n    });\n  });\n  return ret;\n}\n\nfunction pluralTypeName(locale) {\n  var langToPluralType = langToTypeMap(pluralTypeToLanguages);\n  return langToPluralType[locale]\n    || langToPluralType[split.call(locale, /-/, 1)[0]]\n    || langToPluralType.en;\n}\n\nfunction pluralTypeIndex(locale, count) {\n  return pluralTypes[pluralTypeName(locale)](count);\n}\n\nfunction escape(token) {\n  return token.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');\n}\n\nfunction constructTokenRegex(opts) {\n  var prefix = (opts && opts.prefix) || '%{';\n  var suffix = (opts && opts.suffix) || '}';\n\n  if (prefix === delimiter || suffix === delimiter) {\n    throw new RangeError('\"' + delimiter + '\" token is reserved for pluralization');\n  }\n\n  return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g');\n}\n\nvar dollarRegex = /\\$/g;\nvar dollarBillsYall = '$$';\nvar defaultTokenRegex = /%\\{(.*?)\\}/g;\n\n// ### transformPhrase(phrase, substitutions, locale)\n//\n// Takes a phrase string and transforms it by choosing the correct\n// plural form and interpolating it.\n//\n//     transformPhrase('Hello, %{name}!', {name: 'Spike'});\n//     // \"Hello, Spike!\"\n//\n// The correct plural form is selected if substitutions.smart_count\n// is set. You can pass in a number instead of an Object as `substitutions`\n// as a shortcut for `smart_count`.\n//\n//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');\n//     // \"1 new message\"\n//\n//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');\n//     // \"2 new messages\"\n//\n//     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');\n//     // \"5 new messages\"\n//\n// You should pass in a third argument, the locale, to specify the correct plural type.\n// It defaults to `'en'` with 2 plural forms.\nfunction transformPhrase(phrase, substitutions, locale, tokenRegex) {\n  if (typeof phrase !== 'string') {\n    throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');\n  }\n\n  if (substitutions == null) {\n    return phrase;\n  }\n\n  var result = phrase;\n  var interpolationRegex = tokenRegex || defaultTokenRegex;\n\n  // allow number as a pluralization shortcut\n  var options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions;\n\n  // Select plural form: based on a phrase text that contains `n`\n  // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,\n  // choose the correct plural form. This is only done if `count` is set.\n  if (options.smart_count != null && result) {\n    var texts = split.call(result, delimiter);\n    result = trim(texts[pluralTypeIndex(locale || 'en', options.smart_count)] || texts[0]);\n  }\n\n  // Interpolate: Creates a `RegExp` object for each interpolation placeholder.\n  result = replace.call(result, interpolationRegex, function (expression, argument) {\n    if (!has(options, argument) || options[argument] == null) { return expression; }\n    // Ensure replacement value is escaped to prevent special $-prefixed regex replace tokens.\n    return replace.call(options[argument], dollarRegex, dollarBillsYall);\n  });\n\n  return result;\n}\n\n// ### Polyglot class constructor\nfunction Polyglot(options) {\n  var opts = options || {};\n  this.phrases = {};\n  this.extend(opts.phrases || {});\n  this.currentLocale = opts.locale || 'en';\n  var allowMissing = opts.allowMissing ? transformPhrase : null;\n  this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;\n  this.warn = opts.warn || warn;\n  this.tokenRegex = constructTokenRegex(opts.interpolation);\n}\n\n// ### polyglot.locale([locale])\n//\n// Get or set locale. Internally, Polyglot only uses locale for pluralization.\nPolyglot.prototype.locale = function (newLocale) {\n  if (newLocale) this.currentLocale = newLocale;\n  return this.currentLocale;\n};\n\n// ### polyglot.extend(phrases)\n//\n// Use `extend` to tell Polyglot how to translate a given key.\n//\n//     polyglot.extend({\n//       \"hello\": \"Hello\",\n//       \"hello_name\": \"Hello, %{name}\"\n//     });\n//\n// The key can be any string.  Feel free to call `extend` multiple times;\n// it will override any phrases with the same key, but leave existing phrases\n// untouched.\n//\n// It is also possible to pass nested phrase objects, which get flattened\n// into an object with the nested keys concatenated using dot notation.\n//\n//     polyglot.extend({\n//       \"nav\": {\n//         \"hello\": \"Hello\",\n//         \"hello_name\": \"Hello, %{name}\",\n//         \"sidebar\": {\n//           \"welcome\": \"Welcome\"\n//         }\n//       }\n//     });\n//\n//     console.log(polyglot.phrases);\n//     // {\n//     //   'nav.hello': 'Hello',\n//     //   'nav.hello_name': 'Hello, %{name}',\n//     //   'nav.sidebar.welcome': 'Welcome'\n//     // }\n//\n// `extend` accepts an optional second argument, `prefix`, which can be used\n// to prefix every key in the phrases object with some string, using dot\n// notation.\n//\n//     polyglot.extend({\n//       \"hello\": \"Hello\",\n//       \"hello_name\": \"Hello, %{name}\"\n//     }, \"nav\");\n//\n//     console.log(polyglot.phrases);\n//     // {\n//     //   'nav.hello': 'Hello',\n//     //   'nav.hello_name': 'Hello, %{name}'\n//     // }\n//\n// This feature is used internally to support nested phrase objects.\nPolyglot.prototype.extend = function (morePhrases, prefix) {\n  forEach(morePhrases, function (phrase, key) {\n    var prefixedKey = prefix ? prefix + '.' + key : key;\n    if (typeof phrase === 'object') {\n      this.extend(phrase, prefixedKey);\n    } else {\n      this.phrases[prefixedKey] = phrase;\n    }\n  }, this);\n};\n\n// ### polyglot.unset(phrases)\n// Use `unset` to selectively remove keys from a polyglot instance.\n//\n//     polyglot.unset(\"some_key\");\n//     polyglot.unset({\n//       \"hello\": \"Hello\",\n//       \"hello_name\": \"Hello, %{name}\"\n//     });\n//\n// The unset method can take either a string (for the key), or an object hash with\n// the keys that you would like to unset.\nPolyglot.prototype.unset = function (morePhrases, prefix) {\n  if (typeof morePhrases === 'string') {\n    delete this.phrases[morePhrases];\n  } else {\n    forEach(morePhrases, function (phrase, key) {\n      var prefixedKey = prefix ? prefix + '.' + key : key;\n      if (typeof phrase === 'object') {\n        this.unset(phrase, prefixedKey);\n      } else {\n        delete this.phrases[prefixedKey];\n      }\n    }, this);\n  }\n};\n\n// ### polyglot.clear()\n//\n// Clears all phrases. Useful for special cases, such as freeing\n// up memory if you have lots of phrases but no longer need to\n// perform any translation. Also used internally by `replace`.\nPolyglot.prototype.clear = function () {\n  this.phrases = {};\n};\n\n// ### polyglot.replace(phrases)\n//\n// Completely replace the existing phrases with a new set of phrases.\n// Normally, just use `extend` to add more phrases, but under certain\n// circumstances, you may want to make sure no old phrases are lying around.\nPolyglot.prototype.replace = function (newPhrases) {\n  this.clear();\n  this.extend(newPhrases);\n};\n\n\n// ### polyglot.t(key, options)\n//\n// The most-used method. Provide a key, and `t` will return the\n// phrase.\n//\n//     polyglot.t(\"hello\");\n//     => \"Hello\"\n//\n// The phrase value is provided first by a call to `polyglot.extend()` or\n// `polyglot.replace()`.\n//\n// Pass in an object as the second argument to perform interpolation.\n//\n//     polyglot.t(\"hello_name\", {name: \"Spike\"});\n//     => \"Hello, Spike\"\n//\n// If you like, you can provide a default value in case the phrase is missing.\n// Use the special option key \"_\" to specify a default.\n//\n//     polyglot.t(\"i_like_to_write_in_language\", {\n//       _: \"I like to write in %{language}.\",\n//       language: \"JavaScript\"\n//     });\n//     => \"I like to write in JavaScript.\"\n//\nPolyglot.prototype.t = function (key, options) {\n  var phrase, result;\n  var opts = options == null ? {} : options;\n  if (typeof this.phrases[key] === 'string') {\n    phrase = this.phrases[key];\n  } else if (typeof opts._ === 'string') {\n    phrase = opts._;\n  } else if (this.onMissingKey) {\n    var onMissingKey = this.onMissingKey;\n    result = onMissingKey(key, opts, this.currentLocale, this.tokenRegex);\n  } else {\n    this.warn('Missing translation for key: \"' + key + '\"');\n    result = key;\n  }\n  if (typeof phrase === 'string') {\n    result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex);\n  }\n  return result;\n};\n\n\n// ### polyglot.has(key)\n//\n// Check if polyglot has a translation for given key\nPolyglot.prototype.has = function (key) {\n  return has(this.phrases, key);\n};\n\n// export transformPhrase\nPolyglot.transformPhrase = function transform(phrase, substitutions, locale) {\n  return transformPhrase(phrase, substitutions, locale);\n};\n\nmodule.exports = Polyglot;\n\n\n//# sourceURL=webpack:///./node_modules/node-polyglot/index.js?");

/***/ }),

/***/ "./node_modules/object-keys/implementation.js":
/*!****************************************************!*\
  !*** ./node_modules/object-keys/implementation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar keysShim;\nif (!Object.keys) {\n\t// modified from https://github.com/es-shims/es5-shim\n\tvar has = Object.prototype.hasOwnProperty;\n\tvar toStr = Object.prototype.toString;\n\tvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/object-keys/isArguments.js\"); // eslint-disable-line global-require\n\tvar isEnumerable = Object.prototype.propertyIsEnumerable;\n\tvar hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');\n\tvar hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');\n\tvar dontEnums = [\n\t\t'toString',\n\t\t'toLocaleString',\n\t\t'valueOf',\n\t\t'hasOwnProperty',\n\t\t'isPrototypeOf',\n\t\t'propertyIsEnumerable',\n\t\t'constructor'\n\t];\n\tvar equalsConstructorPrototype = function (o) {\n\t\tvar ctor = o.constructor;\n\t\treturn ctor && ctor.prototype === o;\n\t};\n\tvar excludedKeys = {\n\t\t$applicationCache: true,\n\t\t$console: true,\n\t\t$external: true,\n\t\t$frame: true,\n\t\t$frameElement: true,\n\t\t$frames: true,\n\t\t$innerHeight: true,\n\t\t$innerWidth: true,\n\t\t$onmozfullscreenchange: true,\n\t\t$onmozfullscreenerror: true,\n\t\t$outerHeight: true,\n\t\t$outerWidth: true,\n\t\t$pageXOffset: true,\n\t\t$pageYOffset: true,\n\t\t$parent: true,\n\t\t$scrollLeft: true,\n\t\t$scrollTop: true,\n\t\t$scrollX: true,\n\t\t$scrollY: true,\n\t\t$self: true,\n\t\t$webkitIndexedDB: true,\n\t\t$webkitStorageInfo: true,\n\t\t$window: true\n\t};\n\tvar hasAutomationEqualityBug = (function () {\n\t\t/* global window */\n\t\tif (typeof window === 'undefined') { return false; }\n\t\tfor (var k in window) {\n\t\t\ttry {\n\t\t\t\tif (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tequalsConstructorPrototype(window[k]);\n\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\treturn true;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t} catch (e) {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t}\n\t\treturn false;\n\t}());\n\tvar equalsConstructorPrototypeIfNotBuggy = function (o) {\n\t\t/* global window */\n\t\tif (typeof window === 'undefined' || !hasAutomationEqualityBug) {\n\t\t\treturn equalsConstructorPrototype(o);\n\t\t}\n\t\ttry {\n\t\t\treturn equalsConstructorPrototype(o);\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t};\n\n\tkeysShim = function keys(object) {\n\t\tvar isObject = object !== null && typeof object === 'object';\n\t\tvar isFunction = toStr.call(object) === '[object Function]';\n\t\tvar isArguments = isArgs(object);\n\t\tvar isString = isObject && toStr.call(object) === '[object String]';\n\t\tvar theKeys = [];\n\n\t\tif (!isObject && !isFunction && !isArguments) {\n\t\t\tthrow new TypeError('Object.keys called on a non-object');\n\t\t}\n\n\t\tvar skipProto = hasProtoEnumBug && isFunction;\n\t\tif (isString && object.length > 0 && !has.call(object, 0)) {\n\t\t\tfor (var i = 0; i < object.length; ++i) {\n\t\t\t\ttheKeys.push(String(i));\n\t\t\t}\n\t\t}\n\n\t\tif (isArguments && object.length > 0) {\n\t\t\tfor (var j = 0; j < object.length; ++j) {\n\t\t\t\ttheKeys.push(String(j));\n\t\t\t}\n\t\t} else {\n\t\t\tfor (var name in object) {\n\t\t\t\tif (!(skipProto && name === 'prototype') && has.call(object, name)) {\n\t\t\t\t\ttheKeys.push(String(name));\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (hasDontEnumBug) {\n\t\t\tvar skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);\n\n\t\t\tfor (var k = 0; k < dontEnums.length; ++k) {\n\t\t\t\tif (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {\n\t\t\t\t\ttheKeys.push(dontEnums[k]);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\treturn theKeys;\n\t};\n}\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack:///./node_modules/object-keys/implementation.js?");

/***/ }),

/***/ "./node_modules/object-keys/index.js":
/*!*******************************************!*\
  !*** ./node_modules/object-keys/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar slice = Array.prototype.slice;\nvar isArgs = __webpack_require__(/*! ./isArguments */ \"./node_modules/object-keys/isArguments.js\");\n\nvar origKeys = Object.keys;\nvar keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(/*! ./implementation */ \"./node_modules/object-keys/implementation.js\");\n\nvar originalKeys = Object.keys;\n\nkeysShim.shim = function shimObjectKeys() {\n\tif (Object.keys) {\n\t\tvar keysWorksWithArguments = (function () {\n\t\t\t// Safari 5.0 bug\n\t\t\tvar args = Object.keys(arguments);\n\t\t\treturn args && args.length === arguments.length;\n\t\t}(1, 2));\n\t\tif (!keysWorksWithArguments) {\n\t\t\tObject.keys = function keys(object) { // eslint-disable-line func-name-matching\n\t\t\t\tif (isArgs(object)) {\n\t\t\t\t\treturn originalKeys(slice.call(object));\n\t\t\t\t}\n\t\t\t\treturn originalKeys(object);\n\t\t\t};\n\t\t}\n\t} else {\n\t\tObject.keys = keysShim;\n\t}\n\treturn Object.keys || keysShim;\n};\n\nmodule.exports = keysShim;\n\n\n//# sourceURL=webpack:///./node_modules/object-keys/index.js?");

/***/ }),

/***/ "./node_modules/object-keys/isArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/object-keys/isArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar toStr = Object.prototype.toString;\n\nmodule.exports = function isArguments(value) {\n\tvar str = toStr.call(value);\n\tvar isArgs = str === '[object Arguments]';\n\tif (!isArgs) {\n\t\tisArgs = str !== '[object Array]' &&\n\t\t\tvalue !== null &&\n\t\t\ttypeof value === 'object' &&\n\t\t\ttypeof value.length === 'number' &&\n\t\t\tvalue.length >= 0 &&\n\t\t\ttoStr.call(value.callee) === '[object Function]';\n\t}\n\treturn isArgs;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-keys/isArguments.js?");

/***/ }),

/***/ "./node_modules/string.prototype.trim/implementation.js":
/*!**************************************************************!*\
  !*** ./node_modules/string.prototype.trim/implementation.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar ES = __webpack_require__(/*! es-abstract/es5 */ \"./node_modules/es-abstract/es5.js\");\nvar replace = bind.call(Function.call, String.prototype.replace);\n\nvar leftWhitespace = /^[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+/;\nvar rightWhitespace = /[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]+$/;\n\nmodule.exports = function trim() {\n\tvar S = ES.ToString(ES.CheckObjectCoercible(this));\n\treturn replace(replace(S, leftWhitespace, ''), rightWhitespace, '');\n};\n\n\n//# sourceURL=webpack:///./node_modules/string.prototype.trim/implementation.js?");

/***/ }),

/***/ "./node_modules/string.prototype.trim/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/string.prototype.trim/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! function-bind */ \"./node_modules/function-bind/index.js\");\nvar define = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/string.prototype.trim/implementation.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/string.prototype.trim/polyfill.js\");\nvar shim = __webpack_require__(/*! ./shim */ \"./node_modules/string.prototype.trim/shim.js\");\n\nvar boundTrim = bind.call(Function.call, getPolyfill());\n\ndefine(boundTrim, {\n\tgetPolyfill: getPolyfill,\n\timplementation: implementation,\n\tshim: shim\n});\n\nmodule.exports = boundTrim;\n\n\n//# sourceURL=webpack:///./node_modules/string.prototype.trim/index.js?");

/***/ }),

/***/ "./node_modules/string.prototype.trim/polyfill.js":
/*!********************************************************!*\
  !*** ./node_modules/string.prototype.trim/polyfill.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/string.prototype.trim/implementation.js\");\n\nvar zeroWidthSpace = '\\u200b';\n\nmodule.exports = function getPolyfill() {\n\tif (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {\n\t\treturn String.prototype.trim;\n\t}\n\treturn implementation;\n};\n\n\n//# sourceURL=webpack:///./node_modules/string.prototype.trim/polyfill.js?");

/***/ }),

/***/ "./node_modules/string.prototype.trim/shim.js":
/*!****************************************************!*\
  !*** ./node_modules/string.prototype.trim/shim.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar define = __webpack_require__(/*! define-properties */ \"./node_modules/define-properties/index.js\");\nvar getPolyfill = __webpack_require__(/*! ./polyfill */ \"./node_modules/string.prototype.trim/polyfill.js\");\n\nmodule.exports = function shimStringTrim() {\n\tvar polyfill = getPolyfill();\n\tdefine(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });\n\treturn polyfill;\n};\n\n\n//# sourceURL=webpack:///./node_modules/string.prototype.trim/shim.js?");

/***/ }),

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar __DEV__ = \"development\" !== 'production';\n\nvar warning = function() {};\n\nif (__DEV__) {\n  var printWarning = function printWarning(format, args) {\n    var len = arguments.length;\n    args = new Array(len > 1 ? len - 1 : 0);\n    for (var key = 1; key < len; key++) {\n      args[key - 1] = arguments[key];\n    }\n    var argIndex = 0;\n    var message = 'Warning: ' +\n      format.replace(/%s/g, function() {\n        return args[argIndex++];\n      });\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  }\n\n  warning = function(condition, format, args) {\n    var len = arguments.length;\n    args = new Array(len > 2 ? len - 2 : 0);\n    for (var key = 2; key < len; key++) {\n      args[key - 2] = arguments[key];\n    }\n    if (format === undefined) {\n      throw new Error(\n          '`warning(condition, format, ...args)` requires a warning ' +\n          'message argument'\n      );\n    }\n    if (!condition) {\n      printWarning.apply(null, [format].concat(args));\n    }\n  };\n}\n\nmodule.exports = warning;\n\n\n//# sourceURL=webpack:///./node_modules/warning/warning.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-polyglot */ \"./node_modules/node-polyglot/index.js\");\n/* harmony import */ var node_polyglot__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_polyglot__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass TranslationApp {\n  constructor() {\n    this.polyglot = new node_polyglot__WEBPACK_IMPORTED_MODULE_0___default.a();\n  }\n\n  setup() {\n    /* \n      現在のLocaleに合わせて、polyglotにメッセージをセットします。\n      メッセージのセットにはpolyglot.extend()を利用します。\n    */\n  }\n\n  updateLocale(e) {\n    /*\n      ボタンにセットされたdata-localeを元に現在のlocaleを変更します。\n    */\n  }\n\n  showMessage() {\n    /*\n      mainというidがセットされた要素の下にh1タグで現在のlocaleに応じて、メッセージを表示します。 \n    */\n  }\n\n}\n\n\n{\n  const button1 = document.getElementById('button1');\n  button1.addEventListener(\"click\", app.updateLocale);\n  \n  const button2 = document.getElementById('button2');\n  button2.addEventListener(\"click\", app.updateLocale);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });