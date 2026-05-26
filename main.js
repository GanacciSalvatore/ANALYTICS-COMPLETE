(function ($) {
    "use strict";

    // Navbar show/hide on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }

        // Highlight the navbar item based on the section currently in view
        let scrollPosition = $(document).scrollTop();

        $('.nav-item').each(function () {
            const sectionId = $(this).attr('href').substring(1);
            const section = $('#' + sectionId);
            const sectionTop = section.offset().top - 100;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.nav-link').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    // Smooth scrolling for navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 500, function () {
                window.location.hash = hash;
            });

            $('.nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Typed.js text animation
    if ($('.typed-text-output').length === 1) {
        var typed_strings = $('.typed-text').text();
        new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Skill bar animation
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '80%'
    });

    // Project filtering with transition animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');

                item.classList.remove('show');
                item.classList.add('hide');

                if (filter === 'all' || category === filter) {
                    setTimeout(() => {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    }, 100);
                }
            });
        });
    });

    // Contact form validation with FormSubmit integration
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        $(this).find('input, textarea').each(function () {
            if ($(this).attr('id') === 'name') {
                const nameValue = $(this).val();
                const namePattern = /^[A-Za-z\s]+$/;
                if (!namePattern.test(nameValue)) {
                    $(this).addClass('is-invalid');
                    isValid = false;
                } else {
                    $(this).removeClass('is-invalid');
                }
            } else if (!this.checkValidity()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (isValid) {
            this.submit(); // FormSubmit will handle sending the email
        }
    });

    // Update copyright year
    $('#year').text(new Date().getFullYear());

})(jQuery);
