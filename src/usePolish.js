import { useLayoutEffect } from 'react';
import gsap from 'gsap';

// Keep decorative motion local, reversible, and disabled for reduced motion.
export function usePolish(root, selected) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray('.service-art, .craft-visual').forEach((panel) => {
          gsap.fromTo(panel, { clipPath: 'inset(0 0 100% 0)' }, {
            clipPath: 'inset(0 0 0% 0)', duration: 1.15, ease: 'power3.inOut',
            scrollTrigger: { trigger: panel, start: 'top 94%', once: true },
            onComplete: () => gsap.set(panel, { clearProps: 'clipPath' }),
          });
        });
        gsap.utils.toArray('.intro-seal, .contact-circle').forEach((element) => {
          gsap.from(element, {
            opacity: 0, scale: .86, rotation: -7, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
          });
        });
        gsap.utils.toArray('.intro-top, .section-heading, .gallery-heading').forEach((heading) => {
          gsap.fromTo(heading, { '--accent-width': '0px' }, {
            '--accent-width': '42px', duration: 1.2, ease: 'power2.inOut',
            scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
          });
        });
      }, root);
      return () => context.revert();
    });

    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const removeListeners = [];
      const context = gsap.context((ctx) => {
        const listen = (element, event, callback) => {
          element.addEventListener(event, callback);
          removeListeners.push(() => element.removeEventListener(event, callback));
        };
        gsap.utils.toArray('.service-item').forEach((card) => {
          const art = card.querySelector('.service-art');
          const rotateX = gsap.quickTo(art, 'rotationX', { duration: .65, ease: 'power3.out' });
          const rotateY = gsap.quickTo(art, 'rotationY', { duration: .65, ease: 'power3.out' });
          gsap.set(art, { transformPerspective: 900, transformOrigin: 'center center' });
          listen(card, 'pointermove', (event) => {
            const rect = card.getBoundingClientRect();
            rotateX(-(event.clientY - rect.top - rect.height / 2) / rect.height * 5);
            rotateY((event.clientX - rect.left - rect.width / 2) / rect.width * 7);
          });
          listen(card, 'pointerleave', () => { rotateX(0); rotateY(0); });
        });
        gsap.utils.toArray('.solid-button, .text-link, .header-contact, .contact-circle').forEach((link) => {
          const arrow = link.querySelector('svg');
          if (!arrow) return;
          const enter = ctx.add(() => gsap.to(arrow, { x: 4, y: -4, duration: .35, ease: 'power2.out', overwrite: true }));
          const leave = ctx.add(() => gsap.to(arrow, { x: 0, y: 0, duration: .55, ease: 'power3.out', overwrite: true }));
          listen(link, 'pointerenter', enter);
          listen(link, 'pointerleave', leave);
          listen(link, 'focus', enter);
          listen(link, 'blur', leave);
        });
        gsap.utils.toArray('.work').forEach((work) => {
          const affordance = work.querySelector('.work-expand');
          const enter = ctx.add(() => gsap.to(affordance, { rotation: 90, scale: 1.08, duration: .45, ease: 'power2.out', overwrite: true }));
          const leave = ctx.add(() => gsap.to(affordance, { rotation: 0, scale: 1, duration: .6, ease: 'power3.out', overwrite: true }));
          listen(work, 'pointerenter', enter);
          listen(work, 'pointerleave', leave);
          listen(work, 'focus', enter);
          listen(work, 'blur', leave);
        });
      }, root);
      return () => { removeListeners.forEach((remove) => remove()); context.revert(); };
    });
    return () => media.revert();
  }, [root]);

  useLayoutEffect(() => {
    if (!selected) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.fromTo('.detail-dialog', { opacity: 0, y: 24, scale: .97 }, {
          opacity: 1, y: 0, scale: 1, duration: .45, ease: 'power3.out', clearProps: 'transform,opacity',
        });
        gsap.from('.dialog-content > *', { y: 13, opacity: 0, duration: .5, stagger: .055, delay: .12, ease: 'power2.out' });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, [root, selected]);
}
