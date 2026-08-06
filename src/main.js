import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";

import "./styles/global.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/services.css";
import "./styles/footer.css";
import "./styles/pricing.css";
import "./styles/whychoose.css";
import "./styles/testimonials.css";
import "./styles/contact.css";
import "./styles/floatingWhatsapp.css";
import "./styles/scrollTop.css";
import "./styles/cta.css";
import "./styles/faq.css";
import "./styles/serviceAreas.css";
import "./styles/map.css";
import "./styles/stats.css";
import "./styles/mobileBar.css";
import "./styles/theme.css";
import "./styles/reviewModal.css";
import "./styles/successModal.css";

import { navbar } from "./components/navbar";
import { hero } from "./components/hero";
import { services } from "./components/services";
import { pricing } from "./components/pricing";
import { whychoose } from "./components/whychoose";
import { testimonials } from "./components/testimonials";
import { initSwiper } from "./components/swiper";
import { footer } from "./components/footer";
import { contact } from "./components/contact";
import { initContactForm } from "./components/contactForm";
import { floatingWhatsapp } from "./components/floatingWhatsapp";
import { initNavbar } from "./components/navbarController";
import {scrollTopButton,initScrollTop} from "./components/scrollTop";
import { cta } from "./components/cta";
import { faq } from "./components/faq";
import { initFaq } from "./components/faqController";
import { serviceAreas } from "./components/serviceAreas";
import { mapSection } from "./components/map";
import { stats } from "./components/stats";
import { initStats } from "./components/statsController";
import { mobileBar } from "./components/mobileBar";
import { initTheme } from "./components/themeController";
import { loadLiveTestimonials } from "./components/liveTestimonials";
import { reviewModal } from "./components/reviewModal";
import { initReviewModal } from "./components/reviewController";
import { initReviewForm } from "./components/reviewForm";
import "@fortawesome/fontawesome-free/css/all.min.css";

async function initApp() {

document.querySelector("#app").innerHTML = `
${navbar()}
${hero()}
${stats()}
${services()}
${pricing()}
${whychoose()}
${testimonials()}
${cta()}
${faq()}
${serviceAreas()}
${mapSection()}
${contact()}
${footer()}
${floatingWhatsapp()}
${mobileBar()}
${scrollTopButton()}
${reviewModal()}
`;

await loadLiveTestimonials();
initSwiper();
initContactForm();
initScrollTop();
initNavbar();
initTheme();
initFaq();
initStats();
initReviewModal();
initReviewForm();

AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: "ease-out-cubic"
});

}

initApp();