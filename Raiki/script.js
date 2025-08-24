document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Header background opacity on scroll
    function updateHeaderBackground() {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderBackground();
        animateOnScroll();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.experience-item, .leadership-item, .volunteer-item, .activity, .contact-link');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animations
    function initializeAnimations() {
        const elements = document.querySelectorAll('.experience-item, .leadership-item, .volunteer-item, .activity, .contact-link');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    }

    // Typing effect for hero tagline
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        // Add a small delay before starting the typing effect
        setTimeout(() => {
            typeWriter(heroTagline, originalText, 80);
        }, 1000);
    }

    // Smooth reveal animation for sections
    function revealSections() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    // Add hover effects for project cards
    function addProjectHoverEffects() {
        const projects = document.querySelectorAll('.project');
        
        projects.forEach(project => {
            project.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            project.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Add click-to-copy functionality for contact links (optional)
    function addCopyToClipboard() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // If it's not an external link, prevent default and copy text
                const handle = this.querySelector('.handle').textContent;
                
                // Only for demonstration - in a real site, you'd want proper links
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Create temporary textarea to copy text
                    const textarea = document.createElement('textarea');
                    textarea.value = handle;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    
                    // Show feedback
                    const originalText = this.querySelector('.handle').textContent;
                    this.querySelector('.handle').textContent = 'Copied!';
                    
                    setTimeout(() => {
                        this.querySelector('.handle').textContent = originalText;
                    }, 2000);
                }
            });
        });
    }

    // Achievement counter animation
    function animateCounters() {
        const achievements = document.querySelectorAll('.achievement');
        
        achievements.forEach(achievement => {
            const text = achievement.textContent;
            const numbers = text.match(/\d+/g);
            
            if (numbers) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Add a subtle pulse animation
                            entry.target.style.animation = 'pulse 0.6s ease-in-out';
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(achievement);
            }
        });
    }

    // Add pulse animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .nav-menu.active {
            transform: translateX(0) !important;
        }
        
        .nav-menu a.active {
            color: var(--primary-color);
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
        
        body.nav-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Initialize all functionality
    initializeAnimations();
    addProjectHoverEffects();
    animateCounters();
    
    // Initial call to set active nav link
    updateActiveNavLink();
    updateHeaderBackground();
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
});

