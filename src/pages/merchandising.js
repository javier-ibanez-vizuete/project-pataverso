import { linksInteraction, openMobileNav } from "../helpers/buttons_nav.js";
import { imageFixer } from "../utils/image_fixer.js"

document.addEventListener("DOMContentLoaded", () => {
    imageFixer()

    openMobileNav();
    linksInteraction();
})