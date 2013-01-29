.factory('http', function($http , $q , $rootScope , $cacheFactory) {

  var http = {}
  http.endpoint = 'https://lydian.indabamusic.com'

  // get
  http.get = function(url, config) {
    url = http.endpoint + url;

    config = (config || {})
    if (http.token) {
      config.params = (config.params || {})
      config.params.access_token = (config.params.access_token || http.token)
    }

    return $http.get(url, config).then(onSuccess)

    function onSuccess(resp) {
      if (resp.status !== 200 || !resp.data.status || resp.data.status !== 'success') {
        throw new Error(resp.status)
      }
      return resp.data.data
    }

  }


  // post
  http.post = function(url, dataObject, config) {
    url = http.endpoint + url
    dataObject = (dataObject || {})

    config = (config || {})
    if (http.token) {
      config.params = (config.params || {})
      config.params.access_token = (config.params.access_token || http.token)
    }

    return $http.post(url, dataObject, config).then(onSuccess)

    function onSuccess(resp) {
      if (resp.status !== 200) throw new Error(resp.status)
      if (resp.data.status !== 'success') throw new Error(resp.status)
      return resp.data.data;
    }
  }


  return http


})
