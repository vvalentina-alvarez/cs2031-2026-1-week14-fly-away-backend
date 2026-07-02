import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium rounded-md ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/search" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          ✈️ Fly Away
        </Link>

        <div className="flex items-center gap-1">
          <NavLink to="/search" className={linkClass}>
            Buscar vuelos
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/my-bookings" className={linkClass}>
              Mis reservas
            </NavLink>
          )}

          {isAuthenticated ? (
            <div className="ml-2 flex items-center gap-2">
              {user && (
                <span className="hidden text-sm text-slate-500 sm:inline">
                  Hola,{' '}
                  <span className="font-medium text-slate-700">
                    {user.firstName || user.username}
                  </span>
                </span>
              )}
              <button onClick={handleLogout} className="btn-ghost">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-1">
              <NavLink to="/login" className={linkClass}>
                Iniciar sesión
              </NavLink>
              <Link to="/register" className="btn-primary">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
