/**
 * Created by efrem on 08.04.15.
 */

export class ErrorRedirect extends Error {
    constructor(message) {
        if( !message ){
            throw new Error(`Redirect path isn't defined`);
        }
        super(message);
        this.name = 'ErrorRedirect';
        this.message = message;
    }
}

