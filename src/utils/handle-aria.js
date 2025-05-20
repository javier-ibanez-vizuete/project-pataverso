const navMobile = document.getElementById("mobile-navigator");
const navDesktop = document.getElementById("desktop-navigator");

const showDesktopNav = () => {
	navMobile.setAttribute("aria-hidden", "true");
	navDesktop.setAttribute("aria-hidden", "false");
};

const showMobileNav = () => {
    navMobile.setAttribute("aria-hidden", "false");
    navDesktop.setAttribute("aria-hidden", "true");
}

export const handleNavViews = () => {
    if (window.innerWidth >= 1024) {
        showDesktopNav();
    }
    if (window.innerWidth <1024) {
        showMobileNav();
    }
};