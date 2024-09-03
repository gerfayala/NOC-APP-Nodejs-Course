import { Server } from "./presentation/server";





// anonymous async function
(async () => {
    main();

})();


function main() {
    Server.start();
}