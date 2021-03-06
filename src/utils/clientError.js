
//Any errors returned by GraphQL should be "display" errors i.e. they should
//be displayable to the client user, this means that they should not be
//technical errors but short and concise like: "Internal Server Error" or "Incorrect password" etc.
//
//Error handling will make a distinction between "client-oriented" errors and internal server errors.
//Client-oriented errors will be represented by instances of the ClientError class.
//

export default class ClientError {
  constructor(message) {
    this.name = 'ClientError';
    this.message = message;
    Error.captureStackTrace(this, ClientError);
  }
}

ClientError.prototype = Object.create(Error.prototype);
