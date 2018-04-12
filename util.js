exports.success = function (data, message, token) {
    var result = {
      error: false,
      data: data,
      message: message || ""
    };
    if (token) {
      result['token'] = token;
    }
    return result;
  }