// Toggle experience details functionality
function toggleExperienceDetails(button) {
    const experienceItem = button.closest('.experience-item');
    const details = experienceItem.querySelector('.experience-details');
    const data = languageData[currentLanguage];
    
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = data.buttons.closeDetails;
        button.classList.add('expanded');
        
        // Smooth reveal animation
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 10);
    } else {
        details.style.opacity = '0';
        details.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            details.style.display = 'none';
            button.textContent = data.buttons.seeDetails;
            button.classList.remove('expanded');
        }, 300);
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Smooth scrolling fallback for browsers that don't support CSS scroll-behavior
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== 多言語対応 =====
const languageData = {
    ja: {
        nav: {
            about: "About",
            experience: "Experience", 
            leadership: "Leadership",
            volunteer: "Volunteer",
            personal: "Personal",
            contact: "Contact"
        },
        hero: {
            welcome: "Welcome to my world",
            tagline: "まだ見ぬ世界を追い求める",
            description1: "マーケティング学生 | DXテクニシャン |",
            description2: "Ensign College, Utah | LinkedIn 6,200+ connections",
            learnMore: "Learn More",
            getInTouch: "Get in Touch"
        },
        sections: {
            aboutTitle: "About Me",
            aboutIntro: "鹿児島県出身、現在米国ユタ州のエンサインカレッジでマーケティングを学ぶ20歳。",
            aboutText1: "私の根底にあるのは、常に「まだ見ぬ世界」を探求し、新しい視点や機会を見つけ出すことへの尽きない情熱です。現状維持を是とせず、あらゆる物事に対して「もっと良くできるはずだ (The power of yet)」という'Growth Mindset'を持って挑戦し続けています。",
            aboutText2: "特に、近年はAI技術の進化に大きな可能性を感じ、テクノロジーを活用してチームや組織の生産性を爆発的に向上させることに情熱を注いでいます。複雑な課題を主体的に発見し、解決策を設計・実装する力、そしてビジョンを共有しチームをリードする力、人にポジティブな影響を与える力に自信を持っています。",
            experienceTitle: "Work Experience & Key Achievements",
            contactTitle: "Get in Touch",
            contactIntro: "お気軽にDMしてください。",
            personalTitle: "Personal & Influence",
            volunteerTitle: "Volunteer & Social Impact",
            favoritesTitle: "お気に入りの瞬間",
            favoritesIntro: "私の人生で特別な意味を持つ瞬間たち"
        },
        buttons: {
            seeDetails: "詳細を見る",
            closeDetails: "詳細を閉じる"
        },
        experience: {
            leveragesSummary: "BtoBセールス経験 → 社内「AI大臣」として500時間分の工数削減自動化を実現",
            phase1Title: "Phase 1: BtoBセールス",
            phase1Subtitle: "ビジネスの最前線での挑戦",
            phase1Content: "キャリアの初期段階として、私はまず2ヶ月間、法人営業の役割を担いました。これは私にとって初めての営業経験であり、かつ全てのコミュニケーションを英語で行うという二重の挑戦でした。実践的なロールプレイングをハイスピードでこなし、電話でのアポイント獲得から実際の商談まで、ビジネスの最前線で顧客と向き合う基本を徹底的に学びました。",
            phase2Title: "Phase 2: DX推進活動", 
            phase2Subtitle: "社内「AI大臣」としての業務改革",
            project1Title: "Project 1: 営業部門のリスト作成自動化",
            project1Achievement: "500時間分の工数削減",
            project1Challenge: "課題: 営業担当者が、出張時のアポイント獲得のため、見込み顧客情報を手作業で収集。1時間に約30社の処理が限界で、大きなボトルネックとなっていました。",
            project1Solution: "解決策: Googleスプレッドシートの情報を元に、Apollo APIへ自動でリクエストを送信し、リッチな顧客情報を取得してシートに追記するGASを開発。さらに「メール自動送信禁止」という社内ルールを遵守するため、ボタン一つでパーソナライズされたメール下書きをGmailに一括生成する機能を実装。",
            project1Result: "成果: 実に500時間分に相当するリスト作成工数を完全に削減。営業担当者は本来注力すべきアプローチ戦略の策定に時間を使えるようになり、アポイント獲得効率を飛躍的に向上。",
            project2Title: "Project 2: 海外部門の時差計算・リマインド自動化",
            project2Achievement: "通称「マイキーボム」",
            project2Challenge: "課題: 海外拠点との会議調整で、時差計算とリマインド送信が手作業で行われ、ミスが頻発していました。",
            project2Solution: "解決策: スプレッドシートの会議情報を自動で読み取り、時差を計算してリマインドメールを自動送信するシステムを開発。",
            project2Result: "成果: 時差計算ミスをゼロに削減し、会議参加率を大幅に向上。",
            pacificMetaSummary: "日系大手企業（KDDI/au）のWeb3米国市場進出支援、KOLマーケティング戦略立案",
            pacificMetaContent: "日本のWeb3スタートアップであるPacific Metaにおいて、グローバル戦略、特に日系大手クライアント（例：KDDI/au）の米国市場進出支援を担当。",
            pacificMetaResearch: "市場リサーチと戦略立案: 米国のWeb3業界の動向、主要プレイヤー、成功事例を徹底的にリサーチ。データに基づき、クライアントが取るべきプロジェクトの進め方や市場参入戦略を立案。",
            pacificMetaKOL: "KOL（Key Opinion Leader）マーケティング: 米国現地の有力なKOLを発掘・リストアップ。彼らと直接英語でコミュニケーションを取り、提携の可能性を探るなど、マーケティング施策の実行に向けた具体的なアクションを担当。",
            studyAbroadSummary: "登録者数1.5万人のYouTubeチャンネル運営、20名の留学生の渡米完全サポート",
            studyAbroadContent: "コンテンツ制作: 登録者数1.5万人を誇るYouTubeチャンネルの動画編集を毎月4本担当。",
            studyAbroadSupport: "顧客成功支援: 自身の米国留学経験を活かし、渡米を目指す学生を包括的にサポート。ビザ申請からエッセイ添削、アパート契約まで伴走し、担当した20名のクライアント全員を、無事にアメリカの地へ送り届けました。",
            studyAbroadCommunity: "コミュニティ形成: 渡米後の学生たちのために、毎回20〜30名が参加する「ウェルカムパーティー」を主催。アメリカ生活の基礎知識や、挑戦を後押しするマインドセットに関するプレゼンテーションも実施。",
            globalCareerSummary: "Instagram 500→3500人（7倍成長）、LINE友だち0→1500人、イベント10人→250人規模へ",
            globalCareerContent: "半年間のメンバー期間を経て、代表に就任。世界中の留学生が「就職活動」という共通の目標に向かって高め合える、エンゲージメントの高いコミュニティの構築をリードしました。",
            globalCareerGrowth: "コミュニティ・グロース: Instagramのフォロワーを500人から3500人へと7倍に増加させ、LINE LSTEPでゼロから1年で友だち登録者数を1500人まで拡大。",
            globalCareerEvents: "イベントの圧倒的成長: 10人未満だったイベントを平均100人以上、最大250人が申し込む規模へと成長させました。",
            globalCareerHR: "HR & プロジェクトマネジメント: 「実践的な経験が欲しい」という留学生のニーズに応え、短期インターンシッププログラムを創設。40人の応募者から自ら設計した評価制度で採用を行い、合計10名の学生を育成しました。",
            globalCareerTeam: "チームマネジメントと大規模イベント: 長期インターンとして合計10名の学生をマネジメント。また、年に2回、Google, Amazon, Microsoft, Meta, LinkedInなどを訪問する企業ツアーを企画・実行しました。",
            globalCareerRole: "留学生向けキャリアコミュニティ ex President"
        },
        volunteer: {
            aiMeetupContent: "日本の大企業（Hitachi, NEC, NTT等）と、Y Combinator採択経験のあるシアトルの有力AIスタートアップを繋ぐ、ハイレベルなミートアップに参画。日本語が話せないスタートアップに代わり、彼らのビジネスの核心を捉えた1分間の日本語ピッチを担当。また、イベントで成果を最大化できるよう、デモ設営などを英語でサポートしています。",
            utahWorldCupContent: "ユタ州での留学中、組織的なサッカーの機会が少ないことに課題を感じ、自ら国際交流サッカー大会「Utah World Cup」を創設。国籍別のチームで競い合う大会を企画し、これまでに2回開催、延べ約70名が参加。何もないところから、人と人との繋がりと喜びの輪を創り出す活動です。"
        },
        personal: {
            connectionTitle: "私が「繋がる」理由",
            connectionText: "私の活動の根幹には、「人との繋がり」に対する深い信念があります。一つ一つの対話を通じて知識を吸収し、視座を高め、そして得たものを次の世代や挑戦する仲間に還元していく。この学びと貢献のサイクルを自ら回し続けています。",
            topTierTitle: "\"Top Tier\"からの学び",
            topTierText: "過去2年間、Microsoft, Amazon, Googleなど、日米のトップ企業で働くプロフェッショナル、累計200人以上と対話し、ビジネスの最前線にある基準値を自身にインプットしてきました。",
            nextGenTitle: "\"Next Generation\"への貢献",
            nextGenText: "得た学びを、同世代や高校生たちに還元するため、メンタリング活動を積極的に実施。Instagramでの呼びかけでは1ヶ月で20人から申し込みがあり、現在も毎月4〜5人の若者と継続的に対話しています。",
            assetTitle: "私の資産",
            assetText: "これらの活動の結果、私のLinkedInの繋がりは現在5900人を超えています。これは単なる数字ではなく、一件一件の対話を通じて築き上げられた、生きたネットワークです。",
            interestsTitle: "キャリア以外の私",
            interestsText: "これらの活動も私の人生を豊かにしてくれています。",
            natureTitle: "週末を自然の中で過ごすこと⛰️🌊",
            natureText: "ハイキング、ランニング、サイクリングを通じて心身をリフレッシュし、新しいアイデアの着想を得ています。",
            aiTitle: "AIの最新動向の探求🤖",
            aiText: "趣味と実益を兼ね、常に新しい技術やツールを試し、効率化や自動化への応用を探求しています。",
            travelTitle: "旅行✈️🌍",
            travelText: "非日常を週末などで味わうことで新しい価値観に出会うことを楽しむ。世界中を旅行して、それを動画に収めたい。"
        }
    },
    en: {
        nav: {
            about: "About",
            experience: "Experience",
            leadership: "Leadership", 
            volunteer: "Volunteer",
            personal: "Personal",
            contact: "Contact"
        },
        hero: {
            welcome: "Welcome to my world",
            tagline: "Pursuing worlds yet unseen",
            description1: "Marketing Student | DX Technician |",
            description2: "Ensign College, Utah | LinkedIn 6,200+ connections",
            learnMore: "Learn More", 
            getInTouch: "Get in Touch"
        },
        sections: {
            aboutTitle: "About Me",
            aboutIntro: "A 20-year-old from Kagoshima, Japan, currently studying marketing at Ensign College in Utah, USA.",
            aboutText1: "At my core lies an unending passion for exploring 'worlds yet unseen' and discovering new perspectives and opportunities. I refuse to accept the status quo and approach everything with a Growth Mindset, believing that 'it can always be better' through the power of yet.",
            aboutText2: "I'm particularly excited about AI technology's transformative potential and am passionate about leveraging technology to exponentially boost team and organizational productivity. I'm confident in my ability to proactively identify complex challenges, design and implement innovative solutions, and lead teams toward a shared vision while creating positive impact on people's lives.",
            experienceTitle: "Professional Experience & Key Achievements",
            contactTitle: "Get in Touch",
            contactIntro: "Feel free to reach out via DM.",
            personalTitle: "Personal Life & Influence", 
            volunteerTitle: "Community & Social Impact",
            favoritesTitle: "Cherished Moments",
            favoritesIntro: "Special moments that have shaped my journey"
        },
        buttons: {
            seeDetails: "See Details",
            closeDetails: "Close Details"
        },
        experience: {
            leveragesSummary: "B2B Sales Experience → Achieved 500-hour workflow automation as in-house 'AI Minister'",
            phase1Title: "Phase 1: B2B Sales",
            phase1Subtitle: "Frontline Business Challenge",
            phase1Content: "In the early stages of my career, I took on a corporate sales role for 2 months. This was a dual challenge for me - my first sales experience and conducting all communications in English. I rapidly mastered practical role-playing exercises and thoroughly learned the fundamentals of customer engagement at the business frontline, from cold calling for appointments to actual deal negotiations.",
            phase2Title: "Phase 2: Digital Transformation Initiative", 
            phase2Subtitle: "Business Process Revolution as 'AI Minister'",
            project1Title: "Project 1: Sales Lead Generation Automation",
            project1Achievement: "500 hours of manual work eliminated",
            project1Challenge: "Challenge: Sales reps were manually collecting prospect information for business trip appointments. Processing ~30 companies per hour was the limit, creating a major bottleneck.",
            project1Solution: "Solution: Developed a GAS script that automatically sends requests to Apollo API based on Google Sheets data, retrieves rich customer information, and appends it to sheets. Also implemented a feature that generates personalized email drafts in Gmail with one click, adhering to the company's 'no auto-send emails' policy.",
            project1Result: "Results: Completely eliminated 500 hours worth of list creation work. Sales reps could now focus on strategic approach planning, dramatically improving appointment acquisition efficiency.",
            project2Title: "Project 2: International Time Zone & Reminder Automation",
            project2Achievement: "Dubbed 'Mikey Bomb'",
            project2Challenge: "Challenge: Manual time zone calculations and reminder sending for international meetings led to frequent errors.",
            project2Solution: "Solution: Developed a system that automatically reads meeting information from spreadsheets, calculates time zones, and sends reminder emails.",
            project2Result: "Results: Eliminated time zone calculation errors and significantly improved meeting attendance rates.",
            pacificMetaSummary: "Supported major Japanese companies (KDDI/au) in US Web3 market entry, KOL marketing strategy development",
            pacificMetaContent: "At Pacific Meta, a Japanese Web3 startup, I was responsible for global strategy, particularly supporting major Japanese clients (e.g., KDDI/au) in their US market entry.",
            pacificMetaResearch: "Market Research & Strategy Development: Thoroughly researched US Web3 industry trends, key players, and success cases. Based on data, I developed project approaches and market entry strategies that clients should take.",
            pacificMetaKOL: "KOL (Key Opinion Leader) Marketing: Identified and listed influential KOLs in the US market. Communicated directly with them in English to explore partnership possibilities and handled specific actions toward marketing initiative execution.",
            studyAbroadSummary: "Managed 15K subscriber YouTube channel, provided complete US study abroad support for 20 students",
            studyAbroadContent: "Content Creation: Managed video editing for a YouTube channel with 15K subscribers, producing 4 videos monthly.",
            studyAbroadSupport: "Customer Success Support: Leveraging my own US study abroad experience, I provided comprehensive support to students aiming to study in America. From visa applications to essay editing and apartment contracts, I accompanied all 20 clients through their journey and successfully delivered them to American soil.",
            studyAbroadCommunity: "Community Building: Organized 'Welcome Parties' for post-arrival students with 20-30 participants each time. Also conducted presentations on American life basics and mindsets that encourage taking on challenges.",
            globalCareerSummary: "Instagram growth: 500→3,500 (7x), LINE friends: 0→1,500, Events: 10→250 participants",
            globalCareerContent: "After a 6-month membership period, I was appointed as president. I led the construction of a high-engagement community where international students worldwide could support each other toward the common goal of 'job hunting.'",
            globalCareerGrowth: "Community Growth: Increased Instagram followers from 500 to 3,500 (7x growth) and expanded LINE LSTEP friend registrations from zero to 1,500 in one year.",
            globalCareerEvents: "Explosive Event Growth: Grew events from under 10 people to an average of 100+, with a maximum of 250 applicants.",
            globalCareerHR: "HR & Project Management: Created a short-term internship program responding to international students' need for 'practical experience.' Designed evaluation systems and recruited from 40 applicants, ultimately developing 10 students.",
            globalCareerTeam: "Team Management & Large-Scale Events: Managed 10 students as long-term interns. Also planned and executed company tours visiting Google, Amazon, Microsoft, Meta, LinkedIn, etc., twice yearly.",
            globalCareerRole: "Career Community for International Students - Ex President"
        },
        volunteer: {
            aiMeetupContent: "Participated in high-level meetups connecting major Japanese corporations (Hitachi, NEC, NTT, etc.) with influential AI startups from Seattle with Y Combinator experience. On behalf of startups who couldn't speak Japanese, I delivered 1-minute Japanese pitches capturing the essence of their businesses. Also provided English support for demo setups to maximize event outcomes.",
            utahWorldCupContent: "During my studies in Utah, I noticed the lack of organized soccer opportunities and founded the international soccer tournament 'Utah World Cup.' I organized competitions between nationality-based teams, hosting it twice so far with approximately 70 total participants. This creates connections and joy from nothing, building bridges between people."
        },
        personal: {
            connectionTitle: "Why I 'Connect'",
            connectionText: "At the core of my activities lies a deep belief in 'human connections.' Through each conversation, I absorb knowledge, elevate my perspective, and give back what I've gained to the next generation and fellow challengers. I continuously drive this cycle of learning and contribution.",
            topTierTitle: "Learning from 'Top Tier'",
            topTierText: "Over the past 2 years, I've had conversations with 200+ professionals working at top companies like Microsoft, Amazon, Google in both Japan and the US, inputting business frontline standards into myself.",
            nextGenTitle: "Contributing to the 'Next Generation'",
            nextGenText: "To give back what I've learned to peers and high school students, I actively conduct mentoring activities. Through Instagram outreach, I received 20 applications in one month and continue monthly conversations with 4-5 young people.",
            assetTitle: "My Asset",
            assetText: "As a result of these activities, my LinkedIn connections now exceed 5,900 people. This isn't just a number - it's a living network built through individual conversations.",
            interestsTitle: "Beyond Career",
            interestsText: "These activities also enrich my life.",
            natureTitle: "Spending weekends in nature ⛰️🌊",
            natureText: "Through hiking, running, and cycling, I refresh my mind and body while gaining inspiration for new ideas.",
            aiTitle: "Exploring the latest AI trends 🤖",
            aiText: "Combining hobby with practical benefits, I constantly try new technologies and tools, exploring applications for efficiency and automation.",
            travelTitle: "Travel ✈️🌍",
            travelText: "I enjoy experiencing the extraordinary on weekends to encounter new values. I want to travel the world and capture it on video."
        }
    }
};

