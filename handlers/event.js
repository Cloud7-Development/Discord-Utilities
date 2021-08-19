const { glob } = require('glob');
const { promisify } = require('util');
const promise = promisify(glob);

module.exports = async(client) => {
    /**
     * Using glob to read our event files
     * - {process.cwd} for "current working directory"
     * - 'events': events folder
     * - *.js : any file that ends with ".js"
     */
    const Events = await promise(`${process.cwd}/events/*.js`);
    Events.map((event) => require(event));
}