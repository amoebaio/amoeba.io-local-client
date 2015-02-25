LocalClient = function(service) {
    this.service = service;
};
/**
 * Main point
 * @param  {String}   serviceName
 * @param  {String}   method      [description]
 * @param  {Object}   data        [description]
 * @param  {Function} callback    [description]
 * @return
 */
LocalClient.prototype.invoke = function(serviceName, method, data, callback) {
	if(this.service[method]){
		this.service[method].apply(this.service, [data, callback]);
	}else{
		throw new Error("Service '"+serviceName+"' has no method '"+method+"'");
	}
};

module.exports = exports = LocalClient;
