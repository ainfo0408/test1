// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. 헤더 스크롤 효과 (배경 투명도 변경 및 그림자)
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. 스크롤 인터랙션 (페이드 인 & 숫자 카운팅)
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 숫자 카운팅 애니메이션 실행 (한 번만 실행되도록)
                if(entry.target.classList.contains('about-stats')) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const speed = 200; // 카운팅 속도 조절용
                        
                        const updateCount = () => {
                            const count = +counter.innerText;
                            const inc = target / speed;
                            
                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 15);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    // 통계 섹션 애니메이션은 한 번만 실행하고 관찰 종료
                    observer.unobserve(entry.target);
                }
            }
        });
    }, scrollObserverOptions);

    // .fade-in 클래스가 있는 모든 요소를 관찰
    document.querySelectorAll('.fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. 네비게이션 스무스 스크롤 (조금 더 정확한 오프셋 적용을 위해)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. 컨택트 폼 데모 액션
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // 전송 버튼 텍스트 변경 애니메이션 효과
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = '전송 중...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                alert('메시지가 성공적으로 전송되었습니다! (이것은 데모 환경입니다)');
                btn.innerText = originalText;
                btn.style.opacity = '1';
                e.target.reset();
            }, 1000);
        });
    }
});
