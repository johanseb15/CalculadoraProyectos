import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('renders all fields', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  it('shows validation errors on submit', () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/confirma tu contraseña/i)).toBeInTheDocument();
  });

  it('shows error for invalid email', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
  });

  it('shows error for short password', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('shows error if passwords do not match', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: '654321' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(screen.getByText(/no coinciden/i)).toBeInTheDocument();
  });

  it('shows success message on valid submit', () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument();
  });
});
