'use client';

import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="navbar-glass">
      {/* Logo — Left Side */}
      <div className="navbar-logo">
        <div className="logo-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <path
              d="M4 6C4 4.895 4.895 4 6 4H26C27.105 4 28 4.895 28 6V20C28 21.105 27.105 22 26 22H18L12 28V22H6C4.895 22 4 21.105 4 20V6Z"
              fill="url(#logoGradient)"
              opacity="0.9"
            />
            <rect x="9" y="10" width="2" height="6" rx="1" fill="white" opacity="0.9" />
            <rect x="13" y="8" width="2" height="10" rx="1" fill="white" opacity="0.9" />
            <rect x="17" y="11" width="2" height="4" rx="1" fill="white" opacity="0.9" />
            <rect x="21" y="9" width="2" height="8" rx="1" fill="white" opacity="0.9" />
          </svg>
        </div>
        <span className="logo-text">
          <span className="logo-vector">Vector</span>
          <span className="logo-talk">Talk</span>
        </span>
      </div>

      {/* Auth Controls — Right Side */}
      <div className="navbar-auth">
        {!isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button className="btn-signin">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="btn-signup">Get Started</button>
            </SignUpButton>
          </>
        ) : (
          <UserButton />
        )}
      </div>

      <style jsx>{`
        .navbar-glass {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 68px;
          background: rgba(15, 10, 30, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(167, 139, 250, 0.18);
          box-shadow:
            0 4px 32px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          cursor: pointer;
          user-select: none;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(167, 139, 250, 0.15);
          border: 1px solid rgba(167, 139, 250, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .navbar-logo:hover .logo-icon {
          transform: scale(1.05) rotate(-3deg);
          box-shadow: 0 0 18px rgba(167, 139, 250, 0.45);
        }

        .logo-text {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .logo-vector {
          color: #a78bfa;
          text-shadow: 0 0 20px rgba(167, 139, 250, 0.6);
        }

        .logo-talk {
          color: #60a5fa;
          text-shadow: 0 0 20px rgba(96, 165, 250, 0.6);
        }

        .navbar-auth {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-signin {
          padding: 0.45rem 1.2rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(220, 210, 255, 0.9);
          background: transparent;
          border: 1px solid rgba(167, 139, 250, 0.35);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-signin:hover {
          background: rgba(167, 139, 250, 0.12);
          border-color: rgba(167, 139, 250, 0.65);
          color: #fff;
          box-shadow: 0 0 14px rgba(167, 139, 250, 0.25);
          transform: translateY(-1px);
        }

        .btn-signup {
          padding: 0.45rem 1.2rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
          border: 1px solid rgba(167, 139, 250, 0.4);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 12px rgba(124, 58, 237, 0.35);
        }

        .btn-signup:hover {
          background: linear-gradient(135deg, #6d28d9 0%, #2563eb 100%);
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.55);
          transform: translateY(-1px);
        }

        .btn-signup:active,
        .btn-signin:active {
          transform: translateY(0);
        }

        @media (max-width: 480px) {
          .navbar-glass { padding: 0 1rem; }
          .logo-text { font-size: 1.1rem; }
          .btn-signin, .btn-signup { padding: 0.4rem 0.85rem; font-size: 0.8rem; }
        }
      `}</style>
    </nav>
  );
}
