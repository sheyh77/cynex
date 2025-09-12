import { Lock, LogIn, User } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {

    const [phone, setPhone] = useState("");

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setPhone(value);
    };
    return (
        <section className="login">
            <h1 className="login-title">cynex</h1>
            <div className="login-form">
                <div className="login-form-inputs">
                    <User />
                    <input type="tel"
                        value={phone}
                        onChange={handleChange}
                        maxLength={12}
                        placeholder='Telefon raqamingiz'
                    />
                </div>
                <div className="login-form-inputs">
                    <Lock />
                    <input type="tel"
                        maxLength={8}
                        placeholder='Parol'
                    />
                </div>
                <p className='login-form-forgot'>Parol unutdingizmi?</p>
                <button className="login-form-in">
                    Kirish
                    <LogIn />
                </button>
                <p className="login-form-up">Akkauntingiz yoqmi? 
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </section>
    )
}

export default Login