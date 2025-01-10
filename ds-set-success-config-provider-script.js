//Create Set Success Messages in AuthN JSON Response
//Uses Scripting v1 as Next-Gen not yet supported for this node type

/**
 * Script configuration
*/
var config = {
    /**
     * @property {string} sampleAPI - Sample API endpoint
     * 
     */
    sampleAPI: "https://openam-XXX/monitoring/health",
    nodeName: "***set-success-details-node"
};

/**
 * Add the node info prefix to a log message
 * @param {string} message - the message body
 * @returns a tagged version of the message
 */
function tag(message) {
    return "***".concat(config.nodeName).concat(": ").concat(message);
}

logger.error(tag("Starting Set Success Detail Config Provider Script"));

var request = new org.forgerock.http.protocol.Request();
request.setUri(config.sampleAPI);
request.setMethod("GET");
var response = httpClient.send(request).get();

//Use this for string responses
//var apiResponse = response.getEntity().getJson();

//Use this for JSON responses
var apiResponse = response.getEntity().getString();
logger.error(tag("Response from: " + config.sampleAPI + ": " + apiResponse));

config = {
    "name": "Set Success Details",
    "successDetails":{"staticValue":"static_value","dynamicValueFromAPI":apiResponse},
    "sessionProperties":{"universalIdSessionProperty":"sun.am.UniversalIdentifier","AuthLevelSessionProperty":"AuthLevel"}
};