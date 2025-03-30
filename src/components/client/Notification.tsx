
if ('Notification' in window && Notification.permission !== 'denied') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      new Notification('Novo amontoado de lixo detectado!');
    }
  });
}
