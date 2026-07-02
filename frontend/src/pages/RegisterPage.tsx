import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/userApi';
import { getErrorMessage } from '../utils/errorHandler';
import ErrorAlert from '../components/ErrorAlert';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    //validación de campos vacíos
    if (!form.email || !form.firstName || !form.lastName || !form.password) {
      setError('Completa todos los campos.');
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      //success -> login
      navigate('/login', {
        state: { message: 'Cuenta creada con éxito. Inicia sesión para continuar.' },
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="mb-1 text-2xl font-bold text-slate-800">Crear cuenta</h1>
        <p className="mb-6 text-sm text-slate-500">Regístrate para reservar vuelos.</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <ErrorAlert message={error} />

          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              onChange={update('email')}
              placeholder="alice@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label" htmlFor="firstName">
                Nombre
              </label>
              <input
                id="firstName"
                className="input"
                value={form.firstName}
                onChange={update('firstName')}
                placeholder="Alice"
              />
            </div>
            <div>
              <label className="label" htmlFor="lastName">
                Apellido
              </label>
              <input
                id="lastName"
                className="input"
                value={form.lastName}
                onChange={update('lastName')}
                placeholder="Smith"
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="input"
              value={form.password}
              onChange={update('password')}
            />
            <p className="mt-1 text-xs text-slate-400">
              Mínimo 8 caracteres, con al menos una mayúscula y un dígito. Nombre y apellido deben
              empezar con mayúscula.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Creando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