let currentLanguage = 'ja';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ja' ? 'en' : 'ja';
    updateLanguage();
    
    // ボタンのテキストを更新
    const langBtn = document.querySelector('#language-btn .lang-text');
    langBtn.textContent = currentLanguage === 'ja' ? 'EN' : '日本語';
}

function updateLanguage() {
    const data = languageData[currentLanguage];
    
    // ナビゲーション更新
    document.querySelector('a[href="#about"]').textContent = data.nav.about;
    document.querySelector('a[href="#experience"]').textContent = data.nav.experience;
    document.querySelector('a[href="#volunteer"]').textContent = data.nav.volunteer;
    document.querySelector('a[href="#personal"]').textContent = data.nav.personal;
    document.querySelector('a[href="#contact"]').textContent = data.nav.contact;
    
    // ヒーローセクション更新
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.textContent = data.hero.welcome;
    
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) heroTagline.textContent = data.hero.tagline;
    
    const heroDescriptions = document.querySelectorAll('.hero-description p');
    if (heroDescriptions.length >= 2) {
        heroDescriptions[0].textContent = data.hero.description1;
        heroDescriptions[1].textContent = data.hero.description2;
    }
    
    const learnMoreBtn = document.querySelector('.btn-primary span');
    if (learnMoreBtn) learnMoreBtn.textContent = data.hero.learnMore;
    
    const getInTouchBtn = document.querySelector('.btn-secondary span');
    if (getInTouchBtn) getInTouchBtn.textContent = data.hero.getInTouch;
    
    // セクションタイトル更新
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) aboutTitle.textContent = data.sections.aboutTitle;
    
    const experienceTitle = document.querySelector('#experience .section-title');
    if (experienceTitle) experienceTitle.textContent = data.sections.experienceTitle;
    
    const volunteerTitle = document.querySelector('#volunteer .section-title');
    if (volunteerTitle) volunteerTitle.textContent = data.sections.volunteerTitle;
    
    const personalTitle = document.querySelector('#personal .section-title');
    if (personalTitle) personalTitle.textContent = data.sections.personalTitle;
    
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = data.sections.contactTitle;
    
    const favoritesTitle = document.querySelector('#favorites .section-title');
    if (favoritesTitle) favoritesTitle.textContent = data.sections.favoritesTitle;
    
    // About セクションのテキスト更新
    const aboutLead = document.querySelector('.about-intro .lead');
    if (aboutLead) aboutLead.textContent = data.sections.aboutIntro;
    
    const aboutTexts = document.querySelectorAll('.about-intro p:not(.lead)');
    if (aboutTexts.length >= 2) {
        if (currentLanguage === 'ja') {
            aboutTexts[0].innerHTML = data.sections.aboutText1.replace('まだ見ぬ世界', '<span class="highlight-orange">まだ見ぬ世界</span>');
        } else {
            aboutTexts[0].innerHTML = data.sections.aboutText1.replace('worlds yet unseen', '<span class="highlight-orange">worlds yet unseen</span>');
        }
        aboutTexts[1].textContent = data.sections.aboutText2;
    }
    
    // コンタクトセクション更新
    const contactIntro = document.querySelector('.contact-intro p');
    if (contactIntro) contactIntro.textContent = data.sections.contactIntro;
    
    // お気に入りセクション更新
    const favoritesIntro = document.querySelector('.favorites-intro p');
    if (favoritesIntro) favoritesIntro.textContent = data.sections.favoritesIntro;
    
    // 詳細ボタン更新
    const detailButtons = document.querySelectorAll('.toggle-details');
    detailButtons.forEach(button => {
        if (button.classList.contains('expanded')) {
            button.textContent = data.buttons.closeDetails;
        } else {
            button.textContent = data.buttons.seeDetails;
        }
    });
    
    // 体験談セクション更新
    const leveragesSummary = document.querySelector('.experience-item:first-child .experience-summary p');
    if (leveragesSummary) leveragesSummary.textContent = data.experience.leveragesSummary;
    
    const phase1Title = document.querySelector('.phase:first-child .phase-header h4');
    if (phase1Title) phase1Title.textContent = data.experience.phase1Title;
    
    const phase1Subtitle = document.querySelector('.phase:first-child .phase-subtitle');
    if (phase1Subtitle) phase1Subtitle.textContent = data.experience.phase1Subtitle;
    
    const phase2Title = document.querySelector('.phase:nth-child(2) .phase-header h4');
    if (phase2Title) phase2Title.textContent = data.experience.phase2Title;
    
    const phase2Subtitle = document.querySelector('.phase:nth-child(2) .phase-subtitle');
    if (phase2Subtitle) phase2Subtitle.textContent = data.experience.phase2Subtitle;
    
    const project1Title = document.querySelector('.project:first-child .project-header h5');
    if (project1Title) project1Title.textContent = data.experience.project1Title;
    
    const project1Achievement = document.querySelector('.project:first-child .achievement');
    if (project1Achievement) project1Achievement.textContent = data.experience.project1Achievement;
    
    const project2Title = document.querySelector('.project:nth-child(2) .project-header h5');
    if (project2Title) project2Title.textContent = data.experience.project2Title;
    
    const project2Achievement = document.querySelector('.project:nth-child(2) .achievement');
    if (project2Achievement) project2Achievement.textContent = data.experience.project2Achievement;
    
    const pacificMetaSummary = document.querySelector('.experience-item:nth-child(2) .experience-summary p');
    if (pacificMetaSummary) pacificMetaSummary.textContent = data.experience.pacificMetaSummary;
    
    const studyAbroadSummary = document.querySelector('.experience-item:nth-child(3) .experience-summary p');
    if (studyAbroadSummary) studyAbroadSummary.textContent = data.experience.studyAbroadSummary;
    
    const globalCareerSummary = document.querySelector('.experience-item:nth-child(4) .experience-summary p');
    if (globalCareerSummary) globalCareerSummary.textContent = data.experience.globalCareerSummary;
    
    // 詳細セクションの内容更新
    const phase1Content = document.querySelector('.phase:first-child p');
    if (phase1Content) phase1Content.textContent = data.experience.phase1Content;
    
    const project1Challenge = document.querySelector('.project:first-child .project-detail:nth-child(1)');
    if (project1Challenge) project1Challenge.innerHTML = `<strong>${currentLanguage === 'ja' ? '課題' : 'Challenge'}:</strong> ${data.experience.project1Challenge.split(': ')[1]}`;
    
    const project1Solution = document.querySelector('.project:first-child .project-detail:nth-child(2)');
    if (project1Solution) project1Solution.innerHTML = `<strong>${currentLanguage === 'ja' ? '解決策' : 'Solution'}:</strong> ${data.experience.project1Solution.split(': ')[1]}`;
    
    const project1Result = document.querySelector('.project:first-child .project-detail:nth-child(3)');
    if (project1Result) project1Result.innerHTML = `<strong>${currentLanguage === 'ja' ? '成果' : 'Results'}:</strong> ${data.experience.project1Result.split(': ')[1]}`;
    
    const project2Challenge = document.querySelector('.project:nth-child(2) .project-detail:nth-child(1)');
    if (project2Challenge) project2Challenge.innerHTML = `<strong>${currentLanguage === 'ja' ? '課題' : 'Challenge'}:</strong> ${data.experience.project2Challenge.split(': ')[1]}`;
    
    const project2Solution = document.querySelector('.project:nth-child(2) .project-detail:nth-child(2)');
    if (project2Solution) project2Solution.innerHTML = `<strong>${currentLanguage === 'ja' ? '解決策' : 'Solution'}:</strong> ${data.experience.project2Solution.split(': ')[1]}`;
    
    const project2Result = document.querySelector('.project:nth-child(2) .project-detail:nth-child(3)');
    if (project2Result) project2Result.innerHTML = `<strong>${currentLanguage === 'ja' ? '成果' : 'Results'}:</strong> ${data.experience.project2Result.split(': ')[1]}`;
    
    // Pacific Meta 詳細
    const pacificMetaContent = document.querySelector('.experience-item:nth-child(2) .experience-details > p');
    if (pacificMetaContent) pacificMetaContent.textContent = data.experience.pacificMetaContent;
    
    const pacificMetaResearch = document.querySelector('.experience-item:nth-child(2) .experience-details li:first-child');
    if (pacificMetaResearch) pacificMetaResearch.innerHTML = `<strong>${data.experience.pacificMetaResearch.split(':')[0]}:</strong> ${data.experience.pacificMetaResearch.split(':')[1]}`;
    
    const pacificMetaKOL = document.querySelector('.experience-item:nth-child(2) .experience-details li:nth-child(2)');
    if (pacificMetaKOL) pacificMetaKOL.innerHTML = `<strong>${data.experience.pacificMetaKOL.split(':')[0]}:</strong> ${data.experience.pacificMetaKOL.split(':')[1]}`;
    
    // Study Abroad Assistant 詳細
    const studyAbroadContentLi = document.querySelector('.experience-item:nth-child(3) .experience-details li:first-child');
    if (studyAbroadContentLi) studyAbroadContentLi.innerHTML = `<strong>${data.experience.studyAbroadContent.split(':')[0]}:</strong> ${data.experience.studyAbroadContent.split(':')[1]}`;
    
    const studyAbroadSupportLi = document.querySelector('.experience-item:nth-child(3) .experience-details li:nth-child(2)');
    if (studyAbroadSupportLi) studyAbroadSupportLi.innerHTML = `<strong>${data.experience.studyAbroadSupport.split(':')[0]}:</strong> ${data.experience.studyAbroadSupport.split(':')[1]}`;
    
    const studyAbroadCommunityLi = document.querySelector('.experience-item:nth-child(3) .experience-details li:nth-child(3)');
    if (studyAbroadCommunityLi) studyAbroadCommunityLi.innerHTML = `<strong>${data.experience.studyAbroadCommunity.split(':')[0]}:</strong> ${data.experience.studyAbroadCommunity.split(':')[1]}`;
    
    // Global Career Community 詳細
    const globalCareerContent = document.querySelector('.experience-item:nth-child(4) .experience-details > p');
    if (globalCareerContent) globalCareerContent.textContent = data.experience.globalCareerContent;
    
    const globalCareerGrowth = document.querySelector('.experience-item:nth-child(4) .experience-details li:first-child');
    if (globalCareerGrowth) globalCareerGrowth.innerHTML = `<strong>${data.experience.globalCareerGrowth.split(':')[0]}:</strong> ${data.experience.globalCareerGrowth.split(':')[1]}`;
    
    const globalCareerEvents = document.querySelector('.experience-item:nth-child(4) .experience-details li:nth-child(2)');
    if (globalCareerEvents) globalCareerEvents.innerHTML = `<strong>${data.experience.globalCareerEvents.split(':')[0]}:</strong> ${data.experience.globalCareerEvents.split(':')[1]}`;
    
    const globalCareerHR = document.querySelector('.experience-item:nth-child(4) .experience-details li:nth-child(3)');
    if (globalCareerHR) globalCareerHR.innerHTML = `<strong>${data.experience.globalCareerHR.split(':')[0]}:</strong> ${data.experience.globalCareerHR.split(':')[1]}`;
    
    const globalCareerTeam = document.querySelector('.experience-item:nth-child(4) .experience-details li:nth-child(4)');
    if (globalCareerTeam) globalCareerTeam.innerHTML = `<strong>${data.experience.globalCareerTeam.split(':')[0]}:</strong> ${data.experience.globalCareerTeam.split(':')[1]}`;
    
    const globalCareerRole = document.querySelector('.experience-item:nth-child(4) .role');
    if (globalCareerRole) globalCareerRole.textContent = data.experience.globalCareerRole;
    
    // Volunteer セクション
    const aiMeetupContent = document.querySelector('.volunteer-item:first-child .volunteer-content p');
    if (aiMeetupContent) aiMeetupContent.textContent = data.volunteer.aiMeetupContent;
    
    const utahWorldCupContent = document.querySelector('.volunteer-item:nth-child(2) .volunteer-content p');
    if (utahWorldCupContent) utahWorldCupContent.textContent = data.volunteer.utahWorldCupContent;
    
    // Personal セクション
    const connectionTitle = document.querySelector('.personal-intro h3');
    if (connectionTitle) connectionTitle.textContent = data.personal.connectionTitle;
    
    const connectionText = document.querySelector('.personal-intro p');
    if (connectionText) connectionText.textContent = data.personal.connectionText;
    
    const topTierTitle = document.querySelector('.activity-item:first-child h4');
    if (topTierTitle) topTierTitle.textContent = data.personal.topTierTitle;
    
    const topTierText = document.querySelector('.activity-item:first-child p');
    if (topTierText) topTierText.textContent = data.personal.topTierText;
    
    const nextGenTitle = document.querySelector('.activity-item:nth-child(2) h4');
    if (nextGenTitle) nextGenTitle.textContent = data.personal.nextGenTitle;
    
    const nextGenText = document.querySelector('.activity-item:nth-child(2) p');
    if (nextGenText) nextGenText.textContent = data.personal.nextGenText;
    
    const assetTitle = document.querySelector('.activity-item:nth-child(3) h4');
    if (assetTitle) assetTitle.textContent = data.personal.assetTitle;
    
    const assetText = document.querySelector('.activity-item:nth-child(3) p');
    if (assetText) assetText.textContent = data.personal.assetText;
    
    const interestsTitle = document.querySelector('.interests-section h3');
    if (interestsTitle) interestsTitle.textContent = data.personal.interestsTitle;
    
    const interestsText = document.querySelector('.interests-section > p');
    if (interestsText) interestsText.textContent = data.personal.interestsText;
    
    const natureTitle = document.querySelector('.interest-item:first-child h4');
    if (natureTitle) natureTitle.textContent = data.personal.natureTitle;
    
    const natureText = document.querySelector('.interest-item:first-child p');
    if (natureText) natureText.textContent = data.personal.natureText;
    
    const aiTitleEl = document.querySelector('.interest-item:nth-child(2) h4');
    if (aiTitleEl) aiTitleEl.textContent = data.personal.aiTitle;
    
    const aiTextEl = document.querySelector('.interest-item:nth-child(2) p');
    if (aiTextEl) aiTextEl.textContent = data.personal.aiText;
    
    const travelTitleEl = document.querySelector('.interest-item:nth-child(3) h4');
    if (travelTitleEl) travelTitleEl.textContent = data.personal.travelTitle;
    
    const travelTextEl = document.querySelector('.interest-item:nth-child(3) p');
    if (travelTextEl) travelTextEl.textContent = data.personal.travelText;
    
    // HTML lang属性を更新
    document.documentElement.setAttribute('lang', currentLanguage);
}

