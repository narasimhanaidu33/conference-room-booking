export default function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Conference Room Booking System</h1>
      </header>

      <main className="content">
        {children}
      </main>
    </div>
  );
}
