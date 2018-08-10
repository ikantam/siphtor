export function getFirstName() {
  const names = [
    'Adney', 'Aldo', 'Aleyn', 'Alford',
    'Amherst', 'Angel', 'Anson', 'Addison',
    'Alivia', 'Allaya', 'Amarie', 'Amaris',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

export function getLastName() {
  const names = [
    'Barefoot', 'Bareford', 'Bares',
    'Barfield', 'Barfield', 'Barge',
    'Barham', 'Bark', 'Barraclough',
    'Barrand', 'Barras', 'Barratt',
    'Barrell', 'Barrell',
  ];
  return names[Math.floor(Math.random() * names.length)];
}