// ===== スライドショー機能 =====
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// スライドを変更する関数
function changeSlide(direction) {
    // すべてのスライドからクラスを削除
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // 現在のスライドをアクティブに
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // 前のスライドを設定
    const prevIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    slides[prevIndex].classList.add('prev');
    
    // 次のスライドを設定
    const nextIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
    slides[nextIndex].classList.add('next');
}

// 特定のスライドに移動する関数
function currentSlide(index) {
    // すべてのスライドからクラスを削除
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = index - 1;
    
    // 現在のスライドをアクティブに
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // 前のスライドを設定
    const prevIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
    slides[prevIndex].classList.add('prev');
    
    // 次のスライドを設定
    const nextIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
    slides[nextIndex].classList.add('next');
}

// 自動スライドショー（オプション）
let slideInterval;

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // 4秒ごとに自動切り替え
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// スライドショーコンテナにマウスが乗ったら自動再生を停止
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
        slideshowContainer.addEventListener('mouseleave', startAutoSlide);
        
        // 初期設定：前後の写真を表示
        if (slides.length > 0) {
            const prevIndex = currentSlideIndex - 1 < 0 ? slides.length - 1 : currentSlideIndex - 1;
            const nextIndex = currentSlideIndex + 1 >= slides.length ? 0 : currentSlideIndex + 1;
            
            slides[prevIndex].classList.add('prev');
            slides[nextIndex].classList.add('next');
        }
        
        // 自動スライドショーを開始
        startAutoSlide();
    }
});