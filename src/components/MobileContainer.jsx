export default function MobileContainer({ children }) {
  return (
    <div className="app-bg">
      <div className="mobile-shell">
        {children}
      </div>
    </div>
  );
}
