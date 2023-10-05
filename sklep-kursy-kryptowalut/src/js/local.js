sessionStorage.setItem('text',
JSON.stringify({ name: 'text' }));
sessionStorage.removeItem('text')
sessionStorage.clear();
JSON.parse(sessionStorage.getItem('text'));

localStorage.setItem('username',
'Adam');
localStorage.removeItem
('username');
localStorage.clear();
localStorage.getItem('username');