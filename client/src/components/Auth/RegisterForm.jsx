// Register form
import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/.+@.+\..+/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (form.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      // Aquí iría la lógica de registro (API call)
      alert('Registro exitoso');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <div id="email-error" style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        {errors.password && <div id="password-error" style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirmPassword-error"
        />
        {errors.confirmPassword && <div id="confirmPassword-error" style={{ color: 'red' }}>{errors.confirmPassword}</div>}
      </div>
      <button type="submit">Registrarse</button>
      {submitted && Object.keys(errors).length === 0 && (
        <div style={{ color: 'green' }}>¡Registro exitoso!</div>
      )}
    </form>
  );
};

export default RegisterForm;
