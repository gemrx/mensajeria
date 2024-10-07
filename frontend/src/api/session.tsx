export async function sendLoginRequest(credentials: { email: string, password: string }) {
  const url = 'http://localhost:8000/login';
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function checkLoginStatus() {
  const url = 'http://localhost:8000/login/status';
  return await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  });
}