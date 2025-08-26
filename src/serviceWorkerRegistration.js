// serviceWorkerRegistration.js
// versione minima per build senza errori

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
        .then(registration => {
          console.log('ServiceWorker registrato: ', registration);
        })
        .catch(registrationError => {
          console.log('ServiceWorker registration failed: ', registrationError);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
