import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validação básica
        if (username.trim() === '' || password.trim() === '') {
            setError('Por favor, preencha todos os campos!');
            // Adiciona classe para animação de shake
            const errorElement = document.querySelector(`.${styles.error_message}`);
            if (errorElement) {
                errorElement.classList.add(styles.shake);
                setTimeout(() => {
                    errorElement.classList.remove(styles.shake);
                }, 600);
            }
            return;
        }
        
        // Simulação de envio para API
        setIsSubmitting(true);
        
        try {
            // Simulando chamada de API
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Aqui você implementaria a verdadeira lógica de autenticação
            console.log('Credenciais:', { username, password });
            
            // Limpa erros após sucesso
            setError('');
            
            // Reset do formulário ou redirecionamento poderia ser feito aqui
        } catch (err) {
            setError('Falha na autenticação. Verifique suas credenciais.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.login_div}>
            <h2 className={styles.logo2}>CoreLink</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Nome de usuário</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className={styles.input} 
                        placeholder="Digite seu nome de usuário"
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className={styles.input} 
                        placeholder="Digite sua senha"
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                
                <a href="#" className={styles.forgot_password}>Esqueceu a senha?</a>
                
                {error && <div className={styles.error_message}>{error}</div>}
                
                <button 
                    type="submit" 
                    className={styles.button} 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                </button>
                
                <div className={styles.divider}>
                    <span>ou continue com</span>
                </div>
                
                <div className={styles.social_login}>
                    <button type="button" className={styles.social_button}>
                        G
                    </button>
                    <button type="button" className={styles.social_button}>
                        f
                    </button>
                </div>
                
                <div className={styles.register_link}>
                    Não tem uma conta? <a href="#">Cadastre-se</a>
                </div>
            </form>
        </div>
    );
}