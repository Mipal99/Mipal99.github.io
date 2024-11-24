// Funzione per validare l'indirizzo email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function sendEmail() {
    event.preventDefault();

    // Variabile per prevenire invii multipli
    let emailSent = false;


    let params = {
        name: document.getElementById('fname').value.trim(),
        surname: document.getElementById('lname').value.trim(),
        email: document.getElementById('email').value.trim(),
        subjects: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    }

    // Validazione dei campi obbligatori
    if (!params.name || !params.surname || !params.email || !params.subjects || !params.message) {
        alert('Tutti i campi sono obbligatori. Compilali e riprova.');
        return;
    }

    // Validazione dell'email
    if (!validateEmail(params.email)) {
        alert('Per favore, inserisci un indirizzo email valido.');
        return;
    }

    // Controlla se l'email è già stata inviata
    if (emailSent) {
        alert('Hai già inviato un messaggio. Ricarica la pagina per inviarne un altro.');
        return;
    }

    emailjs.send("service_gksygqe", "template_phjgopb", params)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Messaggio inviato con successo!');
            emailSent = true; // Evita ulteriori invii
        })
        .catch(function (error) {
            console.error('Errore durante l\'invio:', error);
            alert('Si è verificato un errore durante l\'invio del messaggio. Riprova più tardi.');
        })
}