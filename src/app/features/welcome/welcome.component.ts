import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import {} from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  animations: [
    // Animation triggers go here
  ],
})
export class WelcomeComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
      this.animate();
    }, 5);
  }

  animate() {
    const getTrigger = (trigger: String, scrub: any =false, start = 'top 65%', end = 'bottom 20%') => {
      return {
        trigger: trigger,
        start: start,
        end: end,
        markers: false,
        scrub: scrub,
        // toggleActions: 'restart none none reverse',
        toggleActions: 'play none none none',
      };
    };

    // Header
    // gsap.from('.w-header', {y: -80, duration: .8, delay: .2, ease: 'bounce.out'});

    // Section 1
    gsap.from('.w-section-1-container', {yPercent: 10,duration: 2,opacity: 0,ease: 'expo',});

    // Section 2
    gsap.from('.w-section-2-img-container', {yPercent: 20,delay: 0.3,duration: 2,opacity: 0,ease: 'expo',});
    gsap.from('.w-section-2-background', {delay: 1.3,duration: 1.5,opacity: 0,ease: 'ease',});

    // Section 3
    gsap.from('.section-3-gradient-grey-card', {scrollTrigger: getTrigger('.section-3-gradient-grey-card'),xPercent: -5,duration: 0.4,opacity: 0,ease: 'power1.out',});
    gsap.from('.cn-1', {scrollTrigger: getTrigger('.section-3-gradient-grey-card'), delay: .4, xPercent: -2,duration: 0.2,opacity: 0,ease: 'power1.out',});
    gsap.from('.cn-2', {scrollTrigger: getTrigger('.section-3-gradient-grey-card'), delay: .55, xPercent: -2,duration: 0.2,opacity: 0,ease: 'power1.out',});
    gsap.from('.cn-3', {scrollTrigger: getTrigger('.section-3-gradient-grey-card'), delay: .7, xPercent: -2,duration: 0.2,opacity: 0,ease: 'power1.out',});
    gsap.from('.w-section-3-right', {scrollTrigger: getTrigger('.section-3-gradient-grey-card'), delay: .2, xPercent: -2,duration: 0.4,opacity: 0,ease: 'power1.out',});

    // Section 4
    gsap.from('.w-section-4-container .main-text-2, .w-section-4-container .sub-text-3 ', {scrollTrigger: getTrigger('.w-section-4-container'),xPercent: -5,duration: 0.4,opacity: 0,ease: 'power1.out',});
    gsap.from('.section-4-gradient-grey-card', {scrollTrigger: getTrigger('.w-section-4-container'),xPercent: -5, delay: .2, duration: 0.4,opacity: 0,ease: 'power1.out',});
    gsap.from('.w-section-4-img-container-right', {scrollTrigger: getTrigger('.w-section-4-container'), delay: .55, xPercent: -2,duration: 0.2,opacity: 0,ease: 'power1.out',});

    // Section 5
    gsap.from('.phone-svg-container', {scrollTrigger: getTrigger('.w-section-5-container', 2, '-=100 100%', 'bottom 70%'),yPercent: 50,duration: .2,ease: 'ease',});
    gsap.from('.w-section-5-text-container', {scrollTrigger: getTrigger('.card-gradient-blue'), xPercent: -2,duration: .4,opacity: 0,ease: 'expo',});

    // Section 6
    gsap.from('.w-section-6-container-left', {scrollTrigger: getTrigger('.w-section-6-container-left'), delay: .2, yPercent: -5,duration: 0.4,opacity: 0,ease: 'power1.out',});
    gsap.from('.w-section-6-container-right', {scrollTrigger: getTrigger('.w-section-6-container-left'), delay: .2, xPercent: -2,duration: 0.2,opacity: 0,ease: 'expo',});

  }
}
