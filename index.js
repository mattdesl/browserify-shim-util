// Small utility to add shims and external libs for our browserify build
var Libs = new (function() {
	this.shims = {};
	this.paths = [];
	this.aliases = [];
	this.externals = [];

	this.addShims = function(array) {
		for (var i=0; i<array.length; i++) {
			var params = array[i];

			this.shims[params.alias] = {
				path: params.path, exports: (params.exports || null), depends: (params.depends || null)
			};
			this.paths.push(params.path);

			if (params.exports) {
				this.aliases.push(params.path + ':' + params.alias);
				this.externals.push(params.path);
			}
		}
	};
})();

exports = module.exports = Libs;