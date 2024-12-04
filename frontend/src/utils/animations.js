import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function () {
 gsap.registerPlugin(ScrollTrigger);
 gsap.fromTo(
  "#home--hero-title",
  { opacity: 0, y: -100 },
  { opacity: 1, y: 0, delay: 0.2 }
 );
 gsap.fromTo(
  "#home--hero-desc",
  { opacity: 0, y: -70 },
  { opacity: 1, y: 0, delay: 0.4 }
 );
 gsap.fromTo(
  "#home--hero-box",
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0, delay: 0.6 }
 );

 gsap.fromTo(
  "#home--donation",
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0 }
 );
 gsap.fromTo(
  "#home--donation-type-group",
  { opacity: 0, y: 80 },
  { opacity: 1, y: 0 }
 );
}
