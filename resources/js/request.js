/* =====================================================================================================
REQUEST
======================================================================================================== */
let request = function () {
    // ===== Exported Functions =====
    /* PHP Request =====================================================================================
       Description: Initiates POST request to request.php for relevant API. Returns a completed promise. */
    async function phpRequest(request = "null", data = {}) {

        const functionName = "request.phpRequest()";

        debug_log(`${functionName}: ${request} request initiated`);
 
        data['request'] = request;
    
        let sendData = {data: data};

        return new Promise(function (resolve, reject) {

            $.ajax({
                url: `resources/php/routines/${request}.php`,
                type: 'POST',
                dataType: 'json',
                data: sendData
            })
            .done(function(result) {

                result['data']['timeOfCreation'] = moment().unix();

                debug_log(result);
                resolve(result);
        
            })
            .fail(function(jqXHR, textStatus, errorThrown) {

                debug_log(jqXHR);

                let rejectObject = {
                    errorCode: jqXHR['status'],
                    errorMessage: jqXHR['statusText']
                }

                reject(rejectObject);
                
            });

        });
    
    }

    // ===== Exports =====
    return {

        phpRequest: phpRequest

    }

}();