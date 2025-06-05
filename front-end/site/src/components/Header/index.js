// Header.jsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronLeft, Home, Package, Archive, Info, Users, ShoppingCart, DollarSign, LogOut } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Verifica se é um dispositivo móvel
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Verifica no carregamento
        checkIfMobile();
        
        // Verifica quando a janela é redimensionada
        window.addEventListener('resize', checkIfMobile);
        
        // Limpeza
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Verifica o scroll da página
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Header */}
            <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
                {/* Logo da empresa */}
                <div className={styles.logoContainer}>
                    {isMobile && (
                        <button 
                            onClick={toggleMenu}
                            className={styles.mobileMenuButton}
                        >
                            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    )}
                    <div className={styles.logo}>CoreLink</div>
                </div>

                {/* Itens de navegação para desktop */}
                {!isMobile && (
                    <nav className={styles.navItems}>
                        <a href="/" className={styles.navItem}>
                            <Home size={16} />
                            <span>Home</span>
                        </a>
                        <a href="/produtos" className={styles.navItem}>
                            <Package size={16} />
                            <span>Produtos</span>
                        </a>
                        <a href="/estoque" className={styles.navItem}>
                            <Archive size={16} />
                            <span>Estoque</span>
                        </a>
                        <a href="/sobre" className={styles.navItem}>
                            <Info size={16} />
                            <span>Sobre</span>
                        </a>
                        <a href="/clientes" className={styles.navItem}>
                            <Users size={16} />
                            <span>Clientes</span>
                        </a>
                        <a href="/pedidos" className={styles.navItem}>
                            <ShoppingCart size={16} />
                            <span>Pedidos</span>
                        </a>
                        <a href="/vendas" className={styles.navItem}>
                            <DollarSign size={16} />
                            <span>Vendas</span>
                        </a>
                        <a href="/login" className={`${styles.navItem} ${styles.logoutLink}`}>
                            <LogOut size={16} />
                            <span>Sair</span>
                        </a>
                    </nav>
                )}
            </header>

            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebarContent}>
                    <h2 className={styles.sidebarTitle}>Menu</h2>
                    <ul className={styles.sidebarList}>
                        <li>
                            <a href="/" className={styles.sidebarItem}>
                                <Home size={18} />
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/produtos" className={styles.sidebarItem}>
                                <Package size={18} />
                                <span>Produtos</span>
                            </a>
                        </li>
                        <li>
                            <a href="/estoque" className={styles.sidebarItem}>
                                <Archive size={18} />
                                <span>Estoque</span>
                            </a>
                        </li>
                        <li>
                            <a href="/sobre" className={styles.sidebarItem}>
                                <Info size={18} />
                                <span>Sobre</span>
                            </a>
                        </li>
                        <li>
                            <a href="/clientes" className={styles.sidebarItem}>
                                <Users size={18} />
                                <span>Clientes</span>
                            </a>
                        </li>
                        <li>
                            <a href="/pedidos" className={styles.sidebarItem}>
                                <ShoppingCart size={18} />
                                <span>Pedidos</span>
                            </a>
                        </li>
                        <li>
                            <a href="/vendas" className={styles.sidebarItem}>
                                <DollarSign size={18} />
                                <span>Vendas</span>
                            </a>
                        </li>
                        <li>
                            <a href="/login" className={`${styles.sidebarItem} ${styles.sidebarLogout}`}>
                                <LogOut size={18} />
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
                {/* Botão para fechar o menu (só aparece em mobile) */}
                {isMobile && (
                    <button 
                        className={styles.closeSidebarButton}
                        onClick={toggleMenu}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
            
            {/* Botão para abrir o sidebar em desktop */}
            {!isMobile && (
                <button 
                    onClick={toggleMenu}
                    className={`${styles.toggleSidebarButton} ${isMenuOpen ? styles.toggleButtonOpen : ''}`}
                >
                    {isMenuOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
            )}
            
            {/* Overlay para fechar o menu quando clicar fora (só em mobile) */}
            {isMobile && isMenuOpen && (
                <div 
                    className={styles.overlay}
                    onClick={toggleMenu}
                />
            )}
            
            {/* Espaço para o conteúdo */}
            <div className={styles.contentSpace}>
                {/* Conteúdo da página irá aqui */}
            </div>
        </>
    );
}