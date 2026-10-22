/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface Slide {
  image: string;
  alt: string;
  eyebrow: string;
  heading: React.ReactNode;
  paragraph: string;
  buttonText: string;
  buttonHref: string;
  caption: string;
  isH1?: boolean;
}

const SLIDES: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1900&q=85',
    alt: 'Interior acolhedor de cafeteria com luz natural e café servido',
    eyebrow: 'BEM-VINDO AO CAFÉ AURORA',
    heading: (
      <>
        Seu melhor momento<br />começa com um <em>café.</em>
      </>
    ),
    paragraph: 'Sabores especiais, aromas inesquecíveis e um cantinho feito para você.',
    buttonText: 'Conheça nosso cardápio',
    buttonHref: '#cardapio',
    caption: 'UM LUGAR PARA SENTIR-SE EM CASA',
    isH1: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1900&q=85',
    alt: 'Xícara de espresso preparada com crema dourada',
    eyebrow: 'CAFÉS ESPECIAIS',
    heading: (
      <>
        Café de verdade,<br />feito com <em>paixão.</em>
      </>
    ),
    paragraph: 'Descubra nossos cafés preparados com cuidado em cada detalhe.',
    buttonText: 'Explorar cafés',
    buttonHref: '#cardapio',
    caption: 'SABOR EM CADA XÍCARA',
  },
  {
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1900&q=85',
    alt: 'Croissants artesanais dourados, fresquinhos e folhados',
    eyebrow: 'DOCES E ACOMPANHAMENTOS',
    heading: (
      <>
        Uma pausa ainda<br />mais <em>deliciosa.</em>
      </>
    ),
    paragraph: 'Acompanhamentos irresistíveis para transformar qualquer momento.',
    buttonText: 'Ver delícias',
    buttonHref: '#cardapio',
    caption: 'FEITO PARA ACOMPANHAR',
  },
  {
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1900&q=85',
    alt: 'Salão elegante e aconchegante de uma cafeteria',
    eyebrow: 'NOSSO AMBIENTE',
    heading: (
      <>
        Um espaço para<br /><em>bons encontros.</em>
      </>
    ),
    paragraph: 'O lugar perfeito para conversar, estudar, trabalhar ou simplesmente relaxar.',
    buttonText: 'Conheça o Café Aurora',
    buttonHref: '#sobre',
    caption: 'CHEGUE, ESCOLHA SEU CANTINHO',
  },
  {
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1900&q=85',
    alt: 'Café especial servido em uma mesa cuidadosamente decorada',
    eyebrow: 'EXPERIÊNCIAS ESPECIAIS',
    heading: (
      <>
        Pequenos momentos,<br /><em>grandes sabores.</em>
      </>
    ),
    paragraph: 'No Café Aurora, cada visita merece ser especial.',
    buttonText: 'Venha nos conhecer',
    buttonHref: '#horarios',
    caption: 'SUA PRÓXIMA PAUSA COMEÇA AQUI',
  },
];

const PRODUCTS = [
  {
    name: 'Espresso Aurora',
    price: 'R$ 8,00',
    category: 'CLÁSSICO',
    description: 'Café intenso, aromático e cheio de personalidade.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85',
    alt: 'Xícara de café espresso',
  },
  {
    name: 'Latte do Amanhecer',
    price: 'R$ 15,00',
    category: 'CREMOSO',
    description: 'Espresso suave, leite vaporizado e uma espuma delicada.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85',
    alt: 'Café latte cremoso com leite vaporizado',
  },
  {
    name: 'Croissant Dourado',
    price: 'R$ 13,00',
    category: 'PARA ACOMPANHAR',
    description: 'Massa folhada, leve e crocante, assada até dourar.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
    alt: 'Croissants dourados e folhados',
  },
  {
    name: 'Cappuccino Cremoso',
    price: 'R$ 14,00',
    category: 'ESPECIAL DA CASA',
    description: 'Espresso, leite vaporizado e uma camada generosa de espuma.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85',
    alt: 'Cappuccino servido em uma xícara de cerâmica',
  },
  {
    name: 'Mocha Aurora',
    price: 'R$ 17,00',
    category: 'CHOCOLATUDO',
    description: 'A combinação aconchegante de café, chocolate e leite cremoso.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85',
    alt: 'Café mocha cremoso com leite e chocolate',
  },
  {
    name: 'Chocolate Quente Especial',
    price: 'R$ 16,00',
    category: 'BEBIDA QUENTE',
    description: 'Chocolate encorpado, feito para aquecer e adoçar a pausa.',
    image: 'https://images.unsplash.com/photo-1517578239113-b03992dcdd25?auto=format&fit=crop&w=900&q=85',
    alt: 'Chocolate quente cremoso servido em uma caneca',
  },
  {
    name: 'Cheesecake de Frutas Vermelhas',
    price: 'R$ 19,00',
    category: 'DOCE DA CASA',
    description: 'Recheio delicado com calda de frutas vermelhas e base crocante.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85',
    alt: 'Fatia de cheesecake com cobertura de frutas vermelhas',
  },
  {
    name: 'Bolo de Cenoura com Chocolate',
    price: 'R$ 12,00',
    category: 'RECEITA AFETIVA',
    description: 'Bolo fofinho de cenoura com uma irresistível cobertura de chocolate.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
    alt: 'Bolo de cenoura com cobertura de chocolate',
  },
  {
    name: 'Pão de Queijo Artesanal',
    price: 'R$ 9,00',
    category: 'FEITO COM CARINHO',
    description: 'Quentinho por dentro, dourado por fora e com sabor de casa.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
    alt: 'Pães artesanais dourados, recém-assados',
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((index + SLIDES.length) % SLIDES.length);
  }, []);

  const goToNext = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Autoplay timer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isHovered) return;

    const timer = setTimeout(() => {
      goToSlide(currentSlide + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, isHovered, goToSlide]);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goToSlide(SLIDES.length - 1);
    }
  };

  // Pointer/Touch swipe support
  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === 'touch') {
      swipeStartRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (!swipeStartRef.current) return;
    const horizontalDistance = event.clientX - swipeStartRef.current.x;
    const verticalDistance = event.clientY - swipeStartRef.current.y;
    swipeStartRef.current = null;

    if (Math.abs(horizontalDistance) > 50 && Math.abs(horizontalDistance) > Math.abs(verticalDistance) * 1.2) {
      goToSlide(currentSlide + (horizontalDistance < 0 ? 1 : -1));
    }
  };

  const handlePointerCancel = () => {
    swipeStartRef.current = null;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Café Aurora, início">
            <span className="brand-mark" aria-hidden="true">✳</span> Café <strong>Aurora</strong>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-controls="site-nav"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav
            className={`nav ${isMenuOpen ? 'is-open' : ''}`}
            id="site-nav"
            aria-label="Navegação principal"
          >
            <a href="#sobre" onClick={closeMenu}>Nossa história</a>
            <a href="#cardapio" onClick={closeMenu}>Cardápio</a>
            <a href="#horarios" onClick={closeMenu}>Horários</a>
            <a className="nav-contact" href="#contato" onClick={closeMenu}>
              Contato <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section
          className="hero carousel"
          id="inicio"
          aria-label="Destaques do Café Aurora"
          aria-roledescription="carrossel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div className="carousel-track" id="carousel-track">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <article
                  key={index}
                  className={`hero-slide ${isActive ? 'is-active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${SLIDES.length}`}
                  aria-hidden={!isActive}
                >
                  <img
                    className="hero-image"
                    src={slide.image}
                    alt={slide.alt}
                    loading={index === 0 ? undefined : 'lazy'}
                  />
                  <div className="hero-shade" aria-hidden="true"></div>
                  <div className="container hero-content">
                    <span className="eyebrow light">{slide.eyebrow}</span>
                    {slide.isH1 ? (
                      <h1>{slide.heading}</h1>
                    ) : (
                      <h2>{slide.heading}</h2>
                    )}
                    <p>{slide.paragraph}</p>
                    <a className="button button-light" href={slide.buttonHref}>
                      {slide.buttonText} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <span className="hero-caption">{slide.caption}</span>
                </article>
              );
            })}
          </div>

          <button
            className="carousel-arrow carousel-previous"
            type="button"
            aria-label="Slide anterior"
            aria-controls="carousel-track"
            onClick={goToPrev}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            className="carousel-arrow carousel-next"
            type="button"
            aria-label="Próximo slide"
            aria-controls="carousel-track"
            onClick={goToNext}
          >
            <span aria-hidden="true">›</span>
          </button>

          <div className="carousel-footer">
            <div className="carousel-indicators" role="group" aria-label="Escolher slide">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentSlide ? 'is-active' : ''}`}
                  type="button"
                  aria-label={`Ir para o slide ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : undefined}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>
            <span
              className="carousel-status visually-hidden"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              Slide {currentSlide + 1} de {SLIDES.length}
            </span>
          </div>
        </section>

        <section className="intro section" id="sobre" aria-labelledby="sobre-title">
          <div className="container intro-grid">
            <div className="intro-image">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=85"
                alt="Cafeteria aconchegante com mesas de madeira e iluminação acolhedora"
                loading="lazy"
              />
              <span className="image-note">UM CANTINHO PARA CHAMAR DE SEU</span>
            </div>
            <div className="intro-copy">
              <span className="eyebrow">PRAZER, SOMOS O AURORA</span>
              <h2 id="sobre-title">
                Café quentinho.<br /><em>Momentos leves.</em>
              </h2>
              <p>
                No Café Aurora, acreditamos que um bom café vai muito além do sabor. É uma oportunidade de desacelerar, compartilhar histórias e aproveitar os pequenos prazeres da vida.
              </p>
              <p>
                Nosso espaço foi pensado para oferecer aconchego, qualidade e experiências especiais a cada visita. Aqui, o ingrediente principal é o carinho em cada detalhe.
              </p>
              <a className="text-link" href="#contato">
                Venha conversar com a gente <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="menu-section section" id="cardapio" aria-labelledby="menu-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">ESCOLHAS QUE AQUECEM</span>
                <h2 id="menu-title">Nossos <em>favoritos</em></h2>
              </div>
              <p>Novos sabores e clássicos imaginados especialmente para o seu momento de pausa.</p>
            </div>
            <div className="products">
              {PRODUCTS.map((product, index) => (
                <article key={index} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.alt} loading="lazy" />
                  </div>
                  <div className="product-body">
                    <span className="product-category">{product.category}</span>
                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      <strong>{product.price}</strong>
                    </div>
                    <p>{product.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="fiction-note">Cardápio e preços ilustrativos — esta cafeteria é fictícia.</p>
          </div>
        </section>

        <section className="visit-section" id="horarios" aria-labelledby="horarios-title">
          <div className="container visit-grid">
            <div className="visit-image">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1300&q=85"
                alt="Mesas e decoração em madeira no interior do Café Aurora"
                loading="lazy"
              />
            </div>
            <div className="visit-info">
              <span className="eyebrow">PLANEJE SUA PAUSA</span>
              <h2 id="horarios-title">
                Sempre tem hora<br />para um <em>café.</em>
              </h2>
              <p>Nosso horário de funcionamento imaginário:</p>
              <div className="schedule">
                <div>
                  <span>Segunda a sexta</span>
                  <strong>08h às 19h</strong>
                </div>
                <div>
                  <span>Sábado</span>
                  <strong>09h às 18h</strong>
                </div>
                <div>
                  <span>Domingo</span>
                  <strong>09h às 14h</strong>
                </div>
              </div>
              <small>Horários apenas demonstrativos.</small>
            </div>
          </div>
        </section>

        <section className="contact-section section" id="contato" aria-labelledby="contato-title">
          <div className="container contact-inner">
            <span className="eyebrow light">FALE COM A GENTE</span>
            <h2 id="contato-title">
              Uma boa conversa<br />começa com um <em>olá.</em>
            </h2>
            <p>Dúvidas, sugestões ou só vontade de conversar? Nosso contato de demonstração está aqui.</p>
            <a className="button button-light" href="mailto:ola@cafeaurora.example">
              ola@cafeaurora.example <span aria-hidden="true">↗</span>
            </a>
            <p className="contact-disclaimer">Endereço de e-mail fictício; não recebe mensagens.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true">✳</span> Café <strong>Aurora</strong>
          </a>
          <span>Feito para imaginar bons momentos.</span>
          <span>© <span id="year">{new Date().getFullYear()}</span> Café Aurora · Projeto fictício</span>
        </div>
      </footer>
    </>
  );
}
