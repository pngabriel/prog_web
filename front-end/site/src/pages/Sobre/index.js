import React from "react";
import { FiInfo, FiUsers, FiAward, FiPackage, FiPhone, FiMail, FiMessageSquare } from "react-icons/fi";
import Header from "../../components/Header";
import styles from "./Sobre.module.css";

export default function Sobre() {
  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <div className={styles.content_wrapper}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <div className={styles.hero_content}>
              <h1 className={styles.hero_title}>CoreLink ERP</h1>
              <p className={styles.hero_subtitle}>
                Sistema completo de gerenciamento empresarial para o seu negócio
              </p>
              <div className={styles.hero_actions}>
                <button className={styles.button_primary}>Iniciar Tour</button>
                <button className={styles.button_secondary}>Ver Documentação</button>
              </div>
            </div>
            <div className={styles.hero_image_container}>
              <div className={styles.hero_image}>
                <FiPackage className={styles.hero_icon} />
              </div>
            </div>
          </div>

          {/* Seção Sobre */}
          <div className={styles.card}>
            <div className={styles.card_header}>
              <FiInfo className={styles.section_icon} />
              <h2 className={styles.section_title}>Sobre o CoreLink</h2>
            </div>
            <div className={styles.card_content}>
              <p className={styles.text}>
                O CoreLink ERP é um sistema completo de gerenciamento para empresas do setor de 
                tecnologia e comércio eletrônico. Desenvolvido com foco na usabilidade e eficiência, 
                nossa plataforma oferece todas as ferramentas necessárias para controlar estoque, 
                vendas, finanças e relacionamento com clientes em um único lugar.
              </p>
              <p className={styles.text}>
                Com mais de 5 anos no mercado, o CoreLink se tornou referência para pequenas e 
                médias empresas que buscam digitalizar seus processos e escalar seus negócios com 
                segurança e eficiência. Nossa missão é simplificar a gestão empresarial, permitindo 
                que você foque no crescimento do seu negócio.
              </p>
            </div>
          </div>

          {/* Recursos */}
          <h2 className={styles.features_title}>Principais Recursos</h2>
          <div className={styles.features_grid}>
            <div className={styles.feature_card}>
              <div className={styles.feature_icon_wrapper}>
                <FiPackage className={styles.feature_icon} />
              </div>
              <h3 className={styles.feature_title}>Controle de Estoque</h3>
              <p className={styles.feature_text}>
                Gerencie seus produtos, categorias, fornecedores e controle de estoque em tempo real 
                com alertas automáticos e relatórios detalhados.
              </p>
            </div>
            
            <div className={styles.feature_card}>
              <div className={styles.feature_icon_wrapper}>
                <FiUsers className={styles.feature_icon} />
              </div>
              <h3 className={styles.feature_title}>Gestão de Clientes</h3>
              <p className={styles.feature_text}>
                Mantenha um registro completo dos seus clientes, histórico de compras, preferências 
                e oportunidades de vendas.
              </p>
            </div>
            
            <div className={styles.feature_card}>
              <div className={styles.feature_icon_wrapper}>
                <FiAward className={styles.feature_icon} />
              </div>
              <h3 className={styles.feature_title}>Vendas e Faturamento</h3>
              <p className={styles.feature_text}>
                Processe vendas, gere orçamentos, emita notas fiscais e acompanhe seu faturamento 
                com gráficos e indicadores em tempo real.
              </p>
            </div>
          </div>

          {/* Estatísticas */}
          <div className={styles.stats_container}>
            <div className={styles.stat_item}>
              <span className={styles.stat_number}>500+</span>
              <span className={styles.stat_label}>Empresas</span>
            </div>
            <div className={styles.stat_item}>
              <span className={styles.stat_number}>5</span>
              <span className={styles.stat_label}>Anos no mercado</span>
            </div>
            <div className={styles.stat_item}>
              <span className={styles.stat_number}>99.8%</span>
              <span className={styles.stat_label}>Uptime</span>
            </div>
            <div className={styles.stat_item}>
              <span className={styles.stat_number}>24/7</span>
              <span className={styles.stat_label}>Suporte</span>
            </div>
          </div>

          {/* Contato */}
          <div className={styles.card}>
            <div className={styles.card_header}>
              <FiMessageSquare className={styles.section_icon} />
              <h2 className={styles.section_title}>Entre em Contato</h2>
            </div>
            <div className={styles.contact_container}>
              <div className={styles.contact_info}>
                <div className={styles.contact_item}>
                  <FiPhone className={styles.contact_icon} />
                  <span>(11) 4002-8922</span>
                </div>
                <div className={styles.contact_item}>
                  <FiMail className={styles.contact_icon} />
                  <span>contato@CoreLink.com.br</span>
                </div>
              </div>
              
              <form className={styles.contact_form}>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Nome</label>
                  <input type="text" className={styles.form_input} placeholder="Seu nome" />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Email</label>
                  <input type="email" className={styles.form_input} placeholder="seu@email.com" />
                </div>
                <div className={styles.form_group}>
                  <label className={styles.form_label}>Mensagem</label>
                  <textarea 
                    className={styles.form_textarea} 
                    rows="4"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>
                <button type="submit" className={styles.button_primary_full}>Enviar Mensagem</button>
              </form>
            </div>
          </div>
          
          {/* Footer */}
          <div className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} CoreLink ERP. Todos os direitos reservados.</p>
            <div className={styles.footer_links}>
              <a href="#" className={styles.footer_link}>Termos de Uso</a>
              <a href="#" className={styles.footer_link}>Privacidade</a>
              <a href="#" className={styles.footer_link}>Documentação</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}