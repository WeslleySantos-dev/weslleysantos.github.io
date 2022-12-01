class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);

        this.activeClass = 'active'
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

        this.navList.classList.add(this.activeClass);
    }

    addClickEvent() {
        console.log(this);
        this.mobileMenu.addEventListener("click", this.handleClick);
    }
    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}
const mobile = new MobileNavbar(
    '.mobile-menu',
    '.buttonstop ul',
    '.buttonstop li',

);
mobile.init();