$(document).ready(function() {
    // 스크롤 애니메이션
    function checkScroll() {
        $('section').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            } else {
                $(this).removeClass('visible');
            }
        });
    }

    // 최초 로드 시 지연 실행으로 초기화
    setTimeout(checkScroll, 100);

    $(window).on('scroll resize', checkScroll);

    // 네비게이션 스크롤 효과
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // 부드러운 스크롤
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // 포트폴리오 필터
    $('.category-btn').click(function() {
        const category = $(this).data('category');
        
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        
        if (category === 'all') {
            $('.portfolio-item').fadeIn(300);
        } else {
            $('.portfolio-item').fadeOut(300);
            $(`.portfolio-item[data-category="${category}"]`).fadeIn(300);
        }
    });

    // 포트폴리오 모달
    $('.portfolio-item').click(function() {
        const title = $(this).find('h3').text();
        const pdfUrl = $(this).data('pdf');   // pdf 미리보기용
        const linkUrl = $(this).data('link'); // 홈페이지 새창용

        // 묭미 프로젝트만 새 창(탭) 열기
        if (title === "묭미 프로젝트 UIUX" && linkUrl) {
            window.open(linkUrl, "_blank");
            return; // 모달 열지 않고 함수 종료!
        }

        let content = `<h2>${title}</h2>`;
        if(pdfUrl) {
            content += `
                <div style="width:100%; max-width:1800px; height:70vh; margin:20px auto;">
                    <embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%" style="border-radius:10px; box-shadow:0 4px 18px rgba(0,0,0,0.12);"/>
                </div>
            `;
        } else {
            content += `<p>PDF 미리보기가 준비되지 않았습니다.</p>`;
        }
        $('#modalBody').html(content);
        $('#portfolioModal').fadeIn(300);
    });


    // 모달 닫기
    $('.modal-close, .modal').click(function(e) {
        if (e.target === this) {
            $('#portfolioModal').fadeOut(300);
        }
    });

    // 모달 내용 클릭 시 닫히지 않게
    $('.modal-content').click(function(e) {
        e.stopPropagation();
    });

    // 모바일 메뉴 (추후 구현)
    $('.mobile-menu').click(function() {
        // 모바일 메뉴 토글 기능
    });
});
