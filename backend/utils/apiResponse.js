class apiResponse {
    constructor(statusCode, data, message ="success") {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.success = statusCode < 400
    }
  }
  
  export {apiResponse}

  //When you send a response from your API, you can create an instance of apiResponse to ensure all responses have a consistent structure